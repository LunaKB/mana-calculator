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