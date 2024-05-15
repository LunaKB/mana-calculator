import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { SpellBaseInfo } from "../../../Models/SpellBase";
import { ArrayList } from "../../../Utils/List/ArrayList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: './SpellBase.Component.html'
})
export class SpellBaseComponent implements AfterContentInit, DataListener, OnDestroy {
    SpellBaseInfoList = new ArrayList<SpellBaseInfo>()

    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.SpellBaseInfoList = this._dataService.Data.SpellBaseInfoList
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }
    
}