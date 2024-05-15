const express = require('express');
const affinityConflicts = require('../controllers/affinity-conflicts.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await affinityConflicts.getAll());
    } catch (err) {
        console.error(`Error while getting affinity conflicts: ${err.message}`);
        next(err);
    }
});

module.exports = router;