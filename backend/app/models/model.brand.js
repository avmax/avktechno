const { uniq, cloneDeep } = require('lodash/fp');

module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    'brand',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imgUrl: {
        type: DataTypes.STRING(1234) ,
        defaultValue: 'http://lorempixel.com/400/200/sports/1/',
      },
    },
  );

  Brand.prototype.retrieve = function() {
    const plain = cloneDeep(this.get({ plain: true }));

    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  };

  Brand.prototype.getRefs = async function() {
      const products = await this.getProducts();
      const categories = await Promise.all(products.map(p => p.getCategory()));
      const refs = {
        product: products.map(p => p.get({ plain: true }).id),
        category: uniq(categories.filter(c => !!c).map(c => c.get({ plain: true }).id)),
      };

      return refs;
  };

  return Brand;
};
