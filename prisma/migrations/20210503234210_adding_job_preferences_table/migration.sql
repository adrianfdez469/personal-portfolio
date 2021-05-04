-- CreateTable
CREATE TABLE "job_preferences" (
    "id" SERIAL NOT NULL,
    "opent_to_work" BOOLEAN,
    "opent_to_relocation" BOOLEAN,
    "remote_availability" BOOLEAN,
    "montly_min_salary" DECIMAL(65,30),
    "montly_max_salary" DECIMAL(65,30),
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_preferences_user_id_unique" ON "job_preferences"("user_id");

-- AddForeignKey
ALTER TABLE "job_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
