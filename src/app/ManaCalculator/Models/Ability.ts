export enum Ability {
    Str = "Strength",
    Dex = "Dexterity",
    Con = "Constitution",
    Wis = "Wisdom",
    Int = "Intelligence",
    Cha = "Charisma"
}

export class AbilityConverter {
    static convert(text: string) : Ability {
        return Object.values(Ability).find(val => val.valueOf() == text)
    }
}