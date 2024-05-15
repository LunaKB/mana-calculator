const db = require('./db');
const config = require('../config/config');
const helper = require('../config/helper')

async function getAll() {
    const rows = await db.query(
        `SELECT * FROM secondary_effects;`
    );
    const data = helper.emptyOrRows(rows)
    return data
}

module.exports = {
    getAll
}