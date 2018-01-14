const express = require('express');

const public = express.Router();
const admin = express.Router();

const _r = route => require(`./routes/route.${route}.js`);

public.post('/sign-in', _r('sign-in').post);

public.get('/categories', _r('categories').get);
admin.post('/categories', _r('categories').post);
admin.put('/categories', _r('categories').put);
admin.delete('/categories', _r('categories').delete);

public.get('/brands', _r('brands').get);
admin.post('/brands', _r('brands').post);
admin.put('/brands', _r('brands').put);
admin.delete('/brands', _r('brands').delete);

public.get('/products', _r('products').get);
admin.post('/products', _r('products').post);
admin.put('/products', _r('products').put);
admin.delete('/products', _r('products').delete);

public.post('/cart', _r('cart').post);

exports.public = public;
exports.admin = admin;
