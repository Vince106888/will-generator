-- CreateEnum
CREATE TYPE "DraftSessionStatus" AS ENUM ('IN_PROGRESS', 'READY', 'FINALIZED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DraftSourceMode" AS ENUM ('AI', 'STRUCTURED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WillProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "personal" JSONB NOT NULL,
    "family" JSONB NOT NULL,
    "assets" JSONB NOT NULL,
    "distribution" JSONB NOT NULL,
    "roles" JSONB NOT NULL,
    "instructions" JSONB NOT NULL,
    "complexity" JSONB NOT NULL,
    "validity" JSONB NOT NULL,
    "draft" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WillProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "willId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB,
    "willId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftSession" (
    "id" TEXT NOT NULL,
    "status" "DraftSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "sourceMode" "DraftSourceMode" NOT NULL,
    "inputSnapshot" JSONB NOT NULL,
    "resumeTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DraftSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WillDraftVersion" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "inputSnapshot" JSONB NOT NULL,
    "generatedDraft" TEXT NOT NULL,
    "complexityResult" JSONB NOT NULL,
    "validityResult" JSONB NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WillDraftVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "WillProfile_createdAt_idx" ON "WillProfile"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_event_idx" ON "AnalyticsEvent"("event");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_createdAt_idx" ON "AnalyticsEvent"("createdAt");

-- CreateIndex
CREATE INDEX "DraftSession_createdAt_idx" ON "DraftSession"("createdAt");

-- CreateIndex
CREATE INDEX "WillDraftVersion_draftSessionId_idx" ON "WillDraftVersion"("draftSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "WillDraftVersion_draftSessionId_version_key" ON "WillDraftVersion"("draftSessionId", "version");

-- AddForeignKey
ALTER TABLE "WillProfile" ADD CONSTRAINT "WillProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_willId_fkey" FOREIGN KEY ("willId") REFERENCES "WillProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_willId_fkey" FOREIGN KEY ("willId") REFERENCES "WillProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WillDraftVersion" ADD CONSTRAINT "WillDraftVersion_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
