import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: "./SecondaryEffect.Component.html",
    styleUrl: "./SecondaryEffect.Component.css"
})
export class SecondaryEffectComponent implements AfterContentInit, DataListener, OnDestroy {
    SecondaryEffects = new EffectList()
    
    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.SecondaryEffects = this._dataService.Data.SecondaryEffects   
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }
}