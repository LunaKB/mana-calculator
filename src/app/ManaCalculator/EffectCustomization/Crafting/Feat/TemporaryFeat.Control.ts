import { Component } from "@angular/core";
import { TemporaryFeatCustomization } from "../../../Models/Cost/TemporaryFeatCustomization";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { EffectCustomizationType } from "../../../Models/Effect";

@Component({
    selector: 'temporary-feat-control',
    templateUrl: './TemporaryFeat.html'
})
export class TemporaryFeatControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Feat
    TemporaryFeat: TemporaryFeatCustomization

    override getCustomization(): BaseEffectCustomization {
        return this.TemporaryFeat
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.TemporaryFeat = customization as TemporaryFeatCustomization
    }

    override resetCustomization() {
        this.TemporaryFeat = new TemporaryFeatCustomization("", false)
    }

    setFeat() {
        this.TemporaryFeat.FeatName = (document.getElementById('feat-name-input') as any).value
        this.TemporaryFeat.HasFeat = (document.getElementById('has-feat-input') as any).checked
        this.customizationAddedEmitter.emit(this.TemporaryFeat)
    }
}