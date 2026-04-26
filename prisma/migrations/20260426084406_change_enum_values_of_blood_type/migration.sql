/*
  Warnings:

  - The values [A_POSITIVE,A_NEGATIVE,B_POSITIVE,B_NEGATIVE,O_POSITIVE,O_NEGATIVE,AB_POSITIVE,AB_NEGATIVE] on the enum `BloodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodType_new" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'O_POS', 'O_NEG', 'AB_POS', 'AB_NEG');
ALTER TABLE "Patient_Info" ALTER COLUMN "blood_type" TYPE "BloodType_new" USING ("blood_type"::text::"BloodType_new");
ALTER TYPE "BloodType" RENAME TO "BloodType_old";
ALTER TYPE "BloodType_new" RENAME TO "BloodType";
DROP TYPE "public"."BloodType_old";
COMMIT;
