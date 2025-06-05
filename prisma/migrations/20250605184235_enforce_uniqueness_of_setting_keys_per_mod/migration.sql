/*
  Warnings:

  - A unique constraint covering the columns `[modSlug,modGame,key]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Setting_modSlug_modGame_key_key" ON "Setting"("modSlug", "modGame", "key");
