import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { RichochetCustomization } from "../../../Models/Cost/RichochetCustomization";
import { Effect, EffectCustomizationType, EffectType } from "../../../Models/Effect";
import { Data } from "../../../Services/Data/Data";

@Component({
    selector: 'ricochet-control',
    templateUrl: './Ricochet.html'
})
export class RicochetControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Ricochet
    Richochet: RichochetCustomization
    EffectForRichochet: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.Richochet
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.Richochet = customization as RichochetCustomization
    }

    override resetCustomization() {
        this.Richochet = new RichochetCustomization(EffectType.Primary, "")
        this.EffectForRichochet = null
    }
    
    setRichochet() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('richochet-select') as any).value)
        this.EffectForRichochet = effect
        this.Richochet.EffectType = effect.EffectType
        this.Richochet.EffectName = effect.Name
        this.customizationAddedEmitter.emit(this.Richochet)
    }
}