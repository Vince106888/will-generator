-- CreateEnum
CREATE TYPE "AiInteractionType" AS ENUM ('EXTRACT', 'EXPLAIN', 'SUMMARIZE');

-- CreateEnum
CREATE TYPE "AiInteractionStatus" AS ENUM ('ACCEPTED', 'EDITED', 'REJECTED', 'ABSTAINED', 'FAILED_SCHEMA');

-- CreateTable
CREATE TABLE "AiInteraction" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "willDraftVersionId" TEXT,
    "interactionType" "AiInteractionType" NOT NULL,
    "modelIdentifier" TEXT NOT NULL,
    "providerIdentifier" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "inputHash" TEXT NOT NULL,
    "inputPreview" TEXT,
    "structuredOutput" JSONB,
    "confidence" DOUBLE PRECISION,
    "abstained" BOOLEAN NOT NULL DEFAULT false,
    "status" "AiInteractionStatus" NOT NULL,
    "userDecision" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiInteraction_draftSessionId_idx" ON "AiInteraction"("draftSessionId");

-- CreateIndex
CREATE INDEX "AiInteraction_willDraftVersionId_idx" ON "AiInteraction"("willDraftVersionId");

-- CreateIndex
CREATE INDEX "AiInteraction_interactionType_idx" ON "AiInteraction"("interactionType");

-- CreateIndex
CREATE INDEX "AiInteraction_createdAt_idx" ON "AiInteraction"("createdAt");

-- AddForeignKey
ALTER TABLE "AiInteraction" ADD CONSTRAINT "AiInteraction_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiInteraction" ADD CONSTRAINT "AiInteraction_willDraftVersionId_fkey" FOREIGN KEY ("willDraftVersionId") REFERENCES "WillDraftVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;