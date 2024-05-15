const express = require('express');
const caster = require('../controllers/caster.controller')

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.json(await caster.getAll());
    } catch (err) {
        console.error(`Error while getting casters: ${err.message}`);
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await caster.post(req.body));
    } catch (err) {
        console.error(`Error while posting caster: ${err.message}`);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try {
        res.json(await caster.update(req.params.id, req.body))
    } catch(err) {
        console.error(`Error while updating caster: ${err.message}`)
        next(err)
    }
})

router.delete('/:id', async function(req, res, next){
    try {
        res.json(await caster.remove(req.params.id))
    } catch (err) {
        console.error(`Error while removing caster: ${err.message}`)
        next(err)
    }
})

module.exports = router;