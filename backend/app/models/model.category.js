const { uniq, cloneDeep } = require('lodash/fp');

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
      depth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
  );

  Category.prototype.retrieve = function() {
    const plain = cloneDeep(this.get({ plain: true }));

    delete plain.createdAt;
    delete plain.updatedAt;
    delete plain.categoryId;

    return plain;
  };

  Category.prototype.setRefs = async function(refs) {
    const { category } = refs;
    if (category) {
      await this.setCategory(category);
    }
  };


  Category.prototype.getRefs = async function() {
    const products = await this.getProducts();
    const categories = await this.getCategories();
    const parent = this.get('categoryId');

    const refs = {
      product: products.map(p => p.get({ plain: true }).id),
      category: parent
        ? [parent]
        : categories.map(c => c.get({ plain: true }).id),
    };
    return refs;
  };

  return Category;
};
