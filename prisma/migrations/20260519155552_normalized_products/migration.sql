/*
  Warnings:

  - You are about to drop the `Oil` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('OIL', 'OIL_FILTER', 'AIR_FILTER', 'CABIN_FILTER', 'FUEL_FILTER');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('SUGGESTED_OIL', 'SUGGESTED_OIL_FILTER', 'SUGGESTED_AIR_FILTER', 'SUGGESTED_CABIN_FILTER', 'SUGGESTED_FUEL_FILTER');

-- DropTable
DROP TABLE "Oil";

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "engine" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "badge" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "category" "ProductCategory" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "replacementId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarProductRecommendation" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" "RecommendationType" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarProductRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_brand_model_year_idx" ON "Car"("brand", "model", "year");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "CarProductRecommendation_carId_idx" ON "CarProductRecommendation"("carId");

-- CreateIndex
CREATE INDEX "CarProductRecommendation_productId_idx" ON "CarProductRecommendation"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "CarProductRecommendation_carId_type_priority_key" ON "CarProductRecommendation"("carId", "type", "priority");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_replacementId_fkey" FOREIGN KEY ("replacementId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarProductRecommendation" ADD CONSTRAINT "CarProductRecommendation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarProductRecommendation" ADD CONSTRAINT "CarProductRecommendation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
