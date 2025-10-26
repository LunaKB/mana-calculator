import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Effect } from "../../Models/Effect";
import { EffectList } from "../../Utils/List/EffectList";
import { BaseCraftingComponent } from "../../Crafting/BaseCraftingComponent";

@Component({
    selector: 'secondary-effect-crafting-control',
    templateUrl: './SecondaryEffect.Crafting.html',
})
export class SecondaryEffectControlComponent extends BaseCraftingComponent {
    SecondaryEffects = new EffectList()
    SelectedSecondaryEffects = new EffectList()
    SecondaryEffect: Effect = null
    PreviewEffect: Effect = null

    @Output("secondary-effect-added")
    secondaryEffectAddedEmitter = new EventEmitter<Effect>()

    @Output("secondary-effect-removed")
    secondaryEffectRemovedEmitter = new EventEmitter<Effect>()

    override ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {
            this.SecondaryEffects = this._dataService.Data.SecondaryEffects
           
            if (this._dataService.Data.CustomSpell) {
                this.SelectedSecondaryEffects = this._dataService.getSecondaryEffects(this._dataService.Data.CustomSpell.SecondaryEffectIdList)
                this.SelectedSecondaryEffects.getItems().forEach(effect => this.secondaryEffectAddedEmitter.emit(effect))
            }
        }
    }

    protected override showPopupForItem(_event: any): void {
        this.PopupTitle = (_event as Effect).Name
        this.PopupMessage = (_event as Effect).Description
        super.showPopup()
    }

    protected override showPreviewForItem(): void {
        this.setPreview()
        this.PopupTitle = 'Preview'
        this.PopupMessage = `Name:\t${this.PreviewEffect.Name}\nAspect:\t${this.PreviewEffect.Aspect}\nCost:\t${this.PreviewEffect.Cost}\nDescription:\t${this.PreviewEffect.Description}`
        super.showPopup()
    }

    addSecondaryEffect() {
        this.onSecondaryEffectChange((document.getElementById('secondary_effect_select') as any).value)
    
        if (!this.SelectedSecondaryEffects.exists(this.SecondaryEffect)) {
            this.SelectedSecondaryEffects.add(this.SecondaryEffect)
            this.secondaryEffectAddedEmitter.emit(this.SecondaryEffect)
        }
    }

    removeSecondaryEffect(_effect) {
        if (this.SelectedSecondaryEffects.exists(_effect)) {
            this.SelectedSecondaryEffects.remove(_effect)
            this.secondaryEffectRemovedEmitter.emit(_effect)
        }
    }

    setPreview() {
        this.onPreviewEffectChange((document.getElementById('secondary_effect_select') as any).value)
    }

    private onSecondaryEffectChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.SecondaryEffect = this.SecondaryEffects.getItemByName(name)
    }

    private onPreviewEffectChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.PreviewEffect = this.SecondaryEffects.getItemByName(name)
    }
}