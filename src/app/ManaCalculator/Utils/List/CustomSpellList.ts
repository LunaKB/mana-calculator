import { CustomSpell } from "../../Models/CustomSpell";
import { List } from "./List";

export class CustomSpellList extends List<CustomSpell> {
    override getItemById(id: number): CustomSpell {
        throw new Error("Method not implemented.");
    }
    
    override getItemByUUID(uuid: string): CustomSpell {
        return this.array.find(item => item.UniqueId == uuid)
    }

    override getItemByName(name: string): CustomSpell {
        throw new Error("Method not implemented.");
    }

    updateItem(customSpell: CustomSpell) {
        var item = this.getItemByUUID(customSpell.UniqueId)
        if (item == undefined)
            return
        
        item.OriginCasterId = customSpell.OriginCasterId
        item.AdditionalCasterIdList = customSpell.AdditionalCasterIdList
        item.SpellLevel = customSpell.SpellLevel
        item.PrimaryEffectId = customSpell.PrimaryEffectId
        item.SecondaryEffectIdList = customSpell.SecondaryEffectIdList
        item.CodaIdList = customSpell.CodaIdList
        item.EffectCustomizations = customSpell.EffectCustomizations
        item.SpellName = customSpell.SpellName
        item.Description = customSpell.Description
        item.SpellAlteration = customSpell.SpellAlteration
    }

    removeItemByUUID(id: string) {
        var item = this.getItemByUUID(id)
        if (item != undefined)
            this.remove(item)
    }
}