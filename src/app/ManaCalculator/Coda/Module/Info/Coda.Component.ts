import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: "./Coda.Component.html"
})
export class CodaComponent implements AfterContentInit, DataListener, OnDestroy {
    CodaEffects = new EffectList()

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
}