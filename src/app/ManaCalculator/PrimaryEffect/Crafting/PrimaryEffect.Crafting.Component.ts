import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Effect } from "../../Models/Effect";
import { EffectList } from "../../Utils/List/EffectList";
import { BaseCraftingComponent } from "../../Crafting/BaseCraftingComponent";

@Component({
    selector: 'primary-effect-crafting-control',
    templateUrl: './PrimaryEffect.Crafting.html'
})
export class PrimaryEffectControlComponent extends BaseCraftingComponent {
    
    PrimaryEffects = new EffectList()
    PrimaryEffect: Effect = null

    @Output('primary-effect-changed')
    primaryEffectEmitter = new EventEmitter<Effect>()

    override ngOnChanges(changes: SimpleChanges): void {
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