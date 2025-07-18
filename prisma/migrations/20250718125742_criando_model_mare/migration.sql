-- CreateTable
CREATE TABLE "Mare" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Mare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mare_data_hora_key" ON "Mare"("data", "hora");
