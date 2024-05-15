import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SpellBaseInfo } from "../../Models/SpellBase";
import { Data } from "../../Services/Data/Data";
import { ArrayList } from "../../Utils/List/ArrayList";
import { DataService } from "../../Services/Data/DataService";

@Component({
    selector: 'spell-alteration-crafting-control',
    templateUrl: './SpellAlteration.Crafting.html'
})
export class SpellAlterationCraftingComponent implements OnChanges {
    SpellBaseInfoList = new ArrayList<SpellBaseInfo>()
    AvailableInfo = new ArrayList<SpellBaseInfo>()
    CurrentInfo: SpellBaseInfo = null
    Cost: number = 0

    AvailableCastingTimes = new ArrayList<string>()
    CurrentCastingTime = ''

    AvailableRanges = new ArrayList<string>()
    CurrentRange = ''

    AvailableTargets = new ArrayList<number>()
    CurrentTarget = 0

    AvailableAreas = new ArrayList<string>()
    CurrentArea = ''

    AvailableAreaSizes = new ArrayList<string>()
    CurrentAreaSize =  ''

    AvailableDurations = new ArrayList<string>()
    CurrentDuration = ''

    @Input('parent-ready') ParentReady = false

    @Output('spell-alteration-update')
    spellAlterationUpdateEmitter = new EventEmitter<SpellBaseInfo>()

    constructor(private _dataService: DataService) { }
    
    ngOnChanges(changes: SimpleChanges): void {
        var readyChange = changes['ParentReady']
        if (readyChange) {
            this.SpellBaseInfoList = this._dataService.Data.SpellBaseInfoList
            this.fixDropdownSelections()

            if (this._dataService.Data.CustomSpell) {
                this.CurrentInfo = this._dataService.Data.CustomSpell.SpellAlteration
                this.spellAlterationUpdateEmitter.emit(this.CurrentInfo)
            } else
                this.onCostChange()
        }
    }

    updateSelection() {
        this.setValues()

        this.fixDropdownSelections()
        this.onInfoChange()            
    }

    onCostChange() {
        if (this.Cost == null)
            return

        this.AvailableInfo.clear()
        this.AvailableInfo.addAll(...this.SpellBaseInfoList.getItems().filter(info => info.Cost <= this.Cost))

        this.clearLists()
        this.AvailableInfo.getItems().forEach(info => {
            this.AvailableTargets.add(info.Target)
            if (info.CastingTime.length > 0)
                this.AvailableCastingTimes.add(info.CastingTime)
            if (info.Range.length > 0)
                this.AvailableRanges.add(info.Range)
            if (info.Area.length > 0)
                this.AvailableAreas.add(info.Area)
            if (info.AreaSize.length > 0)
                this.AvailableAreaSizes.add(info.AreaSize)
            if (info.Duration.length > 0)
                this.AvailableDurations.add(info.Duration)
        })
        
        
        
        try {
            if ((document.getElementById('range-select') as any).value.length == 0)
                return
            this.setValues()
            this.fixDropdownSelections()
        } catch (error) {
            
        }
    }

    onInfoChange() {
        this.updateInfo()
        this.spellAlterationUpdateEmitter.emit(this.CurrentInfo)
    }

    private updateInfo() {
        if (this.CurrentInfo) {
            this.CurrentInfo.Cost = this.Cost
            this.CurrentInfo.CastingTime = this.CurrentCastingTime
            this.CurrentInfo.Range = this.CurrentRange
            this.CurrentInfo.Target = this.CurrentTarget
            this.CurrentInfo.Area = this.CurrentArea
            this.CurrentInfo.AreaSize = this.CurrentAreaSize
            this.CurrentInfo.Duration = this.CurrentDuration
        } else {            
            this.CurrentInfo = new SpellBaseInfo(
                this.Cost,
                this.CurrentCastingTime,
                this.CurrentRange,
                this.CurrentTarget,
                this.CurrentArea,
                this.CurrentAreaSize,
                this.CurrentDuration)
        }
    }

    private setValues() {
        this.CurrentCastingTime = (document.getElementById('casting-time-select') as any).value
        this.CurrentRange = (document.getElementById('range-select') as any).value
        this.CurrentTarget = Number((document.getElementById('target-select') as any).value)
        this.CurrentArea = (document.getElementById('area-select') as any).value
        this.CurrentAreaSize = (document.getElementById('area-size-select') as any).value
        this.CurrentDuration = (document.getElementById('duration-select') as any).value
    }
    
    private clearLists() {
        this.AvailableCastingTimes.clear()
        this.AvailableRanges.clear()
        this.AvailableTargets.clear()
        this.AvailableAreas.clear()
        this.AvailableAreaSizes.clear()
        this.AvailableDurations.clear()
    }

    private fixDropdownSelections() {
        this.CurrentCastingTime = this.fixDropdownSelection<string>(this.AvailableCastingTimes, this.CurrentCastingTime, 'casting-time-select')
        this.CurrentRange = this.fixDropdownSelection<string>(this.AvailableRanges, this.CurrentRange, 'range-select')
        this.CurrentTarget = this.fixDropdownSelection<number>(this.AvailableTargets, this.CurrentTarget, 'target-select')
        this.CurrentArea = this.fixDropdownSelection<string>(this.AvailableAreas, this.CurrentArea, 'area-select')
        this.CurrentAreaSize = this.fixDropdownSelection<string>(this.AvailableAreaSizes, this.CurrentAreaSize, 'area-size-select')
        this.CurrentDuration = this.fixDropdownSelection<string>(this.AvailableDurations, this.CurrentDuration, 'duration-select')
    }

    private fixDropdownSelection<Type>(list: ArrayList<Type>, currentValue: Type, controlId: string) : Type {
        try {
            if (list.isEmpty())
                return currentValue
            if (list.exists(currentValue))
                return currentValue
            
            var newValue: Type = list.get(list.length() - 1);
            (document.getElementById(controlId) as any).value = newValue
            return newValue

        } catch (e) {
            return currentValue
        }
    }
}