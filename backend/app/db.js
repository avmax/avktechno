const { db: config } = require('../config');

const Sequelize = require('sequelize');
const mysql = require('mysql');
const utils = require('util');


const NAME = config.name;
const HOST = config.host;
const USERNAME = config.username;
const PASSWORD = config.password;

const Op = Sequelize.Op;

const sequelize = new Sequelize(
  NAME, USERNAME, PASSWORD, {
  host: HOST,
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
    this.c = mysql.createConnection({ host: HOST, user: USERNAME, password: PASSWORD });
    this.query = utils.promisify(this.c.query.bind(this.c));
    this.m = {
      c: this.s.import(_r('category')),
      b: this.s.import(_r('brand')),
      p: this.s.import(_r('product')),
      cp: this.s.define('category-product'),
    };
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.c.connect(async (err) => {
        if (err) throw err;

        try {
          await this.query(`
            CREATE DATABASE IF NOT EXISTS ${NAME}
          `);

          await this.query(`
            ALTER DATABASE ${NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
          `)

          await this.m.c.belongsToMany(this.m.p, { through: this.m.cp });
          await this.m.p.belongsToMany(this.m.c, { through: this.m.cp });
          await this.m.p.belongsTo(this.m.b);
          await this.m.b.hasMany(this.m.p);
          // await this.s.authenticate();
          await this.s.sync();

          console.log(`база данных <${NAME}> запущена успешно`);
          this.c.end();
          resolve();

        } catch(error) {
          console.log(`при запуске базы данных <${NAME}> произошел проеб: `, error);
          this.c.end();
          reject();
        }
      });

    });
  }
};

module.exports = new DB();
