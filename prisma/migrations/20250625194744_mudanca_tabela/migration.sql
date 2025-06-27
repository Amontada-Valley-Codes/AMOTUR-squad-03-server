/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `logo` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_IdPlace_fkey";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "logo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Images";
