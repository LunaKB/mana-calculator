import { Ability, ConvertAbility } from "../Ability";
import { EffectCustomizationType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class AbilityScoreCustomization extends BaseEffectCustomization{
    public override CustomizationType = EffectCustomizationType.Capacity;
    Ability: Ability
    Cost: number

    constructor(ability: Ability, cost: number) {
        super()
        
        this.Ability = ability
        this.Cost = cost
    }

    override getCost(): number {
        return this.Cost
    }
    public override getSummary(): string {
        return `Raising ${this.Ability.valueOf()} by ${this.getScore()} points.`
    }

    getScore() : number {
        return this.Cost + 1
    }
}

export class AbilityScoreCustomizationConverter {
    static convert(element) : AbilityScoreCustomization {
        var data = element.effect_data.split(',')
        var ability = ConvertAbility.convert(data[0].trim())
        var cost = Number(data[1].trim())
        return new AbilityScoreCustomization(ability, cost)
    }
}