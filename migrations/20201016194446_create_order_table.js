let Order = require('../models/Order')

exports.up = function(knex) {
    return knex.schema
      .createTable('order', (table) => {
        table.increments('id');
        table.string('description', 512).notNullable();
        table.string('status', 512).notNullable().defaultTo(Order.status.SALIDA_DE_PLANTA);
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('order');
  };
