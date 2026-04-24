/*
  Warnings:

  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "phone_no" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;
