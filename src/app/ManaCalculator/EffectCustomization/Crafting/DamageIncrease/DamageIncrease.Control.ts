import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { DamageIncreaseCustomization } from "../../../Models/Cost/DamageIncreaseCustomization";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { EffectCustomizationType } from "../../../Models/Effect";

@Component({
    selector: 'damage-increase-control',
    templateUrl: './DamageIncrease.html'
})
export class DamageIncreaseControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.DamageIncrease
    DamageIncrease: DamageIncreaseCustomization

    override getCustomization(): BaseEffectCustomization {
        return this.DamageIncrease
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.DamageIncrease = customization as DamageIncreaseCustomization
    }

    override resetCustomization() {
        this.DamageIncrease = new DamageIncreaseCustomization(1)
    }

    setDamageIncrease() {
        this.DamageIncrease.Cost = Number((document.getElementById('damage-increase-input') as any).value)
        this.customizationAddedEmitter.emit(this.DamageIncrease)
    }
}