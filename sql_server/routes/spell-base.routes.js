const express = require('express');
const spellBase = require('../controllers/spell-base.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await spellBase.getAll());
    } catch (err) {
        console.error(`Error while getting spell bases: ${err.message}`);
        next(err);
    }
});

module.exports = router;