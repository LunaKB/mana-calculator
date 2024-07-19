import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class EchoedCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.Echoed
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
        return `The ${this.EffectType} Effect ${this.EffectName} is being echoed.`
    }

    public override getEffectData(): string {
        return `${this.EffectType}, ${this.EffectName}`
    }
}

export class EchoedCustomizationConverter {
    static convert(element) : EchoedCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()
        return new EchoedCustomization(effectType, effectName)
    }
}