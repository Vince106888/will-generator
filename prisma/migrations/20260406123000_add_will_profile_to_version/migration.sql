-- AddColumn
ALTER TABLE "WillDraftVersion" ADD COLUMN "willProfileId" TEXT;

-- CreateIndex
CREATE INDEX "WillDraftVersion_willProfileId_idx" ON "WillDraftVersion"("willProfileId");

-- AddForeignKey
ALTER TABLE "WillDraftVersion" ADD CONSTRAINT "WillDraftVersion_willProfileId_fkey" FOREIGN KEY ("willProfileId") REFERENCES "WillProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
