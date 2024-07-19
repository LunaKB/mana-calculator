import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class RichochetCustomization extends BaseEffectCustomization {
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
        return `The ${this.EffectType} Effect ${this.EffectName} will richochet.`
    }
}

export class RichochetCustomizationConverter {
    static convert(element) : RichochetCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()        
        return new RichochetCustomization(effectType, effectName)
    }
}