const { uniq } = require('lodash/fp');

module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    'subcategory',
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
    },
  );

  Subcategory.prototype.retrieve = function() {
    const plain = this.get({ plain: true });

    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  };

  Subcategory.prototype.getRefs = async function() {
      const products = await this.getProducts();
      const brands = await Promise.all(products.map(p => p.getBrand()));
      const refs = {
        product: products.map(p => p.get({ plain: true }).id),
        brand: uniq(brands.filter(b => !!b).map(b => b.get({ plain: true }).id)),
      };

      return refs;
  };

  return Subcategory;
};
