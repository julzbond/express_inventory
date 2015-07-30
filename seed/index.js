var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force:true})

  .then(function(){
    var productData = [];
    var TOTAL_PRODUCTS = faker.random.number({min: 10, max: 25});
    for (var i = 0; i < TOTAL_PRODUCTS; i++){
      productData.push({
        name: faker.commerce.productName(),
        description: "This " + faker.commerce.productAdjective().toLowerCase() + " product is made out of " + faker.commerce.productMaterial().toLowerCase() + " materials.",
        price: Number(faker.commerce.price(0, 10000, 2))
      });
    }
    return models.Product
      .bulkCreate(productData, {returning: true});
  });