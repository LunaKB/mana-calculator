const express = require('express');
const test = require('../controllers/test-controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await test.get());
    } catch (err) {
        console.error(`Error while testing: ${err.message}`);
        next(err);
    }
});

module.exports = router;