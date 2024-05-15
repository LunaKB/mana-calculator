export enum Ability {
    Str = "Strength",
    Dex = "Dexterity",
    Con = "Constitution",
    Wis = "Wisdom",
    Int = "Intelligence",
    Cha = "Charisma"
}

export class ConvertAbility {
    static convert(text: string) : Ability {
        var convertedAbility: Ability
        Object.values(Ability).forEach(ability => {
            if (ability.valueOf() == text)
                convertedAbility = ability
        })
        return convertedAbility
    }
}