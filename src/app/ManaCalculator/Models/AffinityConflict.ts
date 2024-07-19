export class AffinityConflict {
    NumberOfAspects: number
    DCIncrease: number
    Benefit: string

    constructor(numberOfAspects: number, dcIncrease: number, benefit: string) {
        this.NumberOfAspects = numberOfAspects
        this.DCIncrease = dcIncrease
        this.Benefit = benefit
    }
}

export class ConvertAffinityConflictData {
    static fromServer(data) : AffinityConflict {
        return new AffinityConflict(data.numberOfAspects, data.conSaveIncrease, data.benefitDescription)
    }
}