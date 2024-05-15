import { Component, Input } from "@angular/core";
import { BaseEffectCustomizationList } from "../../../Utils/List/BaseEffectCustomizationList";

@Component({
    selector: 'effect-customization-output-control',
    templateUrl: './EffectCustomization.Output.html'
})
export class EffectCustomizationOutputComponent {
    @Input('spell-effect-customizations') SpellEffectCustomizations = new BaseEffectCustomizationList()
}