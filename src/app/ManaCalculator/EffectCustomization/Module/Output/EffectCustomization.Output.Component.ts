import { Component, Input } from "@angular/core";
import { BaseEffectCustomizationList } from "../../../Utils/List/BaseEffectCustomizationList";
import { BaseOutputComponent } from "../../../CustomSpell/BaseOutputComponent";
import { BaseEffectCustomization } from "../../../Models/Cost/BaseEffectCustomization";
import { ArrayList } from "../../../Utils/List/ArrayList";

@Component({
    selector: 'effect-customization-output-control',
    templateUrl: './EffectCustomization.Output.html'
})
export class EffectCustomizationOutputComponent extends BaseOutputComponent {
    @Input('spell-effect-customizations') SpellEffectCustomizations = new BaseEffectCustomizationList()

    protected override showPopupForItem(_event: any): void {
        var popupText = new ArrayList<string>()
        popupText.add((_event as BaseEffectCustomization).CustomizationType.valueOf())
        popupText.add((_event as BaseEffectCustomization).getSummary())
        this.popupShowEmitter.emit(popupText)
    }
}