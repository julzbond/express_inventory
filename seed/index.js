var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force:true})

  .then(function(){
    var productData = [];
    var TOTAL_PRODUCTS = faker.random.number({min: 10, max: 25});
    for (var i = 0; i < TOTAL_PRODUCTS; i++){
      productData.push({
        name: faker.commerce.product(),
        description: "This product is made out of " + faker.commerce.productMaterial(),
        price: parseInt(faker.commerce.price())
      });
    }
    return models.Product
      .bulkCreate(productData, {returning: true});
  });