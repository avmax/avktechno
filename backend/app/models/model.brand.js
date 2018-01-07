module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
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
      title: {
        type: DataTypes.STRING,
      },
      imgUrl: {
        type: DataTypes.STRING(1234) ,
        defaultValue: 'http://lorempixel.com/400/200/sports/1/',
      },
    },
  );
};
