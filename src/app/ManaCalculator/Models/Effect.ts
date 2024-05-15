import { Affinity } from "./Affinity"

export class Effect {
    EffectType: EffectType
    Id: number
    Name: string
    Aspect: Affinity
    Description: string
    Cost: number

    constructor(effectType: EffectType, id: number, name: string, aspect: Affinity, description: string, cost: number) {
        this.EffectType = effectType
        this.Id = id
        this.Name = name
        this.Aspect = aspect
        this.Description = description
        this.Cost = cost
    }
}

export enum EffectType {
    Coda = "Coda",
    Primary = "Primary",
    Secondary = "Secondary"
}

export enum EffectCustomizationType {
    AlterAspect = "Alter Aspect",
    AlterSavingThrow = "Alter Saving Throw",
    Capacity = "Boost of Curtail Capacity",
    DamageIncrease = "Damage Increase",
    Echoed = "Echoed",
    Feat = "Temporary Feat",
    Inhibit = "Inhibit",
    PowerWord = "Power Word",
    Ricochet = "Ricochet",
    Stealthed = "Stealthed"
}

export class ConvertEffectCustomizationType {
    static isEffectCustomizationType(text: string ) : boolean {
        var exists = false
        Object.values(EffectCustomizationType).forEach(effect=> {
            if (effect.valueOf() == text)
                exists = true
        })
        return exists
    }

    static convert(text: string) : EffectCustomizationType {
        var convertedEffect: EffectCustomizationType = null
        Object.values(EffectCustomizationType).forEach(effect=> {
            if (effect.valueOf() == text)
                convertedEffect = effect
        })
        return convertedEffect
    }
}