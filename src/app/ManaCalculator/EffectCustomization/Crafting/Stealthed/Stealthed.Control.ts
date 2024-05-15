import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { StealthedCustomization } from "../../../Models/Cost/StealthedCustomization";
import { Effect, EffectCustomizationType, EffectType } from "../../../Models/Effect";
import { Data } from "../../../Services/Data/Data";

@Component({
    selector: 'stealthed-control',
    templateUrl: './Stealthed.html'
})
export class StealthedControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Stealthed;
    Stealthed: StealthedCustomization
    EffectForStealth: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.Stealthed
    }
    override setCustomization(customization: BaseEffectCustomization) {
        this.Stealthed = customization as StealthedCustomization
    }

    override resetCustomization() {
        this.Stealthed = new StealthedCustomization(EffectType.Primary, "")
        this.EffectForStealth = null
    }

    setStealthed() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('stealth-select') as any).value)
        this.EffectForStealth = effect
        this.Stealthed.EffectType = effect.EffectType
        this.Stealthed.EffectName = effect.Name
        this.customizationAddedEmitter.emit(this.Stealthed)
    }    
}