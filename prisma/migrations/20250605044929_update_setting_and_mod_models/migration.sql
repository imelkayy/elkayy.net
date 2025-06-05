/*
  Warnings:

  - Added the required column `description` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mod" ADD COLUMN     "section" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "key" TEXT NOT NULL;
