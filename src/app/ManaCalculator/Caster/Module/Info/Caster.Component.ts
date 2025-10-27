import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { Data } from "../../../Services/Data/Data";
import { CasterList } from "../../../Utils/List/CasterList";
import { CasterFormGroup } from "./Caster.FormGroup";
import { Caster } from "../../../Models/Caster";
import { Affinity, AffinityConverter } from "../../../Models/Affinity";
import { DataListener } from "../../../Services/Data/DataListener";
import { DataService } from "../../../Services/Data/DataService";

@Component({
    templateUrl: './Caster.Component.html'
})
export class CasterComponent implements AfterContentInit, DataListener, OnDestroy {
    CasterFormGroup = new CasterFormGroup()
    Casters = new CasterList()
    CurrentCaster: Caster
    RosterCaster: Caster

    constructor(private _dataService: DataService) { }
    
    ngAfterContentInit(): void {
        this._dataService.setListener(this)
    }

    onDataReady(status: boolean) {
        if (status)
            this.Casters = this._dataService.Data.Casters
    }

    ngOnDestroy(): void {
        this._dataService.removeListener(this)
    }

    addCaster() {
        var affinities = new Map<Affinity, number>()
        affinities.set(Affinity.Mind, this.CasterFormGroup.Mind)
        affinities.set(Affinity.Source, this.CasterFormGroup.Source)
        affinities.set(Affinity.Will, this.CasterFormGroup.Will)

        this.CurrentCaster = new Caster(
            this.CasterFormGroup.CasterName,
            this.CasterFormGroup.ManaPoints,
            affinities)
        this._dataService.Data.addCaster(this.CurrentCaster)

        this.CurrentCaster.IsEditable = false
        this.CasterFormGroup.Id = this.CurrentCaster.Id
        this.CasterFormGroup.HasId = true
    }

    editCaster(caster: Caster) {
        this.CurrentCaster = caster
        this.CurrentCaster.IsEditable = true

        this.CasterFormGroup.HasId = true
        this.CasterFormGroup.Id =  this.CurrentCaster.Id
        this.CasterFormGroup.CasterName =  this.CurrentCaster.Name
        this.CasterFormGroup.ManaPoints =  this.CurrentCaster.ManaPointMax
        this.CasterFormGroup.Mind =  this.CurrentCaster.Affinities.get(Affinity.Mind)
        this.CasterFormGroup.Source =  this.CurrentCaster.Affinities.get(Affinity.Source)
        this.CasterFormGroup.Will =  this.CurrentCaster.Affinities.get(Affinity.Will)
    }

    updateCaster() {
        this.CurrentCaster.Name = this.CasterFormGroup.CasterName
        this.CurrentCaster.ManaPointMax = this.CasterFormGroup.ManaPoints
        this.CurrentCaster.Affinities.set(Affinity.Mind, this.CasterFormGroup.Mind)
        this.CurrentCaster.Affinities.set(Affinity.Source, this.CasterFormGroup.Source)
        this.CurrentCaster.Affinities.set(Affinity.Will, this.CasterFormGroup.Will)
        this._dataService.Data.updateCaster(this.CurrentCaster)
        
        this.CurrentCaster.IsEditable = false
        this.CasterFormGroup.Id = this.CurrentCaster.Id
        this.CasterFormGroup.HasId = true
    }

    removeCaster(caster: Caster) {
        if (confirm(`Are you sure you want to delete ${caster.Name}?`))
            this._dataService.Data.removeCaster(caster)
    }

    resetCaster() {
        this.CasterFormGroup.HasId = false
        this.CasterFormGroup.Id = ''
        this.CasterFormGroup.CasterName = ''
        this.CasterFormGroup.ManaPoints = 0
        this.CasterFormGroup.Mind = 0
        this.CasterFormGroup.Source = 0
        this.CasterFormGroup.Will = 0

        if (this.CurrentCaster) {
            this.CurrentCaster.IsEditable = false
            this.CurrentCaster = null
        }
    }

    updateRosterSelection() {
        var name = this._dataService.Data.getInputOrValue((document.getElementById('caster-roster-select') as any).value)
        this.RosterCaster = this._dataService.Data.Casters.getItemByName(name)
    }

    getValueForAffinity(_caster: Caster, _affinity: string) : number {
        var affinity = AffinityConverter.convert(_affinity)
        return _caster.Affinities.get(affinity)
    }
}