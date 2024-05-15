import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { Data } from "../../../Services/Data/Data";
import { SpellLevelInfoList } from "../../../Utils/List/SpellLevelInfoList";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: './SpellLevel.Component.html'
})
export class SpellLevelComponent implements AfterContentInit, DataListener, OnDestroy {
    SpellLevelInfoList = new SpellLevelInfoList()

    constructor(private _dataService: DataService) { }

    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.SpellLevelInfoList = this._dataService.Data.SpellLevelInfoList
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }
}