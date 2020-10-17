const EventTable = require('../models/EventTable');

exports.getAll = (req, res) => {
    EventTable.all().then((events) => {
        res.json(events)
    })
}