const express = require('express');
const secondaryEffect = require('../controllers/secondary-effect.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await secondaryEffect.getAll());
    } catch (err) {
        console.error(`Error while getting secondary effects: ${err.message}`);
        next(err);
    }
});

module.exports = router;