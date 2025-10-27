import { Component, EventEmitter, Output } from "@angular/core";
import { Effect } from "../Models/Effect";
import { ArrayList } from "../Utils/List/ArrayList";

@Component({
    template: ''
})
export abstract class BaseOutputComponent {
    @Output('show-popup')
    popupShowEmitter = new EventEmitter<ArrayList<string>>()

    protected showPopupForItem(_event: any): void {
        var popupText = new ArrayList<string>()
        popupText.add((_event as Effect).Name)
        popupText.add((_event as Effect).Description)
        this.popupShowEmitter.emit(popupText)
    }
}