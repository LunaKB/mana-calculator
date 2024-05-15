import { DataService } from "../Services/Data/DataService"
import { ArrayList } from "../Utils/List/ArrayList"
import { BaseEffectCustomizationList } from "../Utils/List/BaseEffectCustomizationList"
import { CastingInfo } from "./CastingInfo"
import { AbilityScoreCustomizationConverter } from "./Cost/AbilityScoreCustomization"
import { AffinityCustomizationConverter } from "./Cost/AffinityCustomization"
import { BaseEffectCustomization } from "./Cost/BaseEffectCustomization"
import { DamageIncreaseCustomizationConverter } from "./Cost/DamageIncreaseCustomization"
import { EchoedCustomizationConverter } from "./Cost/EchoedCustomization"
import { InhibitCustomizationConverter } from "./Cost/InhibitCustomization"
import { PowerWordCustomizationConverter } from "./Cost/PowerWordCustomization"
import { RichochetCustomizationConverter } from "./Cost/RichochetCustomization"
import { SavingThrowCustomizationConverter } from "./Cost/SavingThrowCustomization"
import { StealthedCustomizationConverter } from "./Cost/StealthedCustomization"
import { TemporaryFeatConverter } from "./Cost/TemporaryFeatCustomization"
import { EffectCustomizationTypeConverter, EffectCustomizationType } from "./Effect"
import { SpellBaseInfo, SpellBaseInfoConverter } from "./SpellBase"

export class CustomSpell {
    UniqueId: string
    OriginCasterId: string
    AdditionalCasterIdList: ArrayList<string>
    SpellLevel: number
    PrimaryEffectId: number
    SecondaryEffectIdList: ArrayList<number>
    CodaIdList: ArrayList<number>
    EffectCustomizations: BaseEffectCustomizationList
    SpellName: string
    Description: string
    SpellAlteration: SpellBaseInfo

    IsEditable = false

    constructor(
        originCasterId: string, additionalCasterIdList: ArrayList<string>, spellLevel: number, 
        primaryEffectId: number, secondaryEffectIdList: ArrayList<number>, codaIdList: ArrayList<number>, 
        effectCustomizations: BaseEffectCustomizationList, name: string, description: string, spellAlteration: SpellBaseInfo, spellId?: string) {
        this.OriginCasterId = originCasterId
        this.AdditionalCasterIdList = additionalCasterIdList
        this.SpellLevel = spellLevel
        this.PrimaryEffectId = primaryEffectId
        this.SecondaryEffectIdList = secondaryEffectIdList
        this.CodaIdList = codaIdList
        this.EffectCustomizations = effectCustomizations
        this.SpellName = name
        this.Description = description
        this.SpellAlteration = spellAlteration

        if (spellId)
            this.UniqueId = spellId
        else
            this.UniqueId = Math.random().toString(16).slice(2)
    }

    getCastingInfo(dataService: DataService) : CastingInfo {
        return dataService.getCastingInfo(
            this.SpellLevel,
            this.SpellAlteration,
            this.OriginCasterId,
            this.AdditionalCasterIdList,
            this.PrimaryEffectId,
            this.SecondaryEffectIdList,
            this.CodaIdList,
            this.EffectCustomizations)
    }

    clone() : CustomSpell {
        return new CustomSpell(
            this.OriginCasterId,
            this.AdditionalCasterIdList,
            this.SpellLevel,
            this.PrimaryEffectId,
            this.SecondaryEffectIdList,
            this.CodaIdList,
            this.EffectCustomizations,
            this.SpellName,
            this.Description,
            this.SpellAlteration,
            this.UniqueId
        )
    }
}

export class CustomSpellDTO {
    UniqueId: string
    OriginCasterId: string
    AdditionalCasterIdList: Array<string>
    SpellLevel: number
    PrimaryEffectId: number
    SecondaryEffectIdList: Array<number>
    CodaIdList: Array<number>
    EffectCustomizations: Array<BaseEffectCustomization>
    SpellName: string
    Description: string
    SpellAlteration: SpellBaseInfo    

    constructor(
        originCasterId: string, additionalCasterIdList: Array<string>, spellLevel: number, 
        primaryEffectId: number, secondaryEffectIdList: Array<number>, codaIdList: Array<number>, 
        effectCustomizations: Array<BaseEffectCustomization>, name: string, description: string, spellAlteration: SpellBaseInfo, spellId: string) {
        this.OriginCasterId = originCasterId
        this.AdditionalCasterIdList = additionalCasterIdList
        this.SpellLevel = spellLevel
        this.PrimaryEffectId = primaryEffectId
        this.SecondaryEffectIdList = secondaryEffectIdList
        this.CodaIdList = codaIdList
        this.EffectCustomizations = effectCustomizations
        this.SpellName = name
        this.Description = description
        this.SpellAlteration = spellAlteration
        this.UniqueId = spellId
    }
}

export class CustomSpellConverter {
    static convertSpellAlteration(element) : SpellBaseInfo {
        if (element == null)
            return new SpellBaseInfo(0, "", "", 0, "", "", "")
        return SpellBaseInfoConverter.convert(element)
    }

    static convertSecondaryEffectIds(element) : ArrayList<number> {
        if (element == null)
            return new ArrayList<number>()
        return CustomSpellConverter.convertNumberList(element.secondary_effect_id_list)
    }

    static convertCodaIds(element) : ArrayList<number> {
        if (element == null)
            return new ArrayList<number>()
        return CustomSpellConverter.convertNumberList(element.coda_id_list)
    }

    static convertCasterIds(element) : ArrayList<string> {
        if (element == null)
            return new ArrayList<string>()
        return CustomSpellConverter.convertStringList(element.additional_caster_id_list)
    }

    static convertStringList(element) : ArrayList<string> {
        if (element == null)
            return new ArrayList<string>()
        return new ArrayList<string>(...element.split(','))
    }

    static convertNumberList(element) : ArrayList<number> {
        if (element == null)
            return new ArrayList<number>()
        return new ArrayList<number>(...Array.from(element.split(','), (value) => Number(value)))
    }

    static convertBaseEffectCustomizations(element) : BaseEffectCustomizationList {
        var list = new BaseEffectCustomizationList()
        if (element == null)
            return list

        element.forEach(customizationElement => {
            var effectType = EffectCustomizationTypeConverter.convert(customizationElement.effect_name)
            list.add(this.convertBaseEffectCustomization(effectType, customizationElement))
        })
        return list
    }

    private static convertBaseEffectCustomization(type: EffectCustomizationType, element) : BaseEffectCustomization {
        switch(type) {
            case EffectCustomizationType.Capacity:
                return AbilityScoreCustomizationConverter.convert(element)

            case EffectCustomizationType.Feat:
                return TemporaryFeatConverter.convert(element)

            case EffectCustomizationType.DamageIncrease:
                return DamageIncreaseCustomizationConverter.convert(element)
                
            case EffectCustomizationType.AlterSavingThrow:
                return SavingThrowCustomizationConverter.convert(element)
                
            case EffectCustomizationType.Inhibit:
                return InhibitCustomizationConverter.convert(element)
                
            case EffectCustomizationType.Echoed:
                return EchoedCustomizationConverter.convert(element)
                
            case EffectCustomizationType.AlterAspect:
                return AffinityCustomizationConverter.convert(element)
                
            case EffectCustomizationType.PowerWord:
                return PowerWordCustomizationConverter.convert(element)
                   
            case EffectCustomizationType.Ricochet:
                return RichochetCustomizationConverter.convert(element)
                
            case EffectCustomizationType.Stealthed:
                return StealthedCustomizationConverter.convert(element)
                                                       
            default:
                return null
        }
    }
}