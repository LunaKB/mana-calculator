const express = require('express');
const coda = require('../controllers/coda.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await coda.getAll());
    } catch (err) {
        console.error(`Error while getting codas: ${err.message}`);
        next(err);
    }
});

module.exports = router;