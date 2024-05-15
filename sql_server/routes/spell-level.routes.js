const express = require('express');
const spellLevel = require('../controllers/spell-level.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await spellLevel.getAll());
    } catch (err) {
        console.error(`Error while getting spell levels: ${err.message}`);
        next(err);
    }
});

module.exports = router;