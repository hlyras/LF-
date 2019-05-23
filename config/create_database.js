// copy and paste to create database and tables

// database 
CREATE DATABASE lfsdb;

// users
CREATE TABLE `lfsdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `age` INT(3) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `acess` VARCHAR(2) NOT NULL default 'a1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

//factory - products
CREATE TABLE `lfsdb`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod` VARCHAR(4) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `color` VARCHAR(15) NOT NULL,
  `size` VARCHAR(3) NOT NULL,
  `amount` INT(5) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cod_UNIQUE` (`cod` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));