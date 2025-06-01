/*
  Warnings:

  - The primary key for the `Mod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `game` on the `Mod` table. All the data in the column will be lost.
  - The `modGame` column on the `Setting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `gameId` to the `Mod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_modSlug_modGame_fkey";

-- AlterTable
ALTER TABLE "Mod" DROP CONSTRAINT "Mod_pkey",
DROP COLUMN "game",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD CONSTRAINT "Mod_pkey" PRIMARY KEY ("slug", "gameId");

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "modGame",
ADD COLUMN     "modGame" INTEGER;

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- AddForeignKey
ALTER TABLE "Mod" ADD CONSTRAINT "Mod_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_modSlug_modGame_fkey" FOREIGN KEY ("modSlug", "modGame") REFERENCES "Mod"("slug", "gameId") ON DELETE SET NULL ON UPDATE CASCADE;
