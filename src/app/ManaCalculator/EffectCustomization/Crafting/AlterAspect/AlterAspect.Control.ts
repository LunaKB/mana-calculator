import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { Affinity, AffinityConverter } from "../../../Models/Affinity";
import { AffinityCustomization } from "../../../Models/Cost/AffinityCustomization";
import { EffectType, Effect, EffectCustomizationType } from "../../../Models/Effect";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { ArrayList } from "../../../Utils/List/ArrayList";

@Component({
    selector: 'alter-aspect-control',
    templateUrl: './AlterAspect.html'
})
export class AlterAspectControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.AlterAspect
    Affinity: AffinityCustomization
    EffectForAffinity: Effect
    
    override getCustomization(): BaseEffectCustomization {
        return this.Affinity
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.Affinity = customization as AffinityCustomization
    }
    
    override resetCustomization() {
        this.Affinity = new AffinityCustomization(EffectType.Primary, "", Affinity.Mind, Affinity.Mind)
        this.EffectForAffinity = null
    }

    protected override showPopupForItem(_event: any): void {
        var popupText = new ArrayList<string>()
        popupText.add((_event as Effect).Name)
        popupText.add((_event as Effect).Description)
        this.popupShowEmitter.emit(popupText)
    }

    updateAffinityEffect() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('alter-affinity-select') as any).value)
        this.EffectForAffinity = effect
        this.Affinity.EffectType = effect.EffectType
        this.Affinity.EffectName = effect.Name
    }

    saveAffinityAlteration() {
        this.Affinity.OriginalAffinity = AffinityConverter.convert((document.getElementById('original-affinity-select') as any).value)
        this.Affinity.CustomAffinity = AffinityConverter.convert((document.getElementById('custom-affinity-select') as any).value)
        this.customizationAddedEmitter.emit(this.Affinity)
    }
}