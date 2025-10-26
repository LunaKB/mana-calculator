import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class RicochetCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.Ricochet
    EffectType: EffectType
    EffectName: string

    constructor(effectType: EffectType, effectName: string) {
        super()

        this.EffectType = effectType
        this.EffectName = effectName
    }

    public override getCost(): number {
        return 2
    }

    public override getSummary(): string {
        if (this.EffectName == '')
            return 'No effect selected.'
        return `The ${this.EffectType} Effect ${this.EffectName} will ricochet.`
    }

    public override getEffectData(): string {
        return `${this.EffectType}, ${this.EffectName}`
    }
}

export class RicochetCustomizationConverter {
    static convert(element) : RicochetCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()        
        return new RicochetCustomization(effectType, effectName)
    }
}