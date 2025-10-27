import { Component, EventEmitter, Output } from "@angular/core";
import { SpellLevelInfo } from "../../Models/SpellLevel";
import { Default } from "../../Utils/Default";
import { BaseCraftingComponent } from "../../Crafting/BaseCraftingComponent";

@Component({
    selector: 'spell-level-crafting-control',
    templateUrl: './SpellLevel.Crafting.Control.html'
})
export class SpellLevelCraftingControlComponent extends BaseCraftingComponent {
    SpellLevel: number = Default.SpellLevel
    CurrentInfo: SpellLevelInfo = null

    @Output('spell-info-selected')
    spellInfoEmitter = new EventEmitter<SpellLevelInfo>()

    override onReadyChange() {
        if (this._dataService.Data.CustomSpell) {
            this.SpellLevel = this._dataService.Data.CustomSpell.SpellLevel
            this.onSpellLevelChange()
        }
    }

    override onResetChange() {
        this.SpellLevel = Default.SpellLevel
        this.CurrentInfo = null
    }

    onSpellLevelChange() {
        this.CurrentInfo = this._dataService.Data.SpellLevelInfoList.getItemById(this.SpellLevel)
        this.spellInfoEmitter.emit(this.CurrentInfo)
    }
}