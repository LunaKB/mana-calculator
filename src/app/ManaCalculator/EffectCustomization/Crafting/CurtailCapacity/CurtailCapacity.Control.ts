import { Component } from "@angular/core";
import { Ability, AbilityConverter } from "../../../Models/Ability";
import { AbilityScoreCustomization } from "../../../Models/Cost/AbilityScoreCustomization";
import { BaseEffectCustomizationControl } from "../BaseEffectCustomizationControl";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { EffectCustomizationType } from "../../../Models/Effect";

@Component({
    selector: 'curtail-capacity-control',
    templateUrl: './CurtailCapacity.html'
})
export class CurtailCapacityControl extends BaseEffectCustomizationControl  {
    public override CustomizationType = EffectCustomizationType.Capacity
    AbilityScore: AbilityScoreCustomization

    override getCustomization(): BaseEffectCustomization {
        return this.AbilityScore
    }

    override setCustomization(customization: BaseEffectCustomization) {
        this.AbilityScore = customization as AbilityScoreCustomization
    }

    override resetCustomization() {
        this.AbilityScore = new AbilityScoreCustomization(Ability.Str, 1)
    } 

    setCapacityAbility() {
        this.AbilityScore.Ability = AbilityConverter.convert((document.getElementById('capacity-ability-select') as any).value)
        this.AbilityScore.Cost =  Number((document.getElementById('capacity-ability-increase-picker') as any).value)
        this.customizationAddedEmitter.emit(this.AbilityScore)
    }
}