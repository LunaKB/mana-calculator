import { Component, Input } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { BaseOutputComponent } from "../../../CustomSpell/BaseOutputComponent";

@Component({
    selector: 'secondary-effect-output-control',
    templateUrl: './SecondaryEffect.Output.html'
})
export class SecondaryEffectOutputComponent extends BaseOutputComponent {
    @Input('secondary-effects') SecondaryEffects = new EffectList()
}