module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'product',
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
      title: {
        type: DataTypes.STRING,
        defaultValue: 'some product title',
      },
      imgUrl: {
        type: DataTypes.STRING,
        defaultValue: 'http://lorempixel.com/400/200/sports/1/',
      },
    },
  );
};