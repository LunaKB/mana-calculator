import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: "./PrimaryEffect.Component.html",
    styleUrl: "./PrimaryEffect.Component.css"
})
export class PrimaryEffectComponent implements AfterContentInit, DataListener, OnDestroy {
    PrimaryEffects = new EffectList()
    
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
}