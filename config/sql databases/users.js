CREATE TABLE `lfsdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `job` VARCHAR(25) NOT NULL DEFAULT 'S/R',
  `email` VARCHAR(45) NOT NULL,
  `age` VARCHAR(12) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `acess` VARCHAR(3) NOT NULL DEFAULT 'aaa',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));