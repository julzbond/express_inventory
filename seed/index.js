var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force:true})

  .then(function(){
    //Add Product
    var productData = [];
    var TOTAL_PRODUCTS = faker.random.number({min:10, max:30});
    for (var i = 0; i < TOTAL_PRODUCTS; i++){
      productData.push({
        name: faker.commerce.productName(),
        description: "This " + faker.commerce.productAdjective().toLowerCase() + " product is made out of " + faker.commerce.productMaterial().toLowerCase() + " materials.",
        price: Number(faker.commerce.price(0, 10000, 2))
      });
    }
    return models.Product
      .bulkCreate(productData, {returning: true});
  })

  .then(function(products){
    //Add Inventory
    var inventoryData = [];
    for (var i = 0; i < products.length; i++) {
      inventoryData.push({
        quantity: faker.random.number({min: 0, max: 100}),
        product_id: products[i].id
      });
    }
    return models.Inventory
      .bulkCreate(inventoryData, {returning: true});
  });