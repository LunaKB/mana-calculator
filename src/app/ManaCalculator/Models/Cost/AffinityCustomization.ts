import { Affinity, AffinityConverter } from "../Affinity";
import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class AffinityCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.AlterAspect
    EffectType: EffectType
    EffectName: string
    OriginalAffinity: Affinity
    CustomAffinity: Affinity

    constructor(effectType: EffectType, effectName: string, originalAffinity: Affinity, customAffinity: Affinity) {
        super()

        this.EffectType = effectType
        this.EffectName = effectName
        this.OriginalAffinity = originalAffinity
        this.CustomAffinity = customAffinity
    }

    public override getCost(): number {
        return 1
    }

    public override getSummary(): string {
        if (this.EffectName == "")
            return 'No effect selected.'
        return `The aspect for ${this.EffectType} Effect ${this.EffectName} changed from ${this.OriginalAffinity} to ${this.CustomAffinity}`
    }

    public override getEffectData(): string {
        return `${this.EffectType}, ${this.EffectName}, ${this.OriginalAffinity}, ${this.CustomAffinity}`
    }
}

export class AffinityCustomizationConverter {
    static convert(element) : AffinityCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()
        var original = AffinityConverter.convert(data[2].trim())
        var custom = AffinityConverter.convert(data[3].trim())
        return new AffinityCustomization(effectType, effectName, original, custom)
    }
}