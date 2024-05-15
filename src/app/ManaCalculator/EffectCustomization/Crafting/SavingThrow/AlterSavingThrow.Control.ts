import { Component } from "@angular/core";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { Ability, AbilityConverter } from "../../../Models/Ability";
import { SavingThrowCustomization } from "../../../Models/Cost/SavingThrowCustomization";
import { EffectType, Effect, EffectCustomizationType } from "../../../Models/Effect";
import { Data } from "../../../Services/Data/Data";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";

@Component({
    selector: 'alter-saving-throw-control',
    templateUrl: './AlterSavingThrow.html'
})
export class AlterSavingThrowControl extends BaseEffectCustomizationControl {
    public override CustomizationType = EffectCustomizationType.AlterSavingThrow;
    SavingThrow: SavingThrowCustomization
    EffectForSavingThrow: Effect

    override getCustomization(): BaseEffectCustomization {
        return this.SavingThrow
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.SavingThrow = customization as SavingThrowCustomization
    }

    override resetCustomization() {
        this.SavingThrow = new SavingThrowCustomization(EffectType.Primary, "", Ability.Str, Ability.Str)
        this.EffectForSavingThrow = null
    }

    updateSavingThrowEffect() {
        var effect = this._dataService.Data.getEffectFromEvent((document.getElementById('alter-saving-throw-select') as any).value)
        this.EffectForSavingThrow = effect
        this.SavingThrow.EffectType = effect.EffectType
        this.SavingThrow.EffectName = effect.Name
    }

    saveSavingThrowAlteration() {
        this.SavingThrow.OriginalSavingThrow = AbilityConverter.convert((document.getElementById('original-ability-select') as any).value)
        this.SavingThrow.CustomSavingThrow = AbilityConverter.convert((document.getElementById('custom-ability-select') as any).value)
        this.customizationAddedEmitter.emit(this.SavingThrow)
    }
}