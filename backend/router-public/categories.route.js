const { query, tables } = require('../db/index');
const { categories: c, categoriesBrands: cb } = tables;

exports.get = async (req, res, next) => {
  try {
    let result = await query(`SELECT * FROM ${c};`);

    let pairs = await query(`
      SELECT * FROM ${c} INNER JOIN ${cb} on ${c}.id = ${cb}.id_category
    `);

    result = result.map(row => {
      const { id } = row;
      row.refs = { };
      row.refs.brand = pairs.filter(p => p.id_category === id).map(v => v.id_brand) || [];
      return row;
    });

    res.send(result);
  } catch(err) {
    res.status = 500;
    res.send(err);
  }
};
