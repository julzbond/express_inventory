'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    name: DataTypes.TEXT,
    quantity: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        models.Order.belongsTo(models.Product, {foreignKey: 'product_id'});
      }
    }
  });
  return Order;
};