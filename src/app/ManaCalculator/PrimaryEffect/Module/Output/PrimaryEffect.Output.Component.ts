import { Component, Input } from "@angular/core";
import { Effect } from "../../../Models/Effect";

@Component({
    selector: 'primary-effect-output-control',
    templateUrl: './PrimaryEffect.Output.html'
})
export class PrimaryEffectOutputComponent {
    PrimaryEffect: Effect = null

    @Input('primary-effect')
    set setPrimaryEffect(effect: Effect) {
        this.PrimaryEffect = effect
    }
}