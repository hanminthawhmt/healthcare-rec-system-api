/*
  Warnings:

  - You are about to drop the column `age` on the `Patient_Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "created_by" INTEGER;

-- AlterTable
ALTER TABLE "Patient_Info" DROP COLUMN "age";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
