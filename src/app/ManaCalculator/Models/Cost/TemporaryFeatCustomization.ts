import { EffectCustomizationType } from "../Effect"
import { BaseEffectCustomization } from "./BaseEffectCustomization"

export class TemporaryFeatCustomization extends BaseEffectCustomization {
    public override CustomizationType = EffectCustomizationType.Feat
    FeatName: string
    HasFeat: boolean

    constructor(name: string, hasFeat: boolean) {
        super()

        this.FeatName = name
        this.HasFeat = hasFeat
    }

    override getCost(): number {
        if (this.HasFeat)
            return 2
        else
            return 4
    }

    public override getSummary(): string {
        if (this.FeatName == "")
            return 'No feat set.'
        var hasFeatMessage = ""
        if (this.HasFeat)
            hasFeatMessage = "Caster has feat."
        else
            hasFeatMessage = "Caster does not have feat."

        return `Spending ${this.getCost()} to give ${this.FeatName}. ${hasFeatMessage}`
    }

    public override getEffectData(): string {
        return `${this.FeatName}, ${this.HasFeat}`
    }
}

export class TemporaryFeatConverter {
    static convert(element) : TemporaryFeatCustomization {
        var data = element.effectData.split(',')
        var featName = data[0].trim()
        var hasFeat = Boolean(data[1].trim())
        return new TemporaryFeatCustomization(featName, hasFeat)
    }
}