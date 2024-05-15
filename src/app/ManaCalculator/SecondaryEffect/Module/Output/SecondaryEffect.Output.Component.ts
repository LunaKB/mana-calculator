import { Component, Input } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";

@Component({
    selector: 'secondary-effect-output-control',
    templateUrl: './SecondaryEffect.Output.html'
})
export class SecondaryEffectOutputComponent {
    @Input('secondary-effects') SecondaryEffects = new EffectList()
}