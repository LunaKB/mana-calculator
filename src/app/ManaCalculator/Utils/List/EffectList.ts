import { EffectCustomizationTypeConverter, Effect, EffectCustomizationType } from "../../Models/Effect";
import { ArrayList } from "./ArrayList";
import { List } from "./List";

export class EffectList extends List<Effect> {
    constructor(...values: Effect[]) {
        super(...values)
    }

    override getItemById(id: number): Effect {
        return this.array.find(item => item.Id == id)
    }
    
    override getItemByUUID(uuid: string): Effect {
        throw new Error("Method not implemented.");
    }

    override getItemByName(name: string): Effect {
        return this.array.find(item => item.Name == name)
    }

    getEffectIds() : ArrayList<number> {
        return new ArrayList<number>(...Array.from(this.array, (effect) => effect.Id))
    }

    getEffectCustomizationTypes() : Array<EffectCustomizationType> {
        var customizations = new Array<EffectCustomizationType>()
        this.array
            .filter(effect => EffectCustomizationTypeConverter.isType(effect.Name))
            .forEach(effect => customizations.push(EffectCustomizationTypeConverter.convert(effect.Name)))
        return customizations
    }
}