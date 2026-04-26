-- CreateTable
CREATE TABLE "Lab_Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Lab_Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab_Test_Item" (
    "id" SERIAL NOT NULL,
    "lab_test_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,
    "normal_range" TEXT,
    "gender_specific" BOOLEAN NOT NULL,
    "value_type" TEXT NOT NULL,

    CONSTRAINT "Lab_Test_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab_Result" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "lab_test_id" INTEGER NOT NULL,
    "lab_test_item_id" INTEGER NOT NULL,
    "recommendation_id" INTEGER NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lab_Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model_Prediction" (
    "id" SERIAL NOT NULL,
    "lab_result_id" INTEGER NOT NULL,
    "model_recommendation" TEXT NOT NULL,
    "probability" TEXT NOT NULL,

    CONSTRAINT "Model_Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "lab_result_id" INTEGER NOT NULL,
    "generated_recommendation" TEXT NOT NULL,
    "doctor_recommendation" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lab_Test_name_key" ON "Lab_Test"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Model_Prediction_lab_result_id_key" ON "Model_Prediction"("lab_result_id");

-- AddForeignKey
ALTER TABLE "Lab_Test_Item" ADD CONSTRAINT "Lab_Test_Item_lab_test_id_fkey" FOREIGN KEY ("lab_test_id") REFERENCES "Lab_Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_Result" ADD CONSTRAINT "Lab_Result_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_Result" ADD CONSTRAINT "Lab_Result_lab_test_id_fkey" FOREIGN KEY ("lab_test_id") REFERENCES "Lab_Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_Result" ADD CONSTRAINT "Lab_Result_lab_test_item_id_fkey" FOREIGN KEY ("lab_test_item_id") REFERENCES "Lab_Test_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab_Result" ADD CONSTRAINT "Lab_Result_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model_Prediction" ADD CONSTRAINT "Model_Prediction_lab_result_id_fkey" FOREIGN KEY ("lab_result_id") REFERENCES "Lab_Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
