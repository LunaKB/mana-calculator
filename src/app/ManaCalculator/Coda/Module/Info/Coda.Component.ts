import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";
import { Effect } from "../../../Models/Effect";

@Component({
    templateUrl: "./Coda.Component.html"
})
export class CodaComponent implements AfterContentInit, DataListener, OnDestroy {
    CodaEffects = new EffectList()
    CodaEffect: Effect = null

    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.CodaEffects = this._dataService.Data.CodaEffects
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }

    updateSelection() {
        this.onCodaChange((document.getElementById('coda-select') as any).value)
    }

    private onCodaChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.CodaEffect = this.CodaEffects.getItemByName(name)
    }
}