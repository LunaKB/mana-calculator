import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { CustomSpell } from "../Models/CustomSpell";
import { CasterList } from "../Utils/List/CasterList";
import { EffectList } from "../Utils/List/EffectList";
import { CustomSpellList } from "../Utils/List/CustomSpellList";
import { Router } from "@angular/router";
import { DataListener } from "../Services/Data/DataListener";
import { DataService } from "../Services/Data/DataService";

@Component({
    templateUrl: './CustomSpell.html',
    styleUrl: './CustomSpell.css'
})
export class CustomSpellComponent implements AfterContentInit, DataListener, OnDestroy {
    Casters = new CasterList()
    Codas = new EffectList()
    CustomSpells = new CustomSpellList()
    PrimaryEffects = new EffectList()
    SecondaryEffects = new EffectList()

    constructor(private router: Router, public _dataService: DataService) {}
    
    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status) {
            this.Casters = this._dataService.Data.Casters
            this.Codas = this._dataService.Data.CodaEffects
            this.CustomSpells = this._dataService.Data.CustomSpells
            this.PrimaryEffects = this._dataService.Data.PrimaryEffects
            this.SecondaryEffects = this._dataService.Data.SecondaryEffects
        }
    }

    ngOnDestroy(): void {
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
}