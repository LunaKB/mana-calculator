import { Component, Input } from "@angular/core";
import { Caster } from "../../../Models/Caster";
import { CasterList } from "../../../Utils/List/CasterList";
import { AffinityConverter } from "../../../Models/Affinity";

@Component({
    selector: 'caster-output-control',
    templateUrl: './Caster.Output.html'
})
export class CasterOutputComponent {
    OriginCaster: Caster
    AdditionalCasters = new CasterList()

    @Input('origin-caster')
    set setOriginCaster(originCaster: Caster) {
            this.OriginCaster = originCaster
    }

    @Input('additional-casters')
    set setAdditionalCasters(additionalCasters: CasterList) {
            this.AdditionalCasters = additionalCasters
    }

    getValueForAffinity(_caster: Caster, _affinity: string) : number {
        var affinity = AffinityConverter.convert(_affinity)
        return _caster.Affinities.get(affinity)
    }
}