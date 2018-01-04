const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const sequelize = new Sequelize('avktechno', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  operatorsAliases: {
    $gt: Op.gt,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  logging: false,
});


const _r = model => __dirname + `/models/model.${model}.js`;
class DB {
  constructor() {
    this.s = sequelize;
    this.S = Sequelize;
    this.m = {
      c: this.s.import(_r('category')),
      b: this.s.import(_r('brand')),
      p: this.s.import(_r('product')),
      cp: this.s.define('category-product'),
    };
  }

  async init() {
    const self = this;
    await this.m.c.belongsToMany(self.m.p, { through: self.m.cp });
    await this.m.p.belongsToMany(self.m.c, { through: self.m.cp });
    await this.m.p.belongsTo(self.m.b);
    await this.m.b.hasMany(self.m.p);
    // await this.s.authenticate();
    await this.s.sync();
  }
};

module.exports = new DB();
