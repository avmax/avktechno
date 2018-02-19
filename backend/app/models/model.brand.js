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
        defaultValue: 'http://localhost:4251/placeholder.jpg',
      },
    },
  );

  Brand.prototype.retrieve = function() {
    const plain = cloneDeep(this.get({ plain: true }));

    delete plain.createdAt;
    delete plain.updatedAt;

    return plain;
  };

  return Brand;
};
