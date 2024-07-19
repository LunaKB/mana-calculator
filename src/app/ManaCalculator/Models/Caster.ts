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
    uuid: string
    name: string
    manaPoints: number
    mind = 0
    source = 0
    will = 0

    constructor(id: string, name: string, manaPointMax: number, mind: number, source: number, will: number) {
        this.uuid = id
        this.name = name
        this.manaPoints = manaPointMax
        this.mind = mind
        this.source = source
        this.will = will
    }
}

export class CasterConverter {
    static convert(data) : Caster {
        var id = data.uuid
        var name = data.name
        var points = data.manaPoints

        var affinities = new Map<Affinity, number>()
        affinities.set(Affinity.Mind, data.mind)
        affinities.set(Affinity.Source, data.source)
        affinities.set(Affinity.Will, data.will)

        return new Caster(name, points, affinities, id)
    }

    static toServer(caster: Caster) : string {
        var casterDTO = new CasterDTO(
            caster.Id,
            caster.Name,
            caster.ManaPointMax,
            caster.Affinities.get(Affinity.Mind),
            caster.Affinities.get(Affinity.Source),
            caster.Affinities.get(Affinity.Will))
        return JSON.stringify(casterDTO)
    }
}

