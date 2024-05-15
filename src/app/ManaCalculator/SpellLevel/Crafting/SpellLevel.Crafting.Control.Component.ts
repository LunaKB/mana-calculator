import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SpellLevelInfo } from "../../Models/SpellLevel";
import { Data } from "../../Services/Data/Data";
import { Default } from "../../Utils/Default";
import { DataService } from "../../Services/Data/DataService";

@Component({
    selector: 'spell-level-crafting-control',
    templateUrl: './SpellLevel.Crafting.Control.html'
})
export class SpellLevelCraftingControlComponent implements OnChanges {
    SpellLevel: number = Default.SpellLevel
    CurrentInfo: SpellLevelInfo = null

    @Input('parent-ready') ParentReady = false

    @Output('spell-info-selected')
    spellInfoEmitter = new EventEmitter<SpellLevelInfo>()

    constructor(private _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {

            if (this._dataService.Data.CustomSpell) {
                this.SpellLevel = this._dataService.Data.CustomSpell.SpellLevel
                this.onSpellLevelChange()
            }
        }
    }

    onSpellLevelChange() {
        this.CurrentInfo = this._dataService.Data.SpellLevelInfoList.getItemById(this.SpellLevel)
        this.spellInfoEmitter.emit(this.CurrentInfo)
    }
}