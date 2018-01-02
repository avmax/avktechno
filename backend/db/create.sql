DROP DATABASE `avktechno`;
CREATE DATABASE `avktechno`;
USE `avktechno`;

CREATE TABLE `products` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL UNIQUE,
	`title` varchar(128) NOT NULL,
	`imgURL` varchar(256) DEFAULT 'http://lorempixel.com/400/200/sports/1/',
	`id_brand` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `brands` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL UNIQUE,
	`title` varchar(128) NOT NULL,
	`imgURL` varchar(256) NOT NULL DEFAULT 'http://lorempixel.com/400/200/sports/1/',
	PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL UNIQUE,
	`title` varchar(128) NOT NULL,
	`imgUrl` varchar(256) DEFAULT 'http://lorempixel.com/400/200/sports/1/',
	PRIMARY KEY (`id`)
);

CREATE TABLE `categories-brands` (
	`id_category` int NOT NULL,
	`id_brand` int NOT NULL
);

CREATE TABLE `categories-products` (
	`id_category` int NOT NULL,
	`id_product` int NOT NULL
);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`id_brand`) REFERENCES `brands`(`id`);

ALTER TABLE `categories-brands` ADD CONSTRAINT `categories-brands_fk0` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id`);

ALTER TABLE `categories-brands` ADD CONSTRAINT `categories-brands_fk1` FOREIGN KEY (`id_brand`) REFERENCES `brands`(`id`);

ALTER TABLE `categories-products` ADD CONSTRAINT `categories-products_fk0` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id`);

ALTER TABLE `categories-products` ADD CONSTRAINT `categories-products_fk1` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`);

