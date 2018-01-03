const mysql = require('mysql');
const utils = require('util');



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: 'avktechno'
});

db.q = utils.promisify(db.query.bind(db));

exports.tables = {
  brands: 'brands',
  categories: 'categories',
  products: 'products',
  categoriesBrands: '\`categories-brands\`',
  categoriesProducts: '\`categories-products\`',
}
exports.query = utils.promisify(db.query.bind(db));
exports.db = db;
