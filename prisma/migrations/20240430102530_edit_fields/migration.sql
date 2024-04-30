/*
  Warnings:

  - Added the required column `username` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
