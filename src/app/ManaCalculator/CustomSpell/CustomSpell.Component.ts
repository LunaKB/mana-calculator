import { Component } from "@angular/core";
import { CustomSpell, CustomSpellConverter } from "../Models/CustomSpell";
import { CasterList } from "../Utils/List/CasterList";
import { EffectList } from "../Utils/List/EffectList";
import { CustomSpellList } from "../Utils/List/CustomSpellList";
import { Router } from "@angular/router";
import { DataService } from "../Services/Data/DataService";
import { Clipboard } from "@angular/cdk/clipboard";
import { BaseParentComponent } from "../BaseParentComponent";

@Component({
    templateUrl: './CustomSpell.html',
    styleUrl: './CustomSpell.css'
})
export class CustomSpellComponent extends BaseParentComponent {
    Casters = new CasterList()
    Codas = new EffectList()
    CustomSpells = new CustomSpellList()
    PrimaryEffects = new EffectList()
    SecondaryEffects = new EffectList()

    constructor(private router: Router,  _dataService: DataService, private clipboard: Clipboard) {
        super(_dataService)
    }
    
    override ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    override onDataReady(status: boolean) {
        if (status) {
            this.Casters = this._dataService.Data.Casters
            this.Codas = this._dataService.Data.CodaEffects
            this.CustomSpells = this._dataService.Data.CustomSpells
            this.PrimaryEffects = this._dataService.Data.PrimaryEffects
            this.SecondaryEffects = this._dataService.Data.SecondaryEffects
        }
    }

    override ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }

    getCustomSpell(_uuid) : CustomSpell {
        return this._dataService.Data.CustomSpells.getItemByUUID(_uuid)
    }

    editCustomSpell(_spell: CustomSpell) {
        this._dataService.Data.CustomSpell = _spell
        this.router.navigate(['Crafting'])
    }

    removeCustomSpell(_spell: CustomSpell) {
        if (confirm(`Are you sure you want to delete this?`))
            this._dataService.Data.removeCustomSpell(_spell)
    }

    copyCustomSpellToClipboard(_spell: CustomSpell) {
        // If the resulting text gets too big, implement the PendingCopy version of this: https://v12.material.angular.io/cdk/clipboard/overview
        this.clipboard.copy(CustomSpellConverter.toString(_spell, this._dataService))
    }
}