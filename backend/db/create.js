const mysql = require('mysql');
const utils = require('util');



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
});

const query = utils.promisify(db.query.bind(db));

db.connect(async (err) => {
  if (err) throw err;

  try {
    await query(`
      DROP DATABASE avktechno
    `);

    await query(`
      CREATE DATABASE avktechno
    `);

    await query(`
      USE avktechno
    `);

    await query(`
      CREATE TABLE products (
      id int NOT NULL AUTO_INCREMENT,
      name char(30) NOT NULL UNIQUE,
      title char(120) NOT NULL,
      subtitle char(120) NOT NULL,
      description TEXT NOT NULL,
      image_url char(120) NOT NULL,
      image_description char(120) NOT NULL,
      price char(60) NOT NULL,
      brand int NOT NULL,
      category int NOT NULL,
      PRIMARY KEY (id)
      );
    `);

    await query(`
      CREATE TABLE brands (
      id int NOT NULL AUTO_INCREMENT,
      name char(30) NOT NULL UNIQUE,
      title char(120) NOT NULL,
      subtitle char(120) NOT NULL,
      description TEXT(120) NOT NULL,
      image_url char(120) NOT NULL,
      image_description char(120) NOT NULL,
      PRIMARY KEY (id)
      );
    `);

    await query(`
      CREATE TABLE categories (
      id int(10) AUTO_INCREMENT,
      title char(120) NOT NULL,
      description char(120) NOT NULL,
      imgUrl char(120) NOT NULL,
      PRIMARY KEY (id)
      );
  `);

    await query(`
      ALTER TABLE products ADD CONSTRAINT product_fk0 FOREIGN KEY (brand) REFERENCES brands(id);
    `);

    await query(`
      ALTER TABLE products ADD CONSTRAINT product_fk1 FOREIGN KEY (category) REFERENCES categories(id);
    `);

    console.log('база данных успешно создана');

  } catch(error) {
    console.log('при создании базы данных произошел проеб: ', error);
  }
});
