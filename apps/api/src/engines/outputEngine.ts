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

export async function generatePdfFromDraft(
  draft: string,
  fileName = `will-draft-${Date.now()}.pdf`,
  outputDir = getOutputDir()
) {
  await fs.promises.mkdir(outputDir, { recursive: true });
  const resolvedName = safePdfName(fileName);
  const filePath = path.join(outputDir, resolvedName);

  return new Promise<string>((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 54,
      size: "A4",
      info: {
        Title: "Will Draft",
        Author: "Esheria Wills"
      }
    });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.font("Helvetica-Bold").fontSize(18).fillColor("#0E1820").text("Esheria Wills", {
      align: "left"
    });
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#4B5563")
      .text("Last Will and Testament Draft", { align: "left" });
    doc
      .moveDown(0.6)
      .lineWidth(1)
      .strokeColor("#E5E7EB")
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke();

    doc.moveDown(1.2);
    doc.font("Helvetica").fontSize(11).fillColor("#111827").text(draft, {
      align: "left",
      lineGap: 4
    });
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
