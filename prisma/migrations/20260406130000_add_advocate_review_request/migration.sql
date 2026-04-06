-- CreateEnum
CREATE TYPE "AdvocateReviewStatus" AS ENUM ('SUBMITTED', 'ACKNOWLEDGED', 'ASSIGNED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "AdvocateReviewRequest" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "willDraftVersionId" TEXT,
    "status" "AdvocateReviewStatus" NOT NULL DEFAULT 'SUBMITTED',
    "contactName" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvocateReviewRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdvocateReviewRequest_draftSessionId_idx" ON "AdvocateReviewRequest"("draftSessionId");

-- CreateIndex
CREATE INDEX "AdvocateReviewRequest_willDraftVersionId_idx" ON "AdvocateReviewRequest"("willDraftVersionId");

-- AddForeignKey
ALTER TABLE "AdvocateReviewRequest" ADD CONSTRAINT "AdvocateReviewRequest_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvocateReviewRequest" ADD CONSTRAINT "AdvocateReviewRequest_willDraftVersionId_fkey" FOREIGN KEY ("willDraftVersionId") REFERENCES "WillDraftVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
