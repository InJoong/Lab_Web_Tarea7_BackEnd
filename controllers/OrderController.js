const Order = require('../models/Order');
const EventTable = require('../models/EventTable');

exports.getAll = (req, res) => {
  Order.all().then((data) => {
      res.json(data);
  })
}

exports.store = (req, res) => {
  let order = { description: req.body.description};
  
  Order.create(order).then((id) => {
    console.log('Order created with id: ', id);

    Order.find(id).then((order) => res.json(order));
  });
}

exports.update = (req, res) => {
  let orderId = req.body.id;
  let toStatus = req.body.to_status;

  if(!validateStatus(toStatus)) {
    res.sendStatus(418);
  }

  Order.find(orderId).then((order) => {
    let event = {
      order_id: order.id,
      from_status: order.status,
      to_status: toStatus,
    }

    if(!validateStatusPosition(order.status, toStatus)) {
      return res.sendStatus(419);
    }

    EventTable.create(event).then((id) => {
      console.log('Event created with id: ', id);
    });

    Order.update(orderId, toStatus).then((data) => {
      console.log('Order updated with id: ', orderId);
      res.json({ id: orderId })
    })
  });
}

exports.delete = (req, res) => {
  let orderId = req.body.id;

  Task.delete(orderId).then((data) => {
      console.log('Order deleted with id: ', orderId)
      res.json({ id: taskId })
  })
}

function validateStatus(toStatus) {
  switch(toStatus) {
    case Order.status.SALIDA_DE_PLANTA:
      return true;
    case Order.status.EN_LOCAL_DELIVERY_CENTER:
      return true;
    case Order.status.EN_PROCESO_DE_ENTREGA:
      return true;
    case Order.status.ENTREGA_COMPLETA:
      return true;
    case Order.status.ENTREGA_FALLIDA:
      return true;
    default:
      return false
  }
}

function validateStatusPosition(from, to) {
  if(from == Order.status.ENTREGA_COMPLETA || to == Order.status.SALIDA_DE_PLANTA){
    return false;
  }

  return true;
}