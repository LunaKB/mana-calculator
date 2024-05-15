import { Component, Input } from "@angular/core";
import { SpellLevelInfo } from "../../../Models/SpellLevel";

@Component({
    selector: 'spell-level-output-control',
    templateUrl: './SpellLevel.Output.html'
})
export class SpellLevelOutputComponent {
    SpellLevelInfo: SpellLevelInfo = null

    @Input('spell-level-info')
    set setSpellLevelInfo(info: SpellLevelInfo) {
        this.SpellLevelInfo = info
    }
}