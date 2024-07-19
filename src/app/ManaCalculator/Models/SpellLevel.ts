export class SpellLevelInfo {
    CharacterLevel: string
    SpellLevel: number
    SingleTargetDamage: number
    MultipleTargetDamage: number

    SingleTargetDie = "d10"
    MultipleTargetDie = "d6"

    constructor(characterLevel: string, spellLevel: number, singleTarget: number, multipleTarget: number) {
        this.CharacterLevel = characterLevel
        this.SpellLevel = spellLevel
        this.SingleTargetDamage = singleTarget
        this.MultipleTargetDamage = multipleTarget
    }
}

export class ConvertSpellLevelInfoData {
    static fromServer(data) : SpellLevelInfo {
        return new SpellLevelInfo(data.characterLevel, data.spellLevel, data.singleDamage, data.multipleDamage)
    }
}