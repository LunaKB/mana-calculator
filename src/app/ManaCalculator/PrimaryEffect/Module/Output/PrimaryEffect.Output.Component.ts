import { Component, Input } from "@angular/core";
import { Effect } from "../../../Models/Effect";
import { BaseOutputComponent } from "../../../CustomSpell/BaseOutputComponent";

@Component({
    selector: 'primary-effect-output-control',
    templateUrl: './PrimaryEffect.Output.html'
})
export class PrimaryEffectOutputComponent extends BaseOutputComponent {
    PrimaryEffect: Effect = null

    @Input('primary-effect')
    set setPrimaryEffect(effect: Effect) {
        this.PrimaryEffect = effect
    }
}