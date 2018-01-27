import { isObject } from 'lodash/fp';

const ENTITY_TYPES = {
  category: 'category',
  brand: 'brand',
  product: 'product',
};

class ShopEntity {
  constructor({ id, name, refs }) {
    this.id = id;
    this.name = name;
    this.refs = refs;
  }

  set refs(refs) {
    if (isObject(refs)) {
      Object.keys(refs).forEach((k) => {
        const v = refs[k];
        if (!isObject(v)) {
          this.refs[k] = Array.isArray(v) ? v : [v];
        } else {
          throw new Error('ref type must not be object!');
        }
      });
    } else {
      throw new Error('refs type must be object!');
    }
  }
}

class ShopEntityBrand extends ShopEntity {
  constructor({ id, name, refs, imgUrl }) {
    super({ id, name, refs });
    this.imgUrl = imgUrl || null;
  }

  clone() {
    return new ShopEntityBrand(this);
  }
}

class ShopEntityCategory extends ShopEntity {
  constructor({ id, name, refs }) {
    super({ id, name, refs });
  }

  clone() {
    return new ShopEntityCategory(this);
  }
}

class ShopEntityProduct extends ShopEntity {
  // eslint-disable-next-line
  constructor({ id, name, refs, imgUrl, price, description, currency, footer, lists, charachteristics }) {
    super({ id, name, refs });
    this.imgUrl = imgUrl || null;
    this.price = price || null;
    this.currency = currency || null;
    this.description = description || null;
    this.footer = footer || null;
    this.lists = lists || [];
    this.charachteristics = charachteristics || [];
  }

  clone() {
    return new ShopEntityProduct(this);
  }
}

const ENTITY_CLASSES = {
  [ENTITY_TYPES.category]: ShopEntityCategory,
  [ENTITY_TYPES.brand]: ShopEntityBrand,
  [ENTITY_TYPES.product]: ShopEntityProduct,
};

export { ENTITY_TYPES, ENTITY_CLASSES, ShopEntityBrand, ShopEntityCategory, ShopEntityProduct };
