import { Ability, ConvertAbility } from "../Ability";
import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class SavingThrowCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.AlterSavingThrow
    EffectType: EffectType
    EffectName: string
    OriginalSavingThrow: Ability
    CustomSavingThrow: Ability

    constructor(effectType: EffectType, effectName: string, originalSavingThrow: Ability, customSavingThrow: Ability) {
        super()

        this.EffectType = effectType
        this.EffectName = effectName
        this.OriginalSavingThrow = originalSavingThrow
        this.CustomSavingThrow = customSavingThrow
    }

    public override getCost(): number {
        return 3
    }
    public override getSummary(): string {
        if (this.EffectName == '')
            return 'No effect selected.'
        return `The saving throw for ${this.EffectType} Effect ${this.EffectName} changed from ${this.OriginalSavingThrow} to ${this.CustomSavingThrow}`
    }
}

export class SavingThrowCustomizationConverter {
    static convert(element) : SavingThrowCustomization {
        var data = element.effect_data.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()
        var original = ConvertAbility.convert(data[2].trim())
        var custom = ConvertAbility.convert(data[3].trim())
        return new SavingThrowCustomization(effectType, effectName, original, custom)
    }
}