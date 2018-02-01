const { uniq } = require('lodash/fp');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
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

  Category.prototype.retrieve = function() {
    const plain = this.get({ plain: true });

    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  };

  Category.prototype.getRefs = async function() {
    const subcategories = await this.getSubcategories();
    const products = await this.getProducts();
    const brands = await Promise.all(products.map(p => p.getBrand()));
    const refs = {
      subcategory: subcategories.map(s => s.get({ plain: true }).id),
      product: products.map(p => p.get({ plain: true }).id),
      brand: uniq(brands.filter(b => !!b).map(b => b.get({ plain: true }).id)),
    };

    return refs;
  };

  return Category;
};
