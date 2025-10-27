import { Component, Input } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { BaseOutputComponent } from "../../../CustomSpell/BaseOutputComponent";

@Component({
    selector: 'coda-output-control',
    templateUrl: './Coda.Output.html'
})
export class CodaOutputComponent extends BaseOutputComponent {
    CodaEffects = new EffectList()

    @Input('codas')
    set setCodaEffects(codas: EffectList) {
        this.CodaEffects = codas
    }
}