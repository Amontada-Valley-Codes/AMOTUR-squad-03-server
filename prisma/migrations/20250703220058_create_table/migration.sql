-- CreateEnum
CREATE TYPE "RoleUsers" AS ENUM ('ADMIN', 'TURISTA');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,
    "contacts" JSONB NOT NULL,
    "logo" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUsers" NOT NULL DEFAULT 'TURISTA',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_coordinates_key" ON "Place"("coordinates");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
