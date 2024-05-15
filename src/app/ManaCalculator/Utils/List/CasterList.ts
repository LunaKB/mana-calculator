import { Caster } from "../../Models/Caster";
import { ArrayList } from "./ArrayList";
import { List } from "./List";

export class CasterList  extends List<Caster> {
    constructor(...values: Caster[]) {
        super(...values)
    }

    getItemById(id: number) : Caster {
        return null
    }

    getItemByUUID(uuid: string) : Caster {
        return this.array.find(item => item.Id == uuid)
    }

    getItemByName(name: string) : Caster {
        return this.array.find(item => item.Name == name)
    }

    getCasterIds() : ArrayList<string> {
        return new ArrayList<string>(...Array.from(this.array, (caster) => caster.Id))
    }

    updateItem(caster: Caster) {
        var item = this.getItemByUUID(caster.Id)
        if (item == undefined)
            return

        item.Name = caster.Name
        item.ManaPointMax = caster.ManaPointMax
        item.Affinities = caster.Affinities
    }

    removeItemByUUID(id: string) {
        var item = this.getItemByUUID(id)
        if (item != undefined)
            this.remove(item)
    }
}