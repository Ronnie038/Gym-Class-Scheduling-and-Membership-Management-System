/*
  Warnings:

  - You are about to drop the column `profileId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `trainees` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceYears` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `trainees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `trainees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `trainees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `trainees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `trainees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_profileId_fkey";

-- DropForeignKey
ALTER TABLE "trainees" DROP CONSTRAINT "trainees_profileId_fkey";

-- DropIndex
DROP INDEX "Admin_profileId_key";

-- DropIndex
DROP INDEX "Trainer_profileId_key";

-- DropIndex
DROP INDEX "trainees_profileId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "profileId",
DROP COLUMN "role",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "profileId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "experienceYears" INTEGER NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "trainees" DROP COLUMN "profileId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- DropEnum
DROP TYPE "AdminRole";
