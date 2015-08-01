'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.addColumn('Orders', 'product_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    });
    done();
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.removeColumn('Orders', 'product_id');
    done();
  }
};
