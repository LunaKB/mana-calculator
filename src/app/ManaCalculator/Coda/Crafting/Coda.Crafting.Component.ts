import { Component, EventEmitter, Output } from "@angular/core";
import { Effect } from "../../Models/Effect";
import { EffectList } from "../../Utils/List/EffectList";
import { BaseCraftingComponent } from "../../Crafting/BaseCraftingComponent";

@Component({
    selector: 'coda-crafting-control',
    templateUrl: './Coda.Crafting.html'
})
export class CodaCraftingComponent extends BaseCraftingComponent {

    CodaEffects = new EffectList()
    SelectedCodaEffects = new EffectList()
    CodaEffect: Effect = null
    PreviewEffect: Effect = null

    @Output('coda-effect-added')
    codaEffectAddedEmitter = new EventEmitter<Effect>()

    @Output('coda-effect-removed')
    codaEffectRemovedEmitter = new EventEmitter<Effect>()

    override onReadyChange() {
        this.CodaEffects = this._dataService.Data.CodaEffects

        if (this._dataService.Data.CustomSpell) {
            this.SelectedCodaEffects = this._dataService.getCodas(this._dataService.Data.CustomSpell.CodaIdList) 
            this.SelectedCodaEffects.getItems().forEach(effect => this.codaEffectAddedEmitter.emit(effect))
        }
    }

    override onResetChange() {
        this.SelectedCodaEffects.clear()
        this.CodaEffect = null
        this.PreviewEffect = null
    }

    protected override showPopupForItem(_event: any): void {
        this.PopupTitle = (_event as Effect).Name
        this.PopupMessage = (_event as Effect).Description
        super.showPopup()
    }

    protected override showPreviewForItem(): void {
        this.setPreview()
        this.PopupTitle = "Preview"
        this.PopupMessage = `Name:\t${this.PreviewEffect.Name}\nAspect:\t${this.PreviewEffect.Aspect}\nCost:\t${this.PreviewEffect.Cost}\nDescription:\t${this.PreviewEffect.Description}`
        this.showPopup()
    }

    addCoda() {
        this.onCodaChange((document.getElementById('coda-select') as any).value)
  
        if (!this.SelectedCodaEffects.exists(this.CodaEffect)) {
            this.SelectedCodaEffects.add(this.CodaEffect)
            this.codaEffectAddedEmitter.emit(this.CodaEffect)
        }
    }

    removeCoda(_effect) {
        if (this.SelectedCodaEffects.remove(_effect))
            this.codaEffectRemovedEmitter.emit(_effect)
    }

    setPreview() {
        this.onPreviewChange((document.getElementById('coda-select') as any).value)
    }

    private onCodaChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.CodaEffect = this.CodaEffects.getItemByName(name)
    }

    private onPreviewChange(_event) {
        var name = this._dataService.Data.getInputOrValue(_event)
        this.PreviewEffect = this.CodaEffects.getItemByName(name)
    }
}