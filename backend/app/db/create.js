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
      DROP DATABASE IF EXISTS avktechno
    `);

    await query(`
      CREATE DATABASE IF NOT EXISTS avktechno
    `);

    await query(`
      ALTER DATABASE avktechno CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `)

    // await query(`
    //   USE avktechno
    // `);

    // await query(`
    //   CREATE TABLE products (
    //   id int NOT NULL AUTO_INCREMENT,
    //   name char(64) NOT NULL UNIQUE,
    //   title char(128) NOT NULL,
    //   subtitle char(128) DEFAULT 'some product subtitle',
    //   imgUrl char(128) DEFAULT 'http://lorempixel.com/400/200/sports/1/',
    //   id_brand int NOT NULL,
    //   PRIMARY KEY (id)
    //   );
    // `);

    // await query(`
    //   CREATE TABLE brands (
    //   id int NOT NULL AUTO_INCREMENT,
    //   name char(64) NOT NULL UNIQUE,
    //   title char(128) NOT NULL,
    //   subtitle char(128) DEFAULT 'some brand subtitle',
    //   imgUrl char(128) DEFAULT 'http://lorempixel.com/400/200/sports/1/',
    //   PRIMARY KEY (id)
    //   );
    // `);

    // await query(`
    //   CREATE TABLE categories (
    //   id int NOT NULL AUTO_INCREMENT,
    //   name char(64) NOT NULL UNIQUE,
    //   title char(128) NOT NULL,
    //   subtitle char(128) DEFAULT 'some category subtitle',
    //   imgUrl char(128) DEFAULT 'http://lorempixel.com/400/200/sports/1/',
    //   PRIMARY KEY (id)
    //   );
    // `);

    // await query(`
    //   CREATE TABLE \`categories-brands\` (
    //     id_category int NOT NULL,
    //     id_brand int NOT NULL
    //   );
    // `);

    // await query(`
    //   CREATE TABLE \`categories-products\` (
    //     id_category int NOT NULL,
    //     id_product int NOT NULL
    //   );
    // `);

    // await query(`
    //   ALTER TABLE products ADD CONSTRAINT products_fk0 FOREIGN KEY (id_brand) REFERENCES brands(id);
    // `);

    // await query(`
    //   ALTER TABLE \`categories-brands\` ADD CONSTRAINT \`categories-brands_fk0\` FOREIGN KEY (id_category) REFERENCES categories(id);
    // `);

    // await query(`
    //   ALTER TABLE \`categories-brands\` ADD CONSTRAINT \`categories-brands_fk1\` FOREIGN KEY (id_brand) REFERENCES brands(id);
    // `);

    // await query(`
    //   ALTER TABLE \`categories-products\` ADD CONSTRAINT \`categories-products_fk0\` FOREIGN KEY (id_category) REFERENCES categories(id);
    // `);

    // await query(`
    //   ALTER TABLE \`categories-products\` ADD CONSTRAINT \`categories-products_fk1\` FOREIGN KEY (id_product) REFERENCES products(id);
    // `);

    console.log('база данных успешно создана');
    db.end();

  } catch(error) {
    console.log('при создании базы данных произошел проеб: ', error);
    db.end();
  }
});
