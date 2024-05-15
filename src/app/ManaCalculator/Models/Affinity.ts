export enum Affinity {
    Any = "Any",
    Mind = "Mind",
    None = "No Specific Aspect",
    Source = "Source",
    Will = "Will"
}

export class AffinityConverter {
    public static convert(text: string) : Affinity {
        var convertedAffinity: Affinity
        Object.values(Affinity).forEach(affinity => {
            if (affinity.valueOf() == text)
                convertedAffinity = affinity
        })
        return convertedAffinity
    }
}