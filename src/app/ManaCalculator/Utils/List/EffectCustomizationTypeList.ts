import { EffectCustomizationType } from "../../Models/Effect";
import { List } from "./List";

export class EffectCustomizationTypeList extends List<EffectCustomizationType> {
    constructor(...values: EffectCustomizationType[]) {
        super(...values)
    }

    override getItemById(id: number): EffectCustomizationType {
        throw new Error("Method not implemented.");
    }
    
    override getItemByName(name: string): EffectCustomizationType {
        throw new Error("Method not implemented.");
    }
    
}