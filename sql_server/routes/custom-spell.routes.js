const express = require('express');
const customSpell = require('../controllers/custom-spell.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await customSpell.getAll());
    } catch (err) {
        console.error(`Error while getting custom spell: ${err.message}`);
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await customSpell.post(req.body));
    } catch (err) {
        console.error(`Error while posting custom spell: ${err.message}`);
        next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        res.json(await customSpell.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while posting custom spell: ${err.message}`);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try {
        res.json(await customSpell.remove(req.params.id))
    } catch (err) {
        console.error(`Error while removing custom spell: ${err.message}`)
        next(err)
    }
})

module.exports = router;