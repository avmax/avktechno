const ProductError = require('../errors').ProductError;
const { isArray, cloneDeep } = require('lodash/fp');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    // associations: true
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
      identificator: {
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
          let data = this.getDataValue('description') || '';
          data = data.toString('utf-8');
          return data;
        },
      },
      footer: {
        type: DataTypes.BLOB,
        get() {
          let data = this.getDataValue('footer') || '';
          data = data.toString('utf-8');
          data = data.split('___footer-title___');
          if (data[0] || data[1]) {
            data = {
              title: data[0],
              text: data[1],
            };
          } else {
            data = null;
          }

          return data;
        },
        set(v) {
          v.title = v.title || '';
          v.text = v.text || '';
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
          let data = this.getDataValue('features') || '';
          data = data.toString('utf-8');
          data = data.split('___feature___').filter(item => !!item);
          data = data.map(item => {
            item = item.split('___feature-title___');
            item = {
              title: item[0],
              items: item[1].split('___feature-item___'),
            }
            return item;
          });
          return data;
        },
        set(v) {
          if (isArray(v)) {
            const data = v.map(item => {
              item.items = item.items.join('___feature-item___');
              item = item.title + '___feature-title___' + item.title + item.items;
              return item;
            }).join('___feature___');
            this.setDataValue('features', data);
          } else {
            this.setDataValue(null);
          }
        },
      },
      charachteristics: {
        type: DataTypes.BLOB,
        allowNull: true,
        get() {
          let data = this.getDataValue('charachteristics') || '';
          data = data.toString('utf-8');
          data = data.split('___charachteristics___').filter(item => !!item);
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
          return data;
        },
        set(v) {
          if (isArray(v)) {
            const data = v.map(item => {
              if (!item.title) return;
              item.items = item.items.map(kv => kv.key + '___charachteristics-kv___' + kv.val);
              item = item.title + '___charachteristics-title___' + item.items.join('___charachteristics-item___');
              return item;
            }).join('___charachteristics___');
            this.setDataValue('charachteristics', data);
          } else {
            this.setDataValue(null);
          }
        },
      },
    },
  );

  Product.prototype.retrieve = function() {
    const plain = cloneDeep(this.get({ plain: true }));

    delete plain.brandId;
    delete plain.categoryId;
    delete plain.createdAt;
    delete plain.updatedAt;
    return plain;
  };

  Product.prototype.setRefs = async function(refs) {
    const { category, brand } = refs;
    if (category) {
      await this.setCategory(category);
    }

    if (brand) {
      await this.setBrand(brand);
    }
  };

  Product.prototype.getRefs = async function() {
    const category = await this.getCategory();
    const brand = await this.getBrand();

    const refs = {
      brand: brand && [brand.get('id')] || [],
      category: category && [category.get('id')] || [],
    };
    return refs;
  };

  return Product;
};
