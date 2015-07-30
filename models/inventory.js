'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    quantity: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        models.Inventory.belongsTo(models.Product, {foreignKey: 'product_id'});
      }
    }
  });
  return Inventory;
};