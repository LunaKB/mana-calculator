import { Affinity } from "../Models/Affinity";
import { AffinityConflict } from "../Models/AffinityConflict";
import { Caster } from "../Models/Caster";
import { CastingInfo } from "../Models/CastingInfo";
import { AffinityCustomization } from "../Models/Cost/AffinityCustomization";
import { EffectCustomizationTypeConverter, Effect, EffectCustomizationType } from "../Models/Effect";
import { SpellBaseInfo } from "../Models/SpellBase";
import { Default } from "./Default";
import { ArrayList } from "./List/ArrayList";
import { BaseEffectCustomizationList } from "./List/BaseEffectCustomizationList";
import { CasterList } from "./List/CasterList";
import { EffectList } from "./List/EffectList";

export class CastingCalculator {

    static getCastingInfo(spellLevel: number, spellAlteration: SpellBaseInfo, affinityConflicts: ArrayList<AffinityConflict>,
        originCaster: Caster, additionalCasters: CasterList, 
        primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) 
    : CastingInfo {

        var effectCosts = this.getEffectCosts(primaryEffect, secondaryEffects, codas, effectCustomizations)
        var casterCredits = this.getCasterCredits(originCaster, additionalCasters, primaryEffect, secondaryEffects, codas, effectCustomizations)
        var totalCost = this.getTotalCost(spellAlteration.Cost + effectCosts, casterCredits)

        var affinityConflict = this.getAffinityConflict(affinityConflicts, primaryEffect, secondaryEffects, codas, effectCustomizations)
        var effectDCs = this.getEffectDCs(primaryEffect, secondaryEffects, codas, effectCustomizations)
        var totalDC = this.getTotalDC(additionalCasters, affinityConflict, totalCost, effectDCs, spellLevel)

        var info = new CastingInfo()
        info.AffinityConflict = affinityConflict
        info.Cost = totalCost
        info.DC = totalDC
        return info
    }

    private static getTotalCost(cost: number, credit: number) : number {
        var total = cost - credit
        if (total <= 0)
            return 1
        else
            return total
    }

    private static getTotalDC(additionalCasters: CasterList, affinityConflict: AffinityConflict, cost: number, effectExtraDC: number, spellLevel: number) 
    : number {        
        var stabilityCredit = Default.SpellLevel - spellLevel
        return 5 + cost + effectExtraDC + additionalCasters.length() + affinityConflict.DCIncrease - stabilityCredit
    }

    private static getEffectCosts(primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) : number {
        var cost = this.getEffectCost(primaryEffect, effectCustomizations)
        secondaryEffects.getItems().forEach(effect => cost += this.getEffectCost(effect, effectCustomizations))
        codas.getItems().forEach(effect => cost += this.getEffectCost(effect, effectCustomizations))
        return cost
    }

    private static getEffectCost(effect: Effect, effectCustomizations: BaseEffectCustomizationList) : number {
        var cost = effect.Cost
        if (!EffectCustomizationTypeConverter.isType(effect.Name))
            return cost
        var customizationType = EffectCustomizationTypeConverter.convert(effect.Name)
        
        var effectCustomization = effectCustomizations.getItems().find(customization => customization.CustomizationType == customizationType)
        if (!effectCustomization)
            return cost

        return effectCustomization.getCost()
    }

    private static getEffectDCs(primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) : number {
        var dc = this.getEffectDC(primaryEffect, effectCustomizations)
        secondaryEffects.getItems().forEach(effect => dc += this.getEffectDC(effect, effectCustomizations))
        codas.getItems().forEach(effect => dc += this.getEffectDC(effect, effectCustomizations))
        return dc
    }

    // Usually, the effect will increase the overall DC by its cost. Sometimes an effect will alter the DC further. This will get those futher costs.
    // This will get the difference between an effect's cost and its altered DC. This should usually return 0. 
    private static getEffectDC(effect: Effect, effectCustomizations: BaseEffectCustomizationList) : number {
        var dc = 0
        if (!EffectCustomizationTypeConverter.isType(effect.Name))
            return dc
        var customizationType = EffectCustomizationTypeConverter.convert(effect.Name)

        var effectCustomization = effectCustomizations.getItems().find(customization => customization.CustomizationType == customizationType)
        if (!effectCustomization)
            return dc
        
        return effectCustomization.getDC() - effect.Cost
    }

    private static getCasterCredits(originCaster: Caster, additionalCasters: CasterList, 
        primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) 
    : number {
        var credit = this.getCasterCredit(originCaster, primaryEffect, secondaryEffects, codas, effectCustomizations)
        additionalCasters.getItems().forEach(caster => {
            credit += this.getCasterCredit(caster, primaryEffect, secondaryEffects, codas, effectCustomizations)
        })
        return credit
    }

    private static getCasterCredit(caster: Caster, primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) : number {
        
        var affinityChangedCustomization = this.getAffinityChangedCustomization(effectCustomizations)
        var affinities = new Array<Affinity>(Affinity.Mind, Affinity.Source, Affinity.Will)

        var credit = 0
        affinities.forEach(affinity => {
            if (caster.Affinities.get(affinity) > 0, this.hasAffinity(affinity, primaryEffect, secondaryEffects, codas, affinityChangedCustomization))
                credit += caster.Affinities.get(affinity)
        })
        return credit
    }

    private static getAffinityConflict(affinityConflicts: ArrayList<AffinityConflict>, 
        primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, effectCustomizations: BaseEffectCustomizationList) 
    : AffinityConflict {
        var numberOfAspects = 0
        var affinityChangedCustomization = this.getAffinityChangedCustomization(effectCustomizations)
        var affinities = new Array<Affinity>(Affinity.Mind, Affinity.Source, Affinity.Will)

        affinities.forEach(affinity => {
            if (this.hasAffinity(affinity, primaryEffect, secondaryEffects, codas, affinityChangedCustomization))
                numberOfAspects++
        })

        var affinityConflict = affinityConflicts.getItems().find(conflict => conflict.NumberOfAspects == numberOfAspects)
        if (!affinityConflict)
            affinityConflict = affinityConflicts[0]
        
        return affinityConflict
    }

    private static hasAffinity(affinity: Affinity, primaryEffect: Effect, secondaryEffects: EffectList, codas: EffectList, affinityCustomization: AffinityCustomization) : boolean {
        if (this.getCustomizedAffinity(primaryEffect, affinityCustomization) == affinity)
            return true

        var hasAffinity = false
        secondaryEffects.getItems().forEach(effect => {
            if (!hasAffinity && this.getCustomizedAffinity(effect, affinityCustomization) == affinity)
                hasAffinity = true
        })
        if (hasAffinity)
            return true

        codas.getItems().forEach(effect => {
            if (!hasAffinity && this.getCustomizedAffinity(effect, affinityCustomization) == affinity)
                hasAffinity = true
        })
        if (hasAffinity)
            return true
        return false
    }

    private static getCustomizedAffinity(effect: Effect, affinityCustomization: AffinityCustomization) : Affinity {
        if (!affinityCustomization)
            return effect.Aspect

        var effectAffinity = effect.Aspect
        if (affinityCustomization.EffectName == effect.Name)
            effectAffinity = affinityCustomization.CustomAffinity
        return effectAffinity
    }

    private static getAffinityChangedCustomization(effectCustomizations: BaseEffectCustomizationList) {        
        var affinityChangedCustomization = effectCustomizations.getItemByName(EffectCustomizationType.AlterAspect.valueOf()) as AffinityCustomization
        if (affinityChangedCustomization == undefined)
            affinityChangedCustomization = null
        return affinityChangedCustomization
    }
}