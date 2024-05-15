import { BaseEffectCustomization } from "../../Models/Cost/BaseEffectCustomization";
import { ConvertEffectCustomizationType, EffectCustomizationType } from "../../Models/Effect";
import { List } from "./List";

export class BaseEffectCustomizationList extends List<BaseEffectCustomization> {
    constructor(...values: BaseEffectCustomization[]) {
        super(...values)
    }

    override getItemById(id: number): BaseEffectCustomization {
        throw new Error("Method not implemented.");
    }
    
    override getItemByUUID(uuid: string): BaseEffectCustomization {
        throw new Error("Method not implemented.");
    }

    override getItemByName(name: string): BaseEffectCustomization {
        var type = ConvertEffectCustomizationType.convert(name)
        return this.getItemByType(type)
    }    

    getItemByType(type: EffectCustomizationType): BaseEffectCustomization {
        return this.array.find(item => item.CustomizationType == type)
    }
}