const knex = require('../database/connection');

exports.all = () => {
    return knex
      .select('*')
      .from('event_table');
}

exports.create = (event) => {
    return knex('event_table')
            .insert({
                order_id: event.order_id,
                from_status: event.from_status,
                to_status: event.to_status,
            })
}