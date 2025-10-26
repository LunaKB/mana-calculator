import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { EchoedCustomization } from "../../../Models/Cost/EchoedCustomization";
import { EffectType, Effect, EffectCustomizationType } from "../../../Models/Effect";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";

@Component({
    selector: 'echoed-control',
    templateUrl: './Echoed.html'
})
export class EchoedControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Echoed
    Echoed: EchoedCustomization
    EffectToEcho: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.Echoed
    }
    
    override setCustomization(customization: BaseEffectCustomization) {
        this.Echoed = customization as EchoedCustomization
    }
    
    override resetCustomization() {
        this.Echoed = new EchoedCustomization(EffectType.Primary, "")
        this.EffectToEcho = null
    }

    updateEchoedEffect() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('echoed-effect-select') as any).value)
        this.EffectToEcho = effect
        this.Echoed.EffectName = effect.Name
        this.Echoed.EffectType = effect.EffectType
        this.customizationAddedEmitter.emit(this.Echoed)
    }
}