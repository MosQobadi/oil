-- CreateTable
CREATE TABLE "Oil" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "replacementId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OilFilter" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OilFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirFilter" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AirFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabinFilter" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CabinFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelFilter" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FuelFilter_pkey" PRIMARY KEY ("id")
);

-- Copy existing generic products into their dedicated tables.
INSERT INTO "Oil" ("brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt")
SELECT "brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt"
FROM "Product"
WHERE "category" = 'OIL';

INSERT INTO "OilFilter" ("brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt")
SELECT "brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt"
FROM "Product"
WHERE "category" = 'OIL_FILTER';

INSERT INTO "AirFilter" ("brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt")
SELECT "brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt"
FROM "Product"
WHERE "category" = 'AIR_FILTER';

INSERT INTO "CabinFilter" ("brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt")
SELECT "brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt"
FROM "Product"
WHERE "category" = 'CABIN_FILTER';

INSERT INTO "FuelFilter" ("brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt")
SELECT "brand", "name", "model", "price", "badge", "imageUrl", "description", "isActive", "createdAt", "updatedAt"
FROM "Product"
WHERE "category" = 'FUEL_FILTER';

-- CreateIndex
CREATE INDEX "Oil_brand_idx" ON "Oil"("brand");
CREATE INDEX "Oil_isActive_idx" ON "Oil"("isActive");
CREATE INDEX "OilFilter_brand_idx" ON "OilFilter"("brand");
CREATE INDEX "OilFilter_isActive_idx" ON "OilFilter"("isActive");
CREATE INDEX "AirFilter_brand_idx" ON "AirFilter"("brand");
CREATE INDEX "AirFilter_isActive_idx" ON "AirFilter"("isActive");
CREATE INDEX "CabinFilter_brand_idx" ON "CabinFilter"("brand");
CREATE INDEX "CabinFilter_isActive_idx" ON "CabinFilter"("isActive");
CREATE INDEX "FuelFilter_brand_idx" ON "FuelFilter"("brand");
CREATE INDEX "FuelFilter_isActive_idx" ON "FuelFilter"("isActive");

-- AddForeignKey
ALTER TABLE "Oil" ADD CONSTRAINT "Oil_replacementId_fkey" FOREIGN KEY ("replacementId") REFERENCES "Oil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Drop old generic recommendation and product storage.
DROP TABLE IF EXISTS "CarProductRecommendation";
DROP TABLE IF EXISTS "Product";
DROP TYPE IF EXISTS "ProductCategory";
