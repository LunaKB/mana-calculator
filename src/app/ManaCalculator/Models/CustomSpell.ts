import { DataService } from "../Services/Data/DataService"
import { ArrayList } from "../Utils/List/ArrayList"
import { BaseEffectCustomizationList } from "../Utils/List/BaseEffectCustomizationList"
import { CastingInfo } from "./CastingInfo"
import { AbilityScoreCustomizationConverter } from "./Cost/AbilityScoreCustomization"
import { AffinityCustomizationConverter } from "./Cost/AffinityCustomization"
import { BaseEffectCustomization, BaseEffectCustomizationDTO, ConverBaseEffectCustomization } from "./Cost/BaseEffectCustomization"
import { DamageIncreaseCustomizationConverter } from "./Cost/DamageIncreaseCustomization"
import { EchoedCustomizationConverter } from "./Cost/EchoedCustomization"
import { InhibitCustomizationConverter } from "./Cost/InhibitCustomization"
import { PowerWordCustomizationConverter } from "./Cost/PowerWordCustomization"
import { RicochetCustomizationConverter } from "./Cost/RicochetCustomization"
import { SavingThrowCustomizationConverter } from "./Cost/SavingThrowCustomization"
import { StealthedCustomizationConverter } from "./Cost/StealthedCustomization"
import { TemporaryFeatConverter } from "./Cost/TemporaryFeatCustomization"
import { EffectCustomizationTypeConverter, EffectCustomizationType } from "./Effect"
import { SpellBaseInfo, SpellBaseInfoConverter, SpellBaseInfoDTO } from "./SpellBase"

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
    uuid: string
    originCasterId: string
    additionalCasterIdList: string
    spellLevel: number
    primaryEffectId: number
    secondaryEffectIdList: string
    codaIdList: string
    spellEffectCustomizations: Array<BaseEffectCustomizationDTO>
    name: string
    description: string
    customSpellBase: SpellBaseInfoDTO  

    constructor(
        originCasterId: string, additionalCasterIdList: string, spellLevel: number, 
        primaryEffectId: number, secondaryEffectIdList: string, codaIdList: string, 
        effectCustomizations: Array<BaseEffectCustomizationDTO>, name: string, description: string, 
        spellAlteration: SpellBaseInfoDTO, spellId: string) {
        this.originCasterId = originCasterId
        this.additionalCasterIdList = additionalCasterIdList
        this.spellLevel = spellLevel
        this.primaryEffectId = primaryEffectId
        this.secondaryEffectIdList = secondaryEffectIdList
        this.codaIdList = codaIdList
        this.spellEffectCustomizations = effectCustomizations
        this.name = name
        this.description = description
        this.customSpellBase = spellAlteration
        this.uuid = spellId
    }
}

export class CustomSpellConverter {
    static fromServer(data) : CustomSpell {
        var additionalCasters = this.convertCasterIds(data)
        var spellSecondaryEffects = this.convertSecondaryEffectIds(data)
        var spellCodaEffects = this.convertCodaIds(data)
        var spellEffectCustomizations = this.convertBaseEffectCustomizations(data)
        var spellAlteration = this.convertSpellAlteration(data)

        return new CustomSpell(
            data.originCasterId,
            additionalCasters,
            data.spellLevel,
            data.primaryEffectId,
            spellSecondaryEffects,
            spellCodaEffects,
            spellEffectCustomizations,
            data.name,
            data.description,
            spellAlteration,
            data.uuid)
    }

    static toServer(spell: CustomSpell) : string {
        var effectCustomizationsDTOs = Array<BaseEffectCustomizationDTO>()
        spell.EffectCustomizations.getItems().forEach(effectCustomization => {
            effectCustomizationsDTOs.push(ConverBaseEffectCustomization.toServer(spell.UniqueId, effectCustomization))
        })

        var serverSpell = new CustomSpellDTO(
            spell.OriginCasterId, spell.AdditionalCasterIdList.getItems().toString(), spell.SpellLevel,
            spell.PrimaryEffectId, spell.SecondaryEffectIdList.getItems().toString(), spell.CodaIdList.getItems().toString(),
            effectCustomizationsDTOs, spell.SpellName, spell.Description,
            SpellBaseInfoConverter.toServer(spell.UniqueId, spell.SpellAlteration), spell.UniqueId)
        return JSON.stringify(serverSpell)
    }

    static convertSpellAlteration(element) : SpellBaseInfo {
        if (element == null)
            return new SpellBaseInfo(0, "", "", 0, "", "", "")
        return SpellBaseInfoConverter.convert(element.customSpellBase)
    }

    static convertSecondaryEffectIds(element) : ArrayList<number> {
        if (element == null)
            return new ArrayList<number>()
        return CustomSpellConverter.convertNumberList(element.secondaryEffectIdList)
    }

    static convertCodaIds(element) : ArrayList<number> {
        if (element == null)
            return new ArrayList<number>()
        return CustomSpellConverter.convertNumberList(element.codaIdList)
    }

    static convertCasterIds(element) : ArrayList<string> {
        if (element == null)
            return new ArrayList<string>()
        return CustomSpellConverter.convertStringList(element.additionalCasterIdList)
    }

    static convertStringList(element) : ArrayList<string> {
        if (element == null || element.length == 0)
            return new ArrayList<string>()
        return new ArrayList<string>(...element.split(','))
    }

    static convertNumberList(element) : ArrayList<number> {
        if (element == null || element.length == 0)
            return new ArrayList<number>()
        return new ArrayList<number>(...Array.from(element.split(','), (value) => Number(value)))
    }

    static convertBaseEffectCustomizations(element) : BaseEffectCustomizationList {
        var list = new BaseEffectCustomizationList()
        if (element == null)
            return list

        element.spellEffectCustomizations.forEach(customizationElement => {
            var effectType = EffectCustomizationTypeConverter.convert(customizationElement.effectName)
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
                return RicochetCustomizationConverter.convert(element)
                
            case EffectCustomizationType.Stealthed:
                return StealthedCustomizationConverter.convert(element)
                                                       
            default:
                return null
        }
    }

    static toString(spell: CustomSpell, _dataService: DataService) : string {
        var castingInfoString = this.castingInfoToString(spell, _dataService)
        var casterString = this.casterToString(spell, _dataService)
        var effectString = this.effectToString(spell, _dataService)
        var str = `${castingInfoString}\n\n${casterString}\n\n${effectString}`
        return str
    }

    private static castingInfoToString(spell: CustomSpell, _dataService: DataService) : string {
        var castingInfo = spell.getCastingInfo(_dataService)
        return `Spell: ${spell.SpellName}\nDescription: ${spell.Description}\nMana Cost: ${castingInfo.Cost}\nCasting DC: ${castingInfo.DC}\nAffinity Conflict Bonus: ${castingInfo.AffinityConflict.Benefit}`
    }

    private static casterToString(spell: CustomSpell, _dataService: DataService) : string {
        var additionalCasters = _dataService.getAdditionalCasters(spell.AdditionalCasterIdList)
        var additionals
        if (additionalCasters.isEmpty())
            additionals = ''
        else 
            additionals = `\nAdditional Casters: ${additionalCasters.getItems().map(caster => caster.Name).join(', ')}` 

        var origin = `Origin Caster: ${_dataService.getOriginCaster(spell.OriginCasterId).Name}`

        return `${origin}${additionals}`
    }

    private static effectToString(spell: CustomSpell, _dataService: DataService) : string {
        return `${this.primaryEffectToString(spell, _dataService)}${this.secondaryEffectsToString(spell, _dataService)}${this.codasToString(spell, _dataService)}${this.customizationsToString(spell, _dataService)}`
    }

    private static primaryEffectToString(spell: CustomSpell, _dataService: DataService) : string {
        return `Primary Effect: ${_dataService.getPrimaryEffect(spell.PrimaryEffectId).Name}`
    }

    private static secondaryEffectsToString(spell: CustomSpell, _dataService: DataService) : string {
        var effects = _dataService.getSecondaryEffects(spell.SecondaryEffectIdList)
        if (effects.isEmpty())
            return ''
        return `\nSecondary Effects: ${effects.getItems().map(effect => effect.Name).join(", ")}`
    }

    private static codasToString(spell: CustomSpell, _dataService: DataService) : string {
        var effects = _dataService.getCodas(spell.CodaIdList)
        if (effects.isEmpty())
            return ''
        return `\nCodas: ${effects.getItems().map(effect => effect.Name).join(", ")}`
    }

    private static customizationsToString(spell: CustomSpell, _dataService: DataService) : string {
        if (spell.EffectCustomizations.isEmpty())
            return ''

        return `\nCustomizations:\n\t${spell.EffectCustomizations.getItems().map(effect => `${effect.getEffectName()}: ${effect.getSummary()}`).join('\n\t')}`
    }
}