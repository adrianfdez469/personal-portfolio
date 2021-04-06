-- CreateTable
CREATE TABLE "Collaborator" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "name" TEXT,
    "url" TEXT,
    "isOwner" BOOLEAN NOT NULL,
    "projectid" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collaborator" ADD FOREIGN KEY ("projectid") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
