import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DataService } from "../Services/Data/DataService";

@Component({
    template: ''
})
export abstract class BaseCraftingComponent implements OnChanges {
    @Input('parent-ready') ParentReady = false
    
    PopupTitle = ''
    PopupMessage = ''
    IsPopupVisible = false;

    constructor(protected _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        // Implement in subclass
    }

    protected showPopup() {
        this.IsPopupVisible = true;
    }

    protected showPopupForItem(_event) {
        // Implement in subclass
    }

    protected showPreviewForItem() {
        // Implement in subclass
    }

    protected hidePopup() {
        this.IsPopupVisible = false;
    }

    protected getPopupTitle() : string {
        return this.PopupTitle
    }

    protected getPopupMessage() : string {
        return this.PopupMessage
    }
}