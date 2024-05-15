import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { SpellLevelInfo } from "../Models/SpellLevel";
import { SpellBaseInfo } from "../Models/SpellBase";
import { EffectCustomizationType, EffectCustomizationTypeConverter, Effect } from "../Models/Effect";
import { Caster } from "../Models/Caster";
import { CastingCalculator } from "../Utils/CastingCalculator";
import { CustomSpell } from "../Models/CustomSpell";
import { EffectList } from "../Utils/List/EffectList";
import { CasterList } from "../Utils/List/CasterList";
import { BaseEffectCustomizationList } from "../Utils/List/BaseEffectCustomizationList";
import { BaseEffectCustomization } from "../Models/Cost/BaseEffectCustomization";
import { ToastrWrapper } from "../Utils/ToastrWrapper";
import { DataService } from "../Services/Data/DataService";
import { DataListener } from "../Services/Data/DataListener";
import { CastingInfo } from "../Models/CastingInfo";

@Component({
    templateUrl: './Crafting.html',
    styleUrl: './Crafting.css'
})
export class CraftingComponent implements AfterContentInit, DataListener, OnDestroy {
    SpellName: string = "name of spell"
    Description: string  = "description of spell"

    OriginCaster: Caster = null
    AdditionalCasters = new CasterList
    SpellLevelInfo: SpellLevelInfo = null
    SpellAlterationInfo: SpellBaseInfo = null
    AffinityConflict = null

    PrimaryEffect: Effect = null
    PrimaryEffectType: EffectCustomizationType = null
    SecondaryEffects = new EffectList()
    SecondaryEffectTypes = new Array<EffectCustomizationType>()
    CodaEffects = new EffectList()
    CodasEffectTypes = new Array<EffectCustomizationType>()

    AllEffectsToCustomize = new EffectList()
    NonCodaEffectsToCustomize = new EffectList()

    SpellEffectCustomizations = new BaseEffectCustomizationList()

    CustomSpell: CustomSpell = null
    CastingInformation: CastingInfo = null
    Ready = false

    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }

    onDataReady(status: boolean) {
        console.log("got data after it is ready")
        this.Ready = status

        if (this._dataService.Data.CustomSpell) {
            this.SpellName = this._dataService.Data.CustomSpell.SpellName
            this.Description = this._dataService.Data.CustomSpell.Description
            
            this.CustomSpell = this._dataService.Data.CustomSpell.clone()
            this.CustomSpell.IsEditable = true
        }        
    }

    onOriginCasterChange(_caster: Caster) {
        this.OriginCaster = _caster
        ToastrWrapper.Toastr.success('Origin Caster Updated')
        this.updateCastingInfo()
    }

    onAdditionalCasterAdded(_caster: Caster) {
        this.AdditionalCasters.add(_caster)
        ToastrWrapper.Toastr.success('Additional Caster Added')
        this.updateCastingInfo()
    }

    onAdditionalCasterRemoved(_caster: Caster) {
        this.AdditionalCasters.remove(_caster)
        ToastrWrapper.Toastr.success('Additional Caster Removed')
        this.updateCastingInfo()
    }

    onSpellLevelInfoChange(_info: SpellLevelInfo) {
        this.SpellLevelInfo = _info
        ToastrWrapper.Toastr.success('Spell Level Updated')
        this.updateCastingInfo()
    }

    onSpellAlterationInfoChange(_info: SpellBaseInfo) {
        this.SpellAlterationInfo = _info
        ToastrWrapper.Toastr.success('Spell Alteration Updated')
        this.updateCastingInfo()
    }

    onPrimaryEffectChange(_effect: Effect) {
        this.PrimaryEffect = _effect

        if (EffectCustomizationTypeConverter.isType(this.PrimaryEffect.Name))
            this.PrimaryEffectType = EffectCustomizationTypeConverter.convert(this.PrimaryEffect.Name)
        else
            this.PrimaryEffectType = null
        this.createEffectsForCustomization()
        ToastrWrapper.Toastr.success('Primary Effect Updated')
        this.updateCastingInfo()
    }

    onSecondaryEffectAdded(_effect: Effect) {
        this.SecondaryEffects.add(_effect)
        this.onSecondaryEffectUpdated()
        ToastrWrapper.Toastr.success('Secondary Effect Added')
        this.updateCastingInfo()
    }

    onSecondaryEffectRemoved(_effect: Effect) {
        this.SecondaryEffects.remove(_effect)
        this.onSecondaryEffectUpdated()
        ToastrWrapper.Toastr.success('Secondary Effect Removed')
        this.updateCastingInfo()
    }

    onCodaEffectAdded(_effect: Effect) {
        this.CodaEffects.add(_effect)
        this.onCodaEffectUpdated()
        ToastrWrapper.Toastr.success('Coda Added')
        this.updateCastingInfo()
    }

    onCodaEffectRemoved(_effect: Effect) {
        this.CodaEffects.remove(_effect)
        this.onCodaEffectUpdated()
        ToastrWrapper.Toastr.success('Coda Removed')
        this.updateCastingInfo()
    }

    onCustomizationAdded(_customization: BaseEffectCustomization) {
        setTimeout(() => {
            this.SpellEffectCustomizations.replace(_customization)
            ToastrWrapper.Toastr.success('Customization Updated')
            this.updateCastingInfo()
        })
    }

    onCustomizationRemoved(_customization: BaseEffectCustomization) {
        setTimeout(() => {
            this.SpellEffectCustomizations.remove(_customization)
            this.updateCastingInfo()
        })
    }

    getTotalCost() : number {
        if(!this.showSave())
            return 0
        this.updateCastingInfo()

        return this.CastingInformation.Cost
    }

    getCastingDC() : number {
        if(!this.showSave())
            return 0
        
        this.updateCastingInfo()
        this.AffinityConflict = this.CastingInformation.AffinityConflict
        return this.CastingInformation.DC        
    }

    showSave() : boolean {
        if (this.OriginCaster == null)
            return false
        if (this.SpellLevelInfo == null)
            return false
        if (this.PrimaryEffect == null)
            return false
        if (this.SpellAlterationInfo == null)
            return false
        return true
    }

    save() {
        this.createCustomSpell()
        this._dataService.Data.addCustomSpell(this.CustomSpell)
        this.CustomSpell.IsEditable = true
    }

    update() {
        this.updateCustomSpell()
        this._dataService.Data.updateCustomSpell(this.CustomSpell)
        if (this._dataService.Data.CustomSpell)
            this._dataService.Data.CustomSpell = null
    }

    reset() {
        this.SpellName = "name of spell"
        this.Description = "description of spell"

        this.OriginCaster = null
        this.AdditionalCasters = new CasterList
        this.SpellLevelInfo = null
        this.SpellAlterationInfo = null
        this.AffinityConflict = null
    
        this.PrimaryEffect = null
        this.PrimaryEffectType = null
        this.SecondaryEffects = new EffectList()
        this.SecondaryEffectTypes = new Array<EffectCustomizationType>()
        this.CodaEffects = new EffectList()
        this.CodasEffectTypes = new Array<EffectCustomizationType>()
    
        this.AllEffectsToCustomize = new EffectList()
        this.NonCodaEffectsToCustomize = new EffectList()
    
        this.SpellEffectCustomizations = new BaseEffectCustomizationList()
    
        this.CustomSpell = null
        if (this._dataService.Data.CustomSpell)
            this._dataService.Data.CustomSpell = null
    }

    private createCustomSpell() {
        var additionalCasterIdList = this.AdditionalCasters.getCasterIds()
        var secondaryEffectIdList = this.SecondaryEffects.getEffectIds()
        var codaIdList = this.CodaEffects.getEffectIds()
        var customizations = this.SpellEffectCustomizations

        this.CustomSpell = new CustomSpell(
            this.OriginCaster.Id,
            additionalCasterIdList,
            this.SpellLevelInfo.SpellLevel,
            this.PrimaryEffect.Id,
            secondaryEffectIdList,
            codaIdList,
            customizations,
            this.SpellName,
            this.Description,
            this.SpellAlterationInfo)
    }

    private updateCustomSpell() {
        var additionalCasterIdList = this.AdditionalCasters.getCasterIds()
        var secondaryEffectIdList = this.SecondaryEffects.getEffectIds()
        var codaIdList = this.CodaEffects.getEffectIds()
        var customizations = this.SpellEffectCustomizations

        this.CustomSpell.OriginCasterId = this.OriginCaster.Id
        this.CustomSpell.AdditionalCasterIdList = additionalCasterIdList
        this.CustomSpell.SpellLevel = this.SpellLevelInfo.SpellLevel
        this.CustomSpell.PrimaryEffectId = this.PrimaryEffect.Id
        this.CustomSpell.SecondaryEffectIdList = secondaryEffectIdList
        this.CustomSpell.CodaIdList = codaIdList
        this.CustomSpell.EffectCustomizations = customizations
        this.CustomSpell.SpellName = this.SpellName
        this.CustomSpell.Description = this.Description
        this.CustomSpell.SpellAlteration = this.SpellAlterationInfo
    }

    private onSecondaryEffectUpdated() {
        this.SecondaryEffectTypes = this.SecondaryEffects.getEffectCustomizationTypes()
        this.createEffectsForCustomization()
    }

    private onCodaEffectUpdated() {
        this.CodasEffectTypes = this.CodaEffects.getEffectCustomizationTypes()
        this.createEffectsForCustomization()
    }

    private createEffectsForCustomization() {
        this.AllEffectsToCustomize.clear()
        this.NonCodaEffectsToCustomize.clear()

        if (this.PrimaryEffect) {
            this.AllEffectsToCustomize.add(this.PrimaryEffect)
            this.NonCodaEffectsToCustomize.add(this.PrimaryEffect)            
        }

        this.AllEffectsToCustomize.addAll(...this.SecondaryEffects.getItems(), ...this.CodaEffects.getItems())
        this.NonCodaEffectsToCustomize.addAll(...this.SecondaryEffects.getItems())
    }

    private updateCastingInfo() {
        if(!this.showSave())
            return
        this.CastingInformation = CastingCalculator.getCastingInfo(
            this.SpellLevelInfo.SpellLevel,
            this.SpellAlterationInfo,
            this._dataService.Data.AffinityConflicts,
            this.OriginCaster,
            this.AdditionalCasters,
            this.PrimaryEffect,
            this.SecondaryEffects,
            this.CodaEffects,
            this.SpellEffectCustomizations)
    }
}