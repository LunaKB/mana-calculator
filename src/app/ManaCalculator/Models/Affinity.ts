export enum Affinity {
    Any = "Any",
    Mind = "Mind",
    None = "No Specific Aspect",
    Source = "Source",
    Will = "Will"
}

export class AffinityConverter {
    public static convert(text: string) : Affinity {
        return Object.values(Affinity).find(val => val.valueOf() == text)
    }
}