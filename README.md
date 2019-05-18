# Todolist

First of all, you have to install nodejs and npm.

Please refer Node.js site. <https://nodejs.org/ko/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages>

Second, Clone this repository and execute command
```
npm start
```
Then, you can make your local todolist site. <localhost:3000/>


If you want to use your database, Change connection in 'routes/router.js' file.
```
CREATE TABLE `your schema's name`.`todolist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NULL,
  `content` VARCHAR(5000) NULL,
  `priority` INT NOT NULL,
  `date` DATE NULL,
  `blank` INT NULL,
  PRIMARY KEY (`id`));
```
