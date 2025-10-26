import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { EffectCustomizationType } from "../../../Models/Effect";
import { EffectList } from "../../../Utils/List/EffectList";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { BaseCraftingComponent } from "../../../Crafting/BaseCraftingComponent";
import { ArrayList } from "../../../Utils/List/ArrayList";

@Component({
    selector: 'effect-customization-crafting-control',
    templateUrl: './EffectCustomization.Crafting.html',
})
export class EffectCustomizationCraftingControl extends BaseCraftingComponent {
    ShowAffinity = false
    ShowCurtailCapacity = false
    ShowDamageIncrease = false
    ShowEchoed = false
    ShowInhibit = false
    ShowPowerWord = false
    ShowRicochet =  false
    ShowSavingThrow = false
    ShowStealthed = false
    ShowTemporaryFeat = false

    @Input('primary-effect-type') PrimaryEffectType: EffectCustomizationType = null
    @Input('secondary-effect-types') SecondaryEffectTypes = new Array<EffectCustomizationType>()
    @Input('coda-effect-types') CodaEffectTypes = new Array<EffectCustomizationType>()
    @Input('all-effects') AllEffects = new EffectList()   
    @Input('non-coda-effects') NonCodaEffects = new EffectList()

    @Output('effect-customization-added')
    effectCustomizationAdded = new EventEmitter<BaseEffectCustomization>()
    
    @Output('effect-customization-removed')
    effectCustomizationRemoved = new EventEmitter<BaseEffectCustomization>()

    override ngOnChanges(changes: SimpleChanges): void {
        var primaryEffectChange = changes['PrimaryEffectType']
        if (primaryEffectChange)
            this.onEffectCustomizationTypeChange(primaryEffectChange)
        var secondaryTypeChanges = changes['SecondaryEffectTypes']
        if (secondaryTypeChanges)
            this.onEffectCustomizationTypesChange(secondaryTypeChanges)
        var codaTypeChanges = changes['CodaEffectTypes']
        if (codaTypeChanges)
            this.onEffectCustomizationTypesChange(codaTypeChanges)
    }

    hasEffectCustomizationTypes() : boolean {
        return this.ShowAffinity ||
        this.ShowCurtailCapacity ||
        this.ShowDamageIncrease ||
        this.ShowEchoed ||
        this.ShowInhibit ||
        this.ShowPowerWord ||
        this.ShowRicochet ||
        this.ShowSavingThrow ||
        this.ShowStealthed ||
        this.ShowTemporaryFeat
    }

    onEffectCustomizationAdded(_event) {
        this.effectCustomizationAdded.emit(_event)
    }

    onEffectCustomizationRemoved(_event) {
        this.effectCustomizationRemoved.emit(_event)
    }

    onShowPopup(_event) {
        this.PopupTitle = (_event as ArrayList<string>).get(0)
        this.PopupMessage = (_event as ArrayList<string>).get(1)
        this.showPopup()
    }

    private onEffectCustomizationTypeChange(change) {
        this.setCustomizationControlVisibility(change.previousValue, false)
        this.setCustomizationControlVisibility(change.currentValue, true)
    }

    private onEffectCustomizationTypesChange(changes) {
        if (changes.currentValue == undefined)
            return
        
        var addedValues
        if (changes.previousValue == undefined)
            addedValues = changes.currentValue
        else
            addedValues = changes.currentValue.filter(value => !changes.previousValue.includes(value))
        if (addedValues.length > 0)
            addedValues.forEach(type => this.setCustomizationControlVisibility(type, true))

        if (changes.previousValue == undefined)
            return
        var removedValues = changes.previousValue.filter(value => !changes.currentValue.includes(value))
        if (removedValues.length > 0)
            removedValues.forEach(type => this.setCustomizationControlVisibility(type, false))
    }

    private setCustomizationControlVisibility(effect: EffectCustomizationType, isVisible: boolean) {
        switch(effect) {
            case EffectCustomizationType.Capacity:
                this.ShowCurtailCapacity = isVisible
                break
            case EffectCustomizationType.DamageIncrease:
                this.ShowDamageIncrease = isVisible
                break
            case EffectCustomizationType.Inhibit:
                this.ShowInhibit = isVisible
                break
            case EffectCustomizationType.Feat:
                this.ShowTemporaryFeat = isVisible
                break
            case EffectCustomizationType.AlterSavingThrow:
                this.ShowSavingThrow = isVisible
                break
            case EffectCustomizationType.Echoed:
                this.ShowEchoed = isVisible
                break
            case EffectCustomizationType.AlterAspect:
                this.ShowAffinity = isVisible
                break
            case EffectCustomizationType.PowerWord:
                this.ShowPowerWord = isVisible
                break
            case EffectCustomizationType.Ricochet:
                this.ShowRicochet = isVisible
                break
            case EffectCustomizationType.Stealthed:
                this.ShowStealthed = isVisible
                break
            default:
                break;
        }
    }
}