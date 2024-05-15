import { Id } from "../Utils/Id";
import { Affinity } from "./Affinity";

export class Caster {
    Id: string
    Name: string
    ManaPointMax: number
    Affinities: Map<Affinity, number>

    IsEditable = false

    constructor(name: string, manaPointMax: number, affinities: Map<Affinity, number>, id?: string) {
        this.Name = name
        this.ManaPointMax = manaPointMax
        this.Affinities = affinities

        if (id)
            this.Id = id
        else
            this.Id = Id.generateUniqueId()
    }
}

export class CasterDTO {
    Id: string
    Name: string
    ManaPointMax: number
    Mind = 0
    Source = 0
    Will = 0

    constructor(id: string, name: string, manaPointMax: number, mind: number, source: number, will: number) {
        this.Id = id
        this.Name = name
        this.ManaPointMax = manaPointMax
        this.Mind = mind
        this.Source = source
        this.Will = will
    }
}

export class CasterConverter {
    public static convert(data) : Caster {
        var id = data.uuid
        var name = data.name
        var points = data.mana_points

        var affinities = new Map<Affinity, number>()
        affinities.set(Affinity.Mind, data.mind)
        affinities.set(Affinity.Source, data.source)
        affinities.set(Affinity.Will, data.will)

        return new Caster(name, points, affinities, id)
    }
}

