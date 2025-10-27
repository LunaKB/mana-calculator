import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { DataListener } from "./Services/Data/DataListener";
import { DataService } from "./Services/Data/DataService";
import { ArrayList } from "./Utils/List/ArrayList";

@Component({
    template: ''
})
export abstract class BaseParentComponent implements AfterContentInit, DataListener, OnDestroy {
    PopupTitle = ''
    PopupMessage = ''
    IsPopupVisible = false
    
    constructor(protected _dataService: DataService) { }
    
    ngAfterContentInit(): void {
        // Implement in subclass
    }

    ngOnDestroy(): void {
        // Implement in subclass
    }

    onDataReady(status: boolean) {
        // Implement in subclass       
    }

    onShowPopup(_event) {
        this.PopupTitle = (_event as ArrayList<string>).get(0)
        this.PopupMessage = (_event as ArrayList<string>).get(1)
        this.showPopup()
    }

    showPopup() {
        this.IsPopupVisible = true
    }

    hidePopup() {
        this.IsPopupVisible = false
    }

    getPopupTitle() : string {
        return this.PopupTitle
    }

    getPopupMessage() : string {
        return this.PopupMessage
    }
}