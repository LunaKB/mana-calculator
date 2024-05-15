const db = require('./db');
const config = require('../config/config');
const helper = require('../config/helper')

async function getAll() {
    const rows = await db.query(
        `SELECT uuid FROM custom_spells;`
    );
    const data = helper.emptyOrRows(rows)

    var results = []
    for(let uuid of data) {
        var result = []

        res1 = await db.query(
            `SELECT * FROM custom_spells WHERE uuid="${uuid.uuid}";`
        );
        data1 = helper.emptyOrRows(res1)
        result.push(data1[0])

        res2 = await db.query(
            `SELECT * FROM custom_spell_base WHERE spell_id="${uuid.uuid}";`
        );
        data2 = helper.emptyOrRows(res2)
        result.push(data2[0])

        res3 = await db.query(
            `SELECT effect_name, effect_data FROM custom_spell_effect_customizations WHERE spell_id="${uuid.uuid}";`
        )
        data3 = helper.emptyOrRows(res3)
        result.push(data3)

        results.push(result)

    }

    return results
}

async function remove(id) {
    results = await db.query(
        `DELETE FROM custom_spells
        WHERE uuid = '${id}';`
    )
    message = 'Error deleting custom spell.'
    if (results.affectedRows)
        message = 'Custom spell deleted successfully.'
    return message    
}

async function post(data) {
    var success = false
    var message = "Error adding spell"

    if (true){
        var additionalCastersQuery = getAdditionalCastersQuery(data)
        var secondaryEffectQuery = getSecondaryEffectQuery(data)        
        var codasQuery = getCodasQuery(data)
        var spellValues = `"${data.UniqueId}", "${data.OriginCasterId}", ${additionalCastersQuery}, ${data.SpellLevel}, ${data.PrimaryEffectId}, ${secondaryEffectQuery}, ${codasQuery}, "${data.SpellName}", "${data.Description}"`
        var result = await db.query(
            `INSERT INTO custom_spells(uuid, origin_caster_id, spell_level_id, primary_effect_id, name, description)
            VALUES  (${spellValues});`
        );
        if (result.affectedRows)
            success = true
        else
            success = false
    }

    if (success) {
        var spellAlteration = data.SpellAlteration
        var spellAlterationValues = `"${data.UniqueId}", ${spellAlteration.Cost}, "${spellAlteration.CastingTime}", "${spellAlteration.Range}", ${spellAlteration.Target}, "${spellAlteration.Area}", "${spellAlteration.AreaSize}", "${spellAlteration.Duration}"`;
        var result = await db.query(
            `INSERT INTO custom_spell_base
            VALUES (${spellAlterationValues});`
        )
        if (result.affectedRows)
            success = true
        else
            success = false
    }

    var effectCustomizations = data.EffectCustomizations
    if (success && effectCustomizations.length > 0) {
        var query = formatEffectCustomizationQuery(effectCustomizations, data.UniqueId)
        var result = await db.query(
            `INSERT INTO custom_spell_effect_customizations
            VALUES ${query};`
        )
        if (result.affectedRows)
            success = true
        else
            success = false  
    }    

    if (success)
        message = "Spell added successfully"
    return message
}

async function update(id, data) {
    console.log(data)

    var success = false
    var message = "Error updating spell"

    if (success && secondaryEffectIds.length > 0) {
        var query = formatIdQuery(secondaryEffectIds, data.UniqueId)
        var result = await db.query(
            `INSERT INTO custom_spell_secondary_effects
            VALUES ${query};`
        );
        if (result.affectedRows)
            success = true
        else
            success = false
    }

    if (true) {
        var additionalCastersQuery = getAdditionalCastersQuery(data)
        var secondaryEffectQuery = getSecondaryEffectQuery(data)        
        var codasQuery = getCodasQuery(data)
        var result = await db.query(
            `UPDATE custom_spells 
            SET origin_caster_id = "${data.OriginCasterId}",
                additional_caster_id_list = ${additionalCastersQuery},
                spell_level_id = ${data.SpellLevel},
                primary_effect_id = ${data.PrimaryEffectId},
                secondary_effect_id_list = ${secondaryEffectQuery},
                coda_id_list = ${codasQuery},
                name = "${data.SpellName}",
                description = "${data.Description}"
            WHERE uuid = "${id}";`
        )
        if (result.affectedRows)
            success = true
        else
            success = false
    }

    if (success) {
        var spellAlteration = data.SpellAlteration
        var result = await db.query(
            `UPDATE custom_spell_base
            SET cost = ${spellAlteration.Cost},
                casting_time = "${spellAlteration.CastingTime}",
                custom_spell_base.range = "${spellAlteration.Range}",
                target = ${spellAlteration.Target},
                area = "${spellAlteration.Area}",
                area_size = "${spellAlteration.AreaSize}",
                duration = "${spellAlteration.Duration}"
            WHERE spell_id = "${id}";`
        )
        if (result.affectedRows)
            success = true
        else
            success = false
    }

    if (success) {
        var result = await db.query(
            `DELETE FROM custom_spell_effect_customizations
            WHERE spell_id = "${id}";`
        )
        
        var effectCustomizations = data.EffectCustomizations
        if (effectCustomizations.length > 0) {
            var query = formatEffectCustomizationQuery(effectCustomizations, id)
            result = await db.query(
                `INSERT INTO custom_spell_effect_customizations
                VALUES ${query};`
            )
            if (result.affectedRows)
                success = true
            else
                success = false  
        } 
    }

    if (success)
        message = "Spell updated successfully"
    console.log(message)
}

function getAdditionalCastersQuery(data) {
    var query = `""`
    var additionalCasterIds = data.AdditionalCasterIdList
    if (additionalCasterIds.length > 0)
        query = formatIdQuery(additionalCasterIds)
    return query    
}

function getSecondaryEffectQuery(data) {
    var query = `""`
    var secondaryEffectIds = data.SecondaryEffectIdList
    if (secondaryEffectIds.length > 0)
        query = formatIdQuery(secondaryEffectIds)
    return query
}

function getCodasQuery(data) {
    var query = `""`
    var codaIds = data.CodaIdList
    if (codaIds.length > 0)
        query = formatIdQuery(codaIds)
    return query    
}

function formatIdQuery(array) {
    var queryString = ""
    for (let item of array) {
        queryString += `${item}`
        if (array.indexOf(item) != array.length - 1)
            queryString += ","
    }
    return `"${queryString}"`
}

function formatEffectCustomizationQuery(array, uuid) {
    var queryString = ""
    for (let item of array) {
        switch(item.CustomizationType) {
            case 'Boost of Curtail Capacity':
                queryString += formatCapacityQuery(item, uuid)
                break
            case 'Temporary Feat':
                queryString += formatFeatQuery(item, uuid)
                break
            case 'Damage Increase':
                queryString += formatDamageQuery(item, uuid)
                break
            case 'Alter Saving Throw':
                queryString += formatSavingThrowQuery(item, uuid)
                break
            case 'Inhibit':
                queryString += formatInhibitQuery(item, uuid)
                break
            case 'Echoed':
                queryString += formatEchoedQuery(item, uuid)
                break
            case 'Alter Aspect':
                queryString += formatAffinityQuery(item, uuid)
                break
            case 'Power Word':
                queryString += formatPowerWordQuery(item, uuid)
                break
            case 'Ricochet':
                queryString += formatRichochetQuery(item, uuid)
                break
            case 'Stealthed':
                queryString += formatStealthedQuery(item, uuid)
                break
            default:
                break
        }
        if (array.indexOf(item) != array.length - 1)
            queryString += ","
    }
    return queryString
}

function formatCapacityQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.Ability}, ${item.Cost}")`    
}

function formatFeatQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.FeatName}, ${item.HasFeat}")`
}

function formatDamageQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.Cost}")`
}

function formatSavingThrowQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}, ${item.OriginalSavingThrow}, ${item.CustomSavingThrow}")`
}

function formatInhibitQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.Ability}")`
}

function formatEchoedQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}")`
}

function formatAffinityQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}, ${item.OriginalAffinity}, ${item.CustomAffinity}")`
}

function formatPowerWordQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}, ${item.Cost}")`
}

function formatRichochetQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}")`
}

function formatStealthedQuery(item, uuid) {
    return `("${uuid}", "${item.CustomizationType}", "${item.EffectType}, ${item.EffectName}")`
}

module.exports = {
    getAll,
    post,
    remove,
    update
}