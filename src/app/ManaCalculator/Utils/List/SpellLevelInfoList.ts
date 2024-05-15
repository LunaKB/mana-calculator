import { SpellLevelInfo } from "../../Models/SpellLevel";
import { List } from "./List";

export class SpellLevelInfoList extends List<SpellLevelInfo> {
    constructor(...values: SpellLevelInfo[]) {
        super(...values)
    }

    override getItemById(id: number): SpellLevelInfo {
        return this.array.find(item => item.SpellLevel == id)
    }

    override getItemByName(name: string): SpellLevelInfo {
        throw new Error("Method not implemented.");
    }
    
    override getItemByUUID(uuid: string): SpellLevelInfo {
        throw new Error("Method not implemented.");
    }
}