const { uniq, cloneDeep } = require('lodash/fp');
const config = require('../../../config');
const BASE_URL = config.baseURL;

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
        defaultValue: `${BASE_URL}/placeholder.jpg`,
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
      // const products = await this.getProducts();
      // const categories = await Promise.all(products.map(p => p.getCategory()));
      const refs = {
        product: [],
        category: [],
      };

      return refs;
  };

  return Brand;
};
