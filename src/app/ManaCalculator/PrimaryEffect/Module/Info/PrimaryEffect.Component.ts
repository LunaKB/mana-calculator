import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";
import { Effect } from "../../../Models/Effect";

@Component({
    templateUrl: "./PrimaryEffect.Component.html",
    styleUrl: "./PrimaryEffect.Component.css"
})
export class PrimaryEffectComponent implements AfterContentInit, DataListener, OnDestroy {
    PrimaryEffects = new EffectList()
    PrimaryEffect: Effect = null
    
    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.PrimaryEffects = this._dataService.Data.PrimaryEffects
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }

    updateSelection() {
        this.onPrimaryEffectChange((document.getElementById('primary-effect-select') as any).value)
    }

    private onPrimaryEffectChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.PrimaryEffect = this.PrimaryEffects.getItemByName(name)
    }
}