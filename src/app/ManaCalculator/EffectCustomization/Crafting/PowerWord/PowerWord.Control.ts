import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { PowerWordCustomization } from "../../../Models/Cost/PowerWordCustomization";
import { EffectType, Effect, EffectCustomizationType } from "../../../Models/Effect";
import { Data } from "../../../Services/Data/Data";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";

@Component({
    selector: 'power-word-control',
    templateUrl: './PowerWord.html'
})
export class PowerWordControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.PowerWord
    PowerWord: PowerWordCustomization
    EffectForPowerWord: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.PowerWord
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.PowerWord = customization as PowerWordCustomization
    }

    override resetCustomization() {
        this.PowerWord = new PowerWordCustomization(EffectType.Primary, "", 2)
        this.EffectForPowerWord = null
    }

    updatePowerWordEffect() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('power-word-select') as any).value)
        this.EffectForPowerWord = effect
        this.PowerWord.EffectType = effect.EffectType
        this.PowerWord.EffectName = effect.Name
    }

    savePowerWordAlteration() {
        this.PowerWord.Cost = Number((document.getElementById('power-word-cost-picker') as any).value)
        this.customizationAddedEmitter.emit(this.PowerWord)
    }
}