import { Component, Input } from "@angular/core";
import { SpellBaseInfo } from "../../../Models/SpellBase";

@Component({
    selector: 'spell-alteration-output-control',
    templateUrl: './SpellAlteration.Output.html'
})
export class SpellAlterationOutputComponent {
    SpellAlterationInfo: SpellBaseInfo = null

    @Input('spell-alteration-info')
    set setSpellAlterationInfo(info: SpellBaseInfo) {
        this.SpellAlterationInfo = info
    }
}