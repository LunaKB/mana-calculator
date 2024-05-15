import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { Ability, ConvertAbility } from "../../../Models/Ability";
import { InhibitCustomization } from "../../../Models/Cost/InhibitCustomization";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { EffectCustomizationType } from "../../../Models/Effect";

@Component({
    selector: 'inhibit-control',
    templateUrl: './Inhibit.html'
})
export class InhibitControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.Inhibit
    Inhibit: InhibitCustomization

    override getCustomization(): BaseEffectCustomization {
        return this.Inhibit
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.Inhibit = customization as InhibitCustomization
    }

    override resetCustomization() {
        this.Inhibit = new InhibitCustomization(Ability.Str)
    }

    setInhibit() {
        this.Inhibit.Ability = ConvertAbility.convert((document.getElementById('inhibit-ability-select') as any).value)
        this.customizationAddedEmitter.emit(this.Inhibit)
    }
}