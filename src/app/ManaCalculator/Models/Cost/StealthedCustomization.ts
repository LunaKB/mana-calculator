import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class StealthedCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.Stealthed
    EffectType: EffectType
    EffectName: string

    constructor(effectType: EffectType, effectName: string) {
        super()

        this.EffectType = effectType
        this.EffectName = effectName
    }

    public override getCost(): number {
        return 1
    }
    public override getSummary(): string {
        if (this.EffectName == '')
            return 'No effect selected.'
        return `The ${this.EffectType} Effect ${this.EffectName} will be stealthed.`
    }
}

export class StealthedCustomizationConverter {
    static convert(element) : StealthedCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()        
        return new StealthedCustomization(effectType, effectName)
    }
}