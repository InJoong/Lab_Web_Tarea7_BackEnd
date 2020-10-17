const router = require('express').Router();
const orderController = require('../controllers/OrderController');
const eventController = require('../controllers/EventController');

router.get('/', (req, res) => {
    res.send({ status: 'ok'})
});

router.get('/pedido', orderController.getAll);

router.get('/eventos', eventController.getAll);

router.post('/pedido', orderController.store);

router.delete('/pedido', orderController.delete)

router.put('/pedido', orderController.update)

module.exports = router;
