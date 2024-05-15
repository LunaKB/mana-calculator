import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Caster } from "../../Models/Caster";
import { CasterList } from "../../Utils/List/CasterList";
import { AffinityConverter } from "../../Models/Affinity";
import { DataService } from "../../Services/Data/DataService";

@Component({
    selector: 'caster-crafting-control',
    templateUrl: './Caster.Crafting.html'
})
export class CasterCraftingControlComponent implements OnChanges {
    Casters = new CasterList()
    AdditionalCasters = new CasterList()
    CurrentAdditionalCaster: Caster = null
    OriginCaster: Caster = null

    @Input('parent-ready') ParentReady = false

    @Output('origin-caster-changed')
    originCasterEventEmitter = new EventEmitter<Caster>()

    @Output('additional-casters-added')
    additionalCasterAddedEmitter = new EventEmitter<Caster>()

    @Output('additional-casters-removed')
    additionalCasterRemovedEmitter = new EventEmitter<Caster>()

    constructor(private _dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {
            this.Casters = this._dataService.Data.Casters

            if (this._dataService.Data.CustomSpell) {
                this.OriginCaster = this._dataService.getOriginCaster(this._dataService.Data.CustomSpell.OriginCasterId)
                this.originCasterEventEmitter.emit(this.OriginCaster)

                this.AdditionalCasters = this._dataService.getAdditionalCasters(this._dataService.Data.CustomSpell.AdditionalCasterIdList)
                this.AdditionalCasters.getItems().forEach(caster => this.additionalCasterAddedEmitter.emit(caster))
            }
        }
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