import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Effect } from "../../Models/Effect";
import { EffectList } from "../../Utils/List/EffectList";
import { DataService } from "../../Services/Data/DataService";

@Component({
    selector: 'coda-crafting-control',
    templateUrl: './Coda.Crafting.html'
})
export class CodaCraftingComponent implements OnChanges {
    CodaEffects = new EffectList()
    SelectedCodaEffects = new EffectList()
    CodaEffect: Effect = null
    PreviewEffect: Effect = null

    @Input('parent-ready') ParentReady = false

    @Output('coda-effect-added')
    codaEffectAddedEmitter = new EventEmitter<Effect>()

    @Output('coda-effect-removed')
    codaEffectRemovedEmitter = new EventEmitter<Effect>()

    constructor(private _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {
            this.CodaEffects = this._dataService.Data.CodaEffects

            if (this._dataService.Data.CustomSpell) {
                this.SelectedCodaEffects = this._dataService.getCodas(this._dataService.Data.CustomSpell.CodaIdList) 
                this.SelectedCodaEffects.getItems().forEach(effect => this.codaEffectAddedEmitter.emit(effect))
            }
        }
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