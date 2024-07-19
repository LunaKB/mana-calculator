export class SpellBaseInfo {
    Cost: number
    CastingTime: string
    Range: string
    Target: number
    Area: string
    AreaSize: string
    Duration: string

    constructor(cost: number, castingTime: string, range: string, target: number, area: string, areaSize: string, duration: string) {
        this.Cost = cost
        this.CastingTime = castingTime
        this.Range = range
        this.Target = target
        this.Area = area
        this.AreaSize = areaSize
        this.Duration = duration
    }
}

export class SpellBaseInfoDTO {    
    spellId: string
    cost: number
    castingTime: string
    range: string
    target: number
    area: string
    areaSize: string
    duration: string

    constructor(spellId: string, cost: number, castingTime: string, range: string, target: number, area: string, areaSize: string, duration: string) {
        this.spellId = spellId
        this.cost = cost
        this.castingTime = castingTime
        this.range = range
        this.target = target
        this.area = area
        this.areaSize = areaSize
        this.duration = duration
    }
}

export class SpellBaseInfoConverter {
    static convert(element) : SpellBaseInfo {
        return new SpellBaseInfo(
            element.cost,
            element.castingTime,
            element.range,
            element.target,
            element.area,
            element.areaSize,
            element.duration
        )
    }

    static toServer(id: string, spellAlteration: SpellBaseInfo) : SpellBaseInfoDTO {
        return new SpellBaseInfoDTO(
            id, spellAlteration.Cost, spellAlteration.CastingTime,
            spellAlteration.Range, spellAlteration.Target, spellAlteration.Area,
            spellAlteration.AreaSize, spellAlteration.Duration)
    }
}