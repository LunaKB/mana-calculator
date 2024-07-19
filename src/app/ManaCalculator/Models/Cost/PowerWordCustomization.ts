import { EffectCustomizationType, EffectType } from "../Effect";
import { BaseEffectCustomization } from "./BaseEffectCustomization";

export class PowerWordCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.PowerWord
    EffectType: EffectType
    EffectName: string
    Cost: number

    constructor(effectType: EffectType, effectName: string, cost: number) {
        super()

        this.EffectType = effectType
        this.EffectName = effectName
        this.Cost = cost
    }

    public override getCost(): number {
        return this.Cost
    }

    public override getSummary(): string {
        if (this.EffectName == "")
            return 'No effect selected.'
        return `The ${this.EffectType} Effect ${this.EffectName} happens automatically. ${this.getTargets()} target(s) affected.`
    }

    getTargets() : number {
        return this.Cost / 2
    }    
}

export class PowerWordCustomizationConverter {
    static convert(element) : PowerWordCustomization {
        var data = element.effectData.split(',')
        var effectType = EffectType[data[0].trim()]
        var effectName = data[1].trim()
        var cost = Number(data[2].trim())
        return new PowerWordCustomization(effectType, effectName, cost)
    }
}