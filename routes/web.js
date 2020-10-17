const router = require('express').Router();
const orderController = require('../controllers/OrderController');

router.get('/', (req, res) => {
    res.send({ status: 'ok'})
});

router.post('/create', orderController.store);

router.delete('/delete', orderController.delete)

router.put('/update', orderController.update)

module.exports = router;
