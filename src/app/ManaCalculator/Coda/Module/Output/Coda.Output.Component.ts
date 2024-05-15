import { Component, Input } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";

@Component({
    selector: 'coda-output-control',
    templateUrl: './Coda.Output.html'
})
export class CodaOutputComponent {
    CodaEffects = new EffectList()

    @Input('codas')
    set setCodaEffects(codas: EffectList) {
        this.CodaEffects = codas
    }
}