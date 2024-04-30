/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `todos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_category_name_fkey` FOREIGN KEY (`category_name`) REFERENCES `categories`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
