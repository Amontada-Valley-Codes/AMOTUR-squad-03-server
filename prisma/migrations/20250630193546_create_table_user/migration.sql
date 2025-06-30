/*
  Warnings:

  - A unique constraint covering the columns `[coordinates]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RoleUsers" AS ENUM ('ADMIN', 'TURISTA');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUsers" NOT NULL DEFAULT 'TURISTA',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Place_coordinates_key" ON "Place"("coordinates");
