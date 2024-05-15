const db = require('./db');
const config = require('../config/config');
const helper = require('../config/helper')

async function post(data) {
    results = await db.query(
        `INSERT INTO casters
        VALUES('${data.Id}', '${data.Name}', ${data.ManaPointMax}, ${data.Mind}, ${data.Source}, ${data.Will});`
    )
    message = 'Error adding caster.'
    if (results.affectedRows)
        message = 'Caster added successfully.'
    return message
}

async function update(id, data) {
    results = await db.query(
        `UPDATE casters
        SET name = '${data.Name}', mana_points = ${data.ManaPointMax}, mind = ${data.Mind}, source = ${data.Source}, will = ${data.Will}
        WHERE uuid = '${id}';`
    )
    message = 'Error updating caster.'
    if (results.affectedRows)
        message = 'Caster updated successfully.'
    return message
}

async function remove(id) {
    results = await db.query(
        `DELETE FROM casters
        WHERE uuid = '${id}';`
    )
    message = 'Error deleting caster.'
    if (results.affectedRows)
        message = 'Caster deleted successfully.'
    return message
}

async function getAll() {
    rows = await db.query(
        `SELECT * FROM casters;`
    );
    data = helper.emptyOrRows(rows)
    return data
}

module.exports = {
    getAll,
    post,
    update,
    remove
}