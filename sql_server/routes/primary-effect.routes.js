const express = require('express');
const primaryEffect = require('../controllers/primary-effect.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await primaryEffect.getAll());
    } catch (err) {
        console.error(`Error while getting primary effects: ${err.message}`);
        next(err);
    }
});

module.exports = router;