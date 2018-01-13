const ProductError = require('../errors').ProductError;

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
      },
      description: {
        type: DataTypes.BLOB,
        get() {
          let data = this.getDataValue('description');
          if (data) {
            data = data.toString('utf-8');
          }
          return data;
        },
      },
      footer: {
        type: DataTypes.BLOB,
        get() {
          let data = this.getDataValue('footer');
          if (data) {
            data = data.toString('utf-8');
          }

          if (data) {
            data = data.split('___footer-title___');
            data = {
              title: data[0] || '',
              text: data[1] || '',
            };
          } else {
            data = {
              title: '',
              text: '',
            };
          }

          return data;
        },
        set(v) {
          v.title = v.title || '';
          v.title = v.text || '';
          let data = v.title + '___footer-title___' + v.text;
          this.setDataValue('footer', data);
        },
      },
      price: {
        type: DataTypes.INTEGER,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: '₽',
      },
      imgUrl: {
        type: DataTypes.STRING(1234) ,
        defaultValue: 'http://lorempixel.com/400/200/sports/1/',
      },
      features: {
        type: DataTypes.BLOB,
        allowNull: true,
        get() {
          let data = this.getDataValue('features');
          if (data) {
            data = data.toString('utf-8');
          }

          if (data) {
            data = data.split('___feature___');
            data = data.map(item => {
              item = item.split('___feature-title___');
              item = {
                title: item[0],
                items: item[1],
              }
              item.items = item.items.split('___feature-item___');
              return item;
            });
          } else {
            data = [];
          }
          return data;
        },
        set(v) {
          let data = v.map(item => {
            item.items = item.items.join('___feature-item___');
            item = item.title + '___feature-title___' + item.title + item.items;
            return item;
          }).join('___feature___');
          this.setDataValue('features', data);
        },
      },
      charachteristics: {
        type: DataTypes.BLOB,
        allowNull: true,
        get() {
          let data = this.getDataValue('charachteristics');
          if (data) {
            data = data.toString('utf-8');
          }
          if (data) {
            data = data.split('___charachteristics___');
            data = data.map(item => {
              item = item.split('___charachteristics-title___');
              item = {
                title: item[0],
                items: item[1],
              };
              item.items = item.items.split('___charachteristics-item___');
              item.items = item.items.map(s => s.split('___charachteristics-kv___'));
              item.items = item.items.filter(kv => kv[0] && kv[1]).map(kv => ({ key: kv[0], val: kv[1] }));
              return item;
            });
          } else {
            data = [];
          }
          return data;
        },
        set(v) {
          let data = v.map(item => {
            if (!item.title) return;
            item.items = item.items.map(kv => kv.key + '___charachteristics-kv___' + kv.val);
            item = item.title + '___charachteristics-title___' + item.items.join('___charachteristics-item___');
            return item;
          }).join('___charachteristics___');
          this.setDataValue('charachteristics', data);
        },
      },
    },
    {
      getterMethods: {
        async refs() {
          const category = await this.getCategories();
          const brand = await this.getBrand();
          const refs = {
            brand: brand ? [brand.get().id] : [],
            category: category.map(c => c.get().id),
          }
          return refs;
        },
        async info() {
          const brand = await this.getBrand();
          const category = await this.getCategories();
          return {
            brand: brand ? 'Бренд:' + brand.get({ plain: true }).name : null,
            category: 'Категория: ' + category.map(c => c.get({ plain: true }).name).join(','),
          };
        },
      },
    },
  );
};
