const express = require('express');
const delay = require('./middleware/delay');

const public = express.Router();
const admin = express.Router();

const _r = route => require(`./routes/route.${route}.js`);

public.post('/sign-in', _r('sign-in').post);

public.get('/categories', delay(300), _r('categories').get);
admin.post('/categories', _r('categories').post);
admin.put('/categories', _r('categories').put);
admin.delete('/categories', _r('categories').delete);

public.get('/categories/:id', delay(300), _r('category').get);
admin.post('/categories/:id', _r('category').post);
admin.put('/categories/:id', _r('category').put);
admin.delete('/categories/:id', _r('category').delete);

public.get('/brands', delay(300), _r('brands').get);
admin.post('/brands', _r('brands').post);
admin.put('/brands', _r('brands').put);
admin.delete('/brands', _r('brands').delete);

public.get('/brands/:id', delay(300), _r('brand').get);
admin.post('/brands/:id', _r('brand').post);
admin.put('/brands/:id', _r('brand').put);
admin.delete('/brands/:id', _r('brand').delete);

public.get('/products', delay(300), _r('products').get);
admin.post('/products', _r('products').post);
admin.put('/products', _r('products').put);
admin.delete('/products', _r('products').delete);

public.get('/products/:id', delay(300), _r('product').get);
admin.post('/products/:id', _r('product').post);
admin.put('/products/:id', _r('product').put);
admin.delete('/products/:id', _r('product').delete);

exports.public = public;
exports.admin = admin;
