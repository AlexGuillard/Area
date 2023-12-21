-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('SPOTIFY', 'GITHUB', 'GOOGLE', 'DISCORD', 'MICROSOFT', 'TWITCH', 'TIME');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "randomToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "actionId" INTEGER NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stringParameter" TEXT,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stringParameter" TEXT,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "typeService" "ServiceType" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_randomToken_key" ON "users"("randomToken");

-- CreateIndex
CREATE UNIQUE INDEX "area_userId_key" ON "area"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "area_actionId_key" ON "area"("actionId");

-- CreateIndex
CREATE UNIQUE INDEX "area_reactionId_key" ON "area"("reactionId");

-- CreateIndex
CREATE UNIQUE INDEX "action_serviceId_key" ON "action"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "reaction_serviceId_key" ON "reaction"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "services_token_key" ON "services"("token");

-- CreateIndex
CREATE UNIQUE INDEX "services_userId_typeService_key" ON "services"("userId", "typeService");

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
