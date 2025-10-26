import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { RicochetCustomization } from "../../../Models/Cost/RicochetCustomization";
import { Effect, EffectCustomizationType, EffectType } from "../../../Models/Effect";

@Component({
    selector: 'ricochet-control',
    templateUrl: './Ricochet.html'
})
export class RicochetControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Ricochet
    Ricochet: RicochetCustomization
    EffectForRicochet: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.Ricochet
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.Ricochet = customization as RicochetCustomization
    }

    override resetCustomization() {
        this.Ricochet = new RicochetCustomization(EffectType.Primary, "")
        this.EffectForRicochet = null
    }
    
    setRicochet() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('ricochet-select') as any).value)
        this.EffectForRicochet = effect
        this.Ricochet.EffectType = effect.EffectType
        this.Ricochet.EffectName = effect.Name
        this.customizationAddedEmitter.emit(this.Ricochet)
    }
}