import { EffectCustomizationType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class DamageIncreaseCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.DamageIncrease;
    Cost: number

    constructor(cost: number) {
        super()

        this.Cost = cost
    }

    override getCost(): number {
        return this.Cost
    }

    public override getDC(): number {
        return this.Cost * 2
    }

    public override getSummary(): string {
        return `Increase amount of damage die by ${this.Cost}. Spellcrafting DC increased by ${this.getDC()}.`
    }    

    public override getEffectData(): string {
        return `${this.Cost}`
    }
}

export class DamageIncreaseCustomizationConverter {
    static convert(element) : DamageIncreaseCustomization {
        var data = element.effectData.split(',')
        var cost = Number(data[0].trim())
        return new DamageIncreaseCustomization(cost)
    }
}