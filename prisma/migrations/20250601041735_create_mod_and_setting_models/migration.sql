-- CreateTable
CREATE TABLE "Mod" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "provider" TEXT,
    "providerId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mod_pkey" PRIMARY KEY ("slug","game")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "modSlug" TEXT,
    "modGame" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_modSlug_modGame_fkey" FOREIGN KEY ("modSlug", "modGame") REFERENCES "Mod"("slug", "game") ON DELETE SET NULL ON UPDATE CASCADE;
