-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('SPOTIFY', 'GITHUB', 'GOOGLE', 'DISCORD', 'MICROSOFT', 'TWITCH');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "_serviceIdAction" INTEGER NOT NULL,

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "_serviceIdReaction" INTEGER NOT NULL,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "typeService" "ServiceType" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "area_userId_key" ON "area"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "area_actionId_key" ON "area"("actionId");

-- CreateIndex
CREATE UNIQUE INDEX "area_reactionId_key" ON "area"("reactionId");

-- CreateIndex
CREATE UNIQUE INDEX "action__serviceIdAction_key" ON "action"("_serviceIdAction");

-- CreateIndex
CREATE UNIQUE INDEX "reaction__serviceIdReaction_key" ON "reaction"("_serviceIdReaction");

-- CreateIndex
CREATE UNIQUE INDEX "services_userId_key" ON "services"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "services_token_key" ON "services"("token");

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_id_fkey" FOREIGN KEY ("id") REFERENCES "area"("actionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action__serviceIdAction_fkey" FOREIGN KEY ("_serviceIdAction") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_id_fkey" FOREIGN KEY ("id") REFERENCES "area"("reactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction__serviceIdReaction_fkey" FOREIGN KEY ("_serviceIdReaction") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
