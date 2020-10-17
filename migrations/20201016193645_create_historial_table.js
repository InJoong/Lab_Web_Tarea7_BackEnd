
exports.up = function(knex) {
    return knex.schema
    .createTable('event_table', (table) => {
        table.increments('id');
        table.integer('order_id')
              .unsigned()
              .references('id')
              .inTable('order')
              .notNullable()
              .onDelete('CASCADE');
        table.string('from_status', 512).notNullable();
        table.string('to_status', 512).notNullable();
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema
      .dropTable('event_table');
  };
