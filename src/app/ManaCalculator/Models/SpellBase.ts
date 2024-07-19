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
}