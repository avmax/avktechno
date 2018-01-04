module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
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
      title: {
        type: DataTypes.STRING,
        defaultValue: 'some category title',
      },
      imgUrl: {
        type: DataTypes.STRING,
        defaultValue: 'http://lorempixel.com/400/200/sports/1/',
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  );
};
