import { Component, EventEmitter, Output } from "@angular/core";
import { Caster } from "../../Models/Caster";
import { CasterList } from "../../Utils/List/CasterList";
import { AffinityConverter } from "../../Models/Affinity";
import { BaseCraftingComponent } from "../../Crafting/BaseCraftingComponent";

@Component({
    selector: 'caster-crafting-control',
    templateUrl: './Caster.Crafting.html'
})
export class CasterCraftingControlComponent extends BaseCraftingComponent {
    Casters = new CasterList()
    AdditionalCasters = new CasterList()
    CurrentAdditionalCaster: Caster = null
    OriginCaster: Caster = null

    @Output('origin-caster-changed')
    originCasterEventEmitter = new EventEmitter<Caster>()

    @Output('additional-casters-added')
    additionalCasterAddedEmitter = new EventEmitter<Caster>()

    @Output('additional-casters-removed')
    additionalCasterRemovedEmitter = new EventEmitter<Caster>()

    override onReadyChange() {
        this.Casters = this._dataService.Data.Casters

        if (this._dataService.Data.CustomSpell) {
            this.OriginCaster = this._dataService.getOriginCaster(this._dataService.Data.CustomSpell.OriginCasterId)
            this.originCasterEventEmitter.emit(this.OriginCaster)

            this.AdditionalCasters = this._dataService.getAdditionalCasters(this._dataService.Data.CustomSpell.AdditionalCasterIdList)
            this.AdditionalCasters.getItems().forEach(caster => this.additionalCasterAddedEmitter.emit(caster))
        }
    }

    override onResetChange() {
        this.AdditionalCasters.clear()
        this.CurrentAdditionalCaster = null
        this.OriginCaster = null
    }

    updateOriginCaster() {
        this.onOriginCasterChanged((document.getElementById('origin-caster-select') as any).value)
    }

    addAdditionalCaster() {
        this.onAdditionalCasterChanged((document.getElementById('additional-caster-select') as any).value)
        
        var exists = this.AdditionalCasters.exists(this.CurrentAdditionalCaster)
        if (!exists && this.OriginCaster)
            exists = this.CurrentAdditionalCaster.Name == this.OriginCaster.Name
        if (!exists) {
            this.AdditionalCasters.add(this.CurrentAdditionalCaster)
            this.additionalCasterAddedEmitter.emit(this.CurrentAdditionalCaster)
        }
    }

    removeAdditionalCaster(caster) {
        if (this.AdditionalCasters.remove(caster))            
            this.additionalCasterRemovedEmitter.emit(caster)
    }

    getValueForAffinity(_caster: Caster, _affinity: string) : number {
        var affinity = AffinityConverter.convert(_affinity)
        return _caster.Affinities.get(affinity)
    }

    private onOriginCasterChanged(event) {
        var name = this._dataService.Data.getInputOrValue(event)
        this.OriginCaster = this._dataService.Data.Casters.getItemByName(name)
        this.setOriginCaster()
    }

    private onAdditionalCasterChanged(event) {
        var name = this._dataService.Data.getInputOrValue(event)
        this.CurrentAdditionalCaster = this._dataService.Data.Casters.getItemByName(name)
    }

    private setOriginCaster() {
        if (this.OriginCaster == null)
            return
        this.originCasterEventEmitter.emit(this.OriginCaster)

        if (this.AdditionalCasters.remove(this.OriginCaster))
            this.additionalCasterRemovedEmitter.emit(this.OriginCaster)
    }
}