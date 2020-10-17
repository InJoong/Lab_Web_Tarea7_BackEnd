const knex = require('../database/connection');

const status = {
  SALIDA_DE_PLANTA: 'salida_de_planta',
  EN_LOCAL_DELIVERY_CENTER: 'ldc',
  EN_PROCESO_DE_ENTREGA: 'proceso_de_entrega',
  ENTREGA_COMPLETA: 'entrega_completada',
  ENTREGA_FALLIDA: 'entrega_fallida',
};

exports.status = status;

exports.all = () => {
  return knex
    .select('*')
    .from('order');
}

exports.create = (order) => {
  return knex('order')
    .insert({ description: order.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('order')
    .where('id', id)
    .first();
}

exports.update = (id, status) => {
  return knex('order')
          .update('status', status)
          .update('updated_at', knex.fn.now())
          .where('id', id)
}

exports.delete = (id) => {
  return knex('order')
          .delete()
          .where('id', id)
}

