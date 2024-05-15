import { Affinity } from "../Models/Affinity";
import { Caster } from "../Models/Caster";
import { SpellLevelInfo } from "../Models/SpellLevel";

export class Default {
    public static DefaultAdditionalCasters = new Array<Caster>()
    public static SpellLevelInfo = new SpellLevelInfo("n/a", 0, 0, 0)
    static SpellLevel = 7
}