import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Effect } from "../../Models/Effect";
import { EffectList } from "../../Utils/List/EffectList";
import { DataService } from "../../Services/Data/DataService";

@Component({
    selector: 'primary-effect-crafting-control',
    templateUrl: './PrimaryEffect.Crafting.html'
})
export class PrimaryEffectControlComponent implements OnChanges {
    
    PrimaryEffects = new EffectList()
    PrimaryEffect: Effect = null

    @Input('parent-ready') ParentReady = false

    @Output('primary-effect-changed')
    primaryEffectEmitter = new EventEmitter<Effect>()

    constructor(private _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {
            this.PrimaryEffects = this._dataService.Data.PrimaryEffects
            
            if (this._dataService.Data.CustomSpell) {
                this.PrimaryEffect = this._dataService.getPrimaryEffect(this._dataService.Data.CustomSpell.PrimaryEffectId)
                this.primaryEffectEmitter.emit(this.PrimaryEffect)
            }            
        }
    }

    updateSelection() {
        this.onPrimaryEffectChange((document.getElementById('primary-effect-select') as any).value)
    }

    private onPrimaryEffectChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.PrimaryEffect = this.PrimaryEffects.getItemByName(name)
        this.primaryEffectEmitter.emit(this.PrimaryEffect)
    }
}