import { Ability, AbilityConverter } from "../Ability";
import { EffectCustomizationType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class InhibitCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.Inhibit
    Ability: Ability

    constructor(ability: Ability) {
        super()
        this.Ability = ability
    }

    public override getCost(): number {
        return 1
    }

    public override getSummary(): string {
        return `A target will have disadvantage on ${this.Ability.valueOf()} saving throws.`
    }

    public override getEffectData(): string {
        return `${this.Ability}`
    }
}

export class InhibitCustomizationConverter {
    static convert(element) : InhibitCustomization {
        var data = element.effectData.split(',')
        var ability = AbilityConverter.convert(data[0].trim())
        return new InhibitCustomization(ability)
    }
}