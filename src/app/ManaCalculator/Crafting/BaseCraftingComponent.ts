import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DataService } from "../Services/Data/DataService";

@Component({
    template: ''
})
export abstract class BaseCraftingComponent implements OnChanges {
    @Input('parent-ready') ParentReady = false
    @Input('reset') Reset = false
    
    PopupTitle = ''
    PopupMessage = ''
    IsPopupVisible = false;

    constructor(protected _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange && readyChange.currentValue) 
            this.onReadyChange()

        var resetChange = changes['Reset']
        if (resetChange && resetChange.currentValue)
            this.onResetChange()
    }

    abstract onReadyChange()
    abstract onResetChange()

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