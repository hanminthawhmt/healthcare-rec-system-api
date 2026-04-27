-- DropForeignKey
ALTER TABLE "Lab_Result" DROP CONSTRAINT "Lab_Result_recommendation_id_fkey";

-- AlterTable
ALTER TABLE "Lab_Result" ALTER COLUMN "recommendation_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lab_Result" ADD CONSTRAINT "Lab_Result_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "Recommendation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
