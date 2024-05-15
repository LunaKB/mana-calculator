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

export class EffectCustomizationTypeConverter {
    static isType(text: string ) : boolean {
        return Object.values(EffectCustomizationType).some(val => val.valueOf() == text)
    }

    static convert(text: string) : EffectCustomizationType {
        return Object.values(EffectCustomizationType).find(val => val.valueOf() == text)
    }
}