const { query, tables } = require('../db/index');
const { brands: b, categoriesBrands: bc } = tables;

exports.get = async (req, res, next) => {
  try {
    let result = await query(`SELECT * FROM ${b};`);

    let pairs = await query(`
      SELECT * FROM ${b} INNER JOIN ${bc} on ${b}.id = ${bc}.id_brand
    `);

    result = result.map(row => {
      const { id } = row;
      row.refs = { };
      row.refs.category = pairs.filter(p => p.id_brand === id).map(v => v.id_category) || [];
      return row;
    });

    res.send(result);
  } catch(err) {
    console.log(err);
    res.status = 500;
    res.send(err);
  }
};
