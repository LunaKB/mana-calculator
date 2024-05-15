import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Ability } from "../../Models/Ability";
import { Affinity } from "../../Models/Affinity";
import { BaseEffectCustomization } from "../../Models/Cost/BaseEffectCustomization";
import { EffectList } from "../../Utils/List/EffectList";
import { EffectCustomizationType } from "../../Models/Effect";
import { Data } from "../../Services/Data/Data";
import { DataService } from "../../Services/Data/DataService";

@Component({
    template: ''
})
export abstract class BaseEffectCustomizationControl implements OnChanges {
    public abstract CustomizationType: EffectCustomizationType

    @Input('should-show') Show: boolean
    @Input("all-effects") AllEffects = new EffectList()   
    @Input("non-coda-effects") NonCodaEffects = new EffectList()

    @Output('customization-added')
    customizationAddedEmitter = new EventEmitter<BaseEffectCustomization>()
    
    @Output('customization-removed')
    customizationRemovedEmitter = new EventEmitter<BaseEffectCustomization>()

    constructor(protected _dataService: DataService) {
        this.resetCustomization()
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (this.Show) {
            if (this._dataService.Data.CustomSpell) {
                var customization = this._dataService.Data.CustomSpell.EffectCustomizations.getItemByType(this.CustomizationType)
                if (customization != undefined)
                    this.setCustomization(customization)
            }
            this.customizationAddedEmitter.emit(this.getCustomization())
        } else {
            this.customizationRemovedEmitter.emit(this.getCustomization())
            this.resetCustomization()
        }
     }

    abstract getCustomization() : BaseEffectCustomization
    abstract setCustomization(customization: BaseEffectCustomization)
    abstract resetCustomization()

    getAbilityKeys() : Array<Ability> {
        return Object.values(Ability)
    }

    getSourceAffinityKeys() : Array<Affinity> {
        return Object.values(Affinity)
    }

    getCustomAffinityKeys() : Array<Affinity> {
        return new Array<Affinity>(Affinity.Mind, Affinity.Source, Affinity.Will)
    }
}

