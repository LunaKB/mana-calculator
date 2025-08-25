import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { EffectList } from "../../../Utils/List/EffectList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";
import { Effect } from "../../../Models/Effect";

@Component({
    templateUrl: "./SecondaryEffect.Component.html",
    styleUrl: "./SecondaryEffect.Component.css"
})
export class SecondaryEffectComponent implements AfterContentInit, DataListener, OnDestroy {
    SecondaryEffects = new EffectList()
    SecondaryEffect: Effect = null
    
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

    updateSelection() {
        this.onSecondaryEffectChange((document.getElementById('secondary_effect_select') as any).value)
    }

    private onSecondaryEffectChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.SecondaryEffect = this.SecondaryEffects.getItemByName(name)
    }
}