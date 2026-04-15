// file: apps/api/src/engines/outputEngine.ts
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const DEFAULT_OUTPUT_DIR = "storage";
const PDF_SUBDIR = "wills";

function getOutputDir() {
  const baseDir = process.env.OUTPUT_DIR?.trim() || DEFAULT_OUTPUT_DIR;
  return path.resolve(process.cwd(), baseDir);
}

function safePdfName(fileName: string) {
  return path.basename(withPdfExtension(fileName));
}

function withPdfExtension(fileName: string) {
  return fileName.toLowerCase().endsWith(".pdf") ? fileName : `${fileName}.pdf`;
}

function isSectionHeading(line: string) {
  return /^SECTION\s+\d+:/.test(line) || /^APPENDIX\s+[A-Z]:/.test(line);
}

function isDocumentTitle(line: string) {
  return line === "DRAFT WILL DOCUMENT" || line.toLowerCase().includes("draft for review");
}

function isSignatureLine(line: string) {
  return /^TESTATOR SIGNATURE:|^WITNESS\s+\d+\s+NAME\/SIGNATURE:/.test(line);
}

function drawHeader(doc: PDFKit.PDFDocument) {
  const top = doc.page.margins.top - 22;
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#111827")
    .text("Draft Will Document", doc.page.margins.left, top, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      align: "left"
    });

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#6B7280")
    .text("Prepared for review before execution", doc.page.margins.left, top, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      align: "right"
    });
}

function renderDraftBody(doc: PDFKit.PDFDocument, draft: string) {
  const lines = draft
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line, index, all) => !(line.length === 0 && all[index - 1]?.length === 0));

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      doc.moveDown(0.8);
      continue;
    }

    if (isDocumentTitle(line)) {
      if (line === "DRAFT WILL DOCUMENT") {
        doc.moveDown(0.3);
        doc.font("Helvetica-Bold").fontSize(20).fillColor("#0F172A").text(line, {
          align: "left"
        });
      } else {
        doc.moveDown(0.2);
        doc.font("Helvetica").fontSize(11).fillColor("#475569").text(line, {
          align: "left"
        });
        doc
          .moveDown(0.6)
          .lineWidth(1)
          .strokeColor("#E2E8F0")
          .moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .stroke();
      }
      doc.moveDown(0.6);
      continue;
    }

    if (isSectionHeading(line)) {
      doc.moveDown(0.9);
      doc.font("Helvetica-Bold").fontSize(12).fillColor("#0F172A").text(line, {
        align: "left"
      });
      doc.moveDown(0.35);
      continue;
    }

    if (line.startsWith("- ")) {
      doc.font("Helvetica").fontSize(10.8).fillColor("#1F2937").text(`• ${line.slice(2)}`, {
        align: "left",
        indent: 12,
        lineGap: 2
      });
      continue;
    }

    if (isSignatureLine(line)) {
      doc.moveDown(0.3);
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#111827").text(line, {
        align: "left"
      });
      continue;
    }

    doc.font("Helvetica").fontSize(10.8).fillColor("#1F2937").text(line, {
      align: "left",
      lineGap: 3
    });
  }
}

export async function generatePdfFromDraft(
  draft: string,
  fileName = `draft-will-document-${Date.now()}.pdf`,
  outputDir = getOutputDir()
) {
  await fs.promises.mkdir(outputDir, { recursive: true });
  const resolvedName = safePdfName(fileName);
  const filePath = path.join(outputDir, resolvedName);

  return new Promise<string>((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 64,
      size: "A4",
      info: {
        Title: "Draft Will Document",
        Author: "Will Drafting Platform",
        Subject: "Last Will and Testament - Draft for Review"
      }
    });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    drawHeader(doc);
    doc.on("pageAdded", () => {
      drawHeader(doc);
      doc.y = doc.page.margins.top;
    });

    renderDraftBody(doc, draft);
    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

export function getWillPdfPath(willId: string) {
  return path.join(getOutputDir(), PDF_SUBDIR, `will-${willId}.pdf`);
}

export async function ensureWillPdf(draft: string, willId: string) {
  const pdfPath = getWillPdfPath(willId);
  await fs.promises.mkdir(path.dirname(pdfPath), { recursive: true });

  try {
    const stat = await fs.promises.stat(pdfPath);
    if (stat.size > 0) {
      return pdfPath;
    }
  } catch {
    // File missing or unreadable -> regenerate.
  }

  return generatePdfFromDraft(draft, path.basename(pdfPath), path.dirname(pdfPath));
}

export function getDraftVersionPdfPath(sessionId: string, version: number) {
  return path.join(getOutputDir(), PDF_SUBDIR, `draft-${sessionId}-v${version}.pdf`);
}

export async function ensureDraftVersionPdf(draft: string, sessionId: string, version: number) {
  const pdfPath = getDraftVersionPdfPath(sessionId, version);
  await fs.promises.mkdir(path.dirname(pdfPath), { recursive: true });

  try {
    const stat = await fs.promises.stat(pdfPath);
    if (stat.size > 0) {
      return pdfPath;
    }
  } catch {
    // File missing or unreadable -> regenerate.
  }

  return generatePdfFromDraft(draft, path.basename(pdfPath), path.dirname(pdfPath));
}
