import { Observable, switchMap } from "rxjs";
import { Caster, CasterConverter, CasterDTO } from "../../Models/Caster";
import { CasterService } from "../Caster.Service";
import { ServiceComponent } from "../ServiceComponent";
import { Affinity } from "../../Models/Affinity";
import { CodaService } from "../Coda.Service";
import { PrimaryEffectService } from "../PrimaryEffect.Service";
import { SecondaryEffectService } from "../SecondaryEffect.Service";
import { SpellBaseInfo, SpellBaseInfoConverter } from "../../Models/SpellBase";
import { SpellBaseService } from "../SpellBase.Service";
import { ConvertSpellLevelInfoData, SpellLevelInfo } from "../../Models/SpellLevel";
import { SpellLevelService } from "../SpellLevel.Service";
import { CasterList } from "../../Utils/List/CasterList";
import { EffectList } from "../../Utils/List/EffectList";
import { SpellLevelInfoList } from "../../Utils/List/SpellLevelInfoList";
import { ArrayList } from "../../Utils/List/ArrayList";
import { AffinityConflict, ConvertAffinityConflictData } from "../../Models/AffinityConflict";
import { AffinityConflictService } from "../AffinityConflict.Service";
import { CustomSpellService } from "../CustomSpell.Service";
import { CustomSpell, CustomSpellConverter, CustomSpellDTO } from "../../Models/CustomSpell";
import { ConvertEffectData, Effect, EffectType } from "../../Models/Effect";
import { CustomSpellList } from "../../Utils/List/CustomSpellList";
import { ToastrWrapper } from "../../Utils/ToastrWrapper";

export class Data extends ServiceComponent {
    Casters = new CasterList()
    CodaEffects = new EffectList()
    CustomSpells = new CustomSpellList()
    PrimaryEffects = new EffectList()
    SecondaryEffects = new EffectList()
    SpellBaseInfoList = new ArrayList<SpellBaseInfo>()
    SpellLevelInfoList = new SpellLevelInfoList()
    AffinityConflicts = new ArrayList<AffinityConflict>()
    CustomSpell: CustomSpell
    Ready = false
    
    private affinityConflictService: AffinityConflictService
    private casterService: CasterService    
    private codaService: CodaService
    private customSpellService: CustomSpellService
    private primaryEffectService: PrimaryEffectService
    private secondaryEffectservice: SecondaryEffectService
    private spellBaseService: SpellBaseService
    private spellLevelService: SpellLevelService
    
    constructor() {
        super()
        this.affinityConflictService = new AffinityConflictService()
        this.casterService = new CasterService()
        this.codaService = new CodaService()
        this.customSpellService = new CustomSpellService()
        this.primaryEffectService = new PrimaryEffectService()
        this.secondaryEffectservice = new SecondaryEffectService()
        this.spellBaseService = new SpellBaseService()
        this.spellLevelService = new SpellLevelService()
    }

    getInputOrValue(input) {
        var output
        try {
            output = input.target.value
        } catch(error) {
            output = input
        }
        return output
    }

    getEffectFromEvent(_event) {
        var name = this.getInputOrValue(_event)
        return this.getEffectFromName(name)
    }

    getEffectFromName(name: string) {
        var effect = this.PrimaryEffects.getItemByName(name)
        if (effect)
            return effect
        effect = this.SecondaryEffects.getItemByName(name)
        if (effect)
            return effect
        return this.CodaEffects.getItemByName(name)        
    }

    addCaster(caster: Caster) {
        var casterDTO = new CasterDTO(
            caster.Id,
            caster.Name,
            caster.ManaPointMax,
            caster.Affinities.get(Affinity.Mind),
            caster.Affinities.get(Affinity.Source),
            caster.Affinities.get(Affinity.Will))

        var body = JSON.stringify(casterDTO)
        this.casterService.add(body).subscribe({
            error: (error) =>  {
                console.log(error) 
                ToastrWrapper.Toastr.error(`Server  error adding caster ${caster.Name}`)
            }, complete: () => {
                this.Casters.add(caster)
                ToastrWrapper.Toastr.success("Caster Added")
            }
        })
    }

    updateCaster(caster: Caster) {
        var casterDTO = new CasterDTO(
            caster.Id,
            caster.Name,
            caster.ManaPointMax,
            caster.Affinities.get(Affinity.Mind),
            caster.Affinities.get(Affinity.Source),
            caster.Affinities.get(Affinity.Will))
        
        var body = JSON.stringify(casterDTO)
        this.casterService.update(casterDTO.Id, body).subscribe({
            error: (error) =>  {
                console.log(error)
                ToastrWrapper.Toastr.error(`Error updating caster ${caster.Name}`)
            }, complete: () => {
                this.Casters.updateItem(caster)
                ToastrWrapper.Toastr.success("Caster Updated")
            }
        })
    }

    removeCaster(caster: Caster) {
        this.casterService.remove(caster.Id).subscribe({
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error(`Error deleting caster ${caster.Name}`)                
            }, complete: () => {
                this.Casters.removeItemByUUID(caster.Id)
                ToastrWrapper.Toastr.success("Caster Deleted")
            }
        })
    }

    addCustomSpell(customSpell: CustomSpell) {
        var spellDTO = new CustomSpellDTO(
            customSpell.OriginCasterId,
            customSpell.AdditionalCasterIdList.getItems(),
            customSpell.SpellLevel,
            customSpell.PrimaryEffectId,
            customSpell.SecondaryEffectIdList.getItems(),
            customSpell.CodaIdList.getItems(),
            customSpell.EffectCustomizations.getItems(),
            customSpell.SpellName,
            customSpell.Description,
            customSpell.SpellAlteration,
            customSpell.UniqueId
        )

        var body = JSON.stringify(spellDTO)
        this.customSpellService.add(body).subscribe({
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error('Error adding spell.')  
            }, complete: () => {
                this.CustomSpells.add(customSpell)
                ToastrWrapper.Toastr.success("Spell Added")
            }
        })
    }

    updateCustomSpell(customSpell: CustomSpell) {
        var spellDTO = new CustomSpellDTO(
            customSpell.OriginCasterId,
            customSpell.AdditionalCasterIdList.getItems(),
            customSpell.SpellLevel,
            customSpell.PrimaryEffectId,
            customSpell.SecondaryEffectIdList.getItems(),
            customSpell.CodaIdList.getItems(),
            customSpell.EffectCustomizations.getItems(),
            customSpell.SpellName,
            customSpell.Description,
            customSpell.SpellAlteration,
            customSpell.UniqueId
        )
        var body = JSON.stringify(spellDTO)
        this.customSpellService.update(customSpell.UniqueId, body).subscribe({
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error('Error updating spell.')
            }, complete: () => {
                this.CustomSpells.updateItem(customSpell)
                ToastrWrapper.Toastr.success("Spell Updated")
            }
        })
    }

    removeCustomSpell(customSpell: CustomSpell) {
        this.customSpellService.remove(customSpell.UniqueId).subscribe({
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error('Error deleting spell.')
            }, complete: () => {
                this.CustomSpells.removeItemByUUID(customSpell.UniqueId)
                ToastrWrapper.Toastr.success("Spell Deleted")
            }
        })
    }

    getApplicationData() : Observable<boolean> {
        return new Observable<boolean>(observer =>{
          this.getData([
            this.getAffinityConflicts(),
            this.getCasters(),
            this.getCodaEffects(),
            this.getCustomSpells(),
            this.getPrimaryEffects(),
            this.getSecondaryEffects(),
            this.getSpellBases(),
            this.getSpellLevels()
          ]).subscribe({
                next: (val) => {
                if (val)
                    console.log("Loaded application data.")
                    observer.next(true)
                },
                error: (error) => {
                    console.log(error)
                    observer.next(false)
                },
                complete: () => observer.complete()
            })
        })
    }

    private getAffinityConflicts() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.affinityConflictService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.AffinityConflicts.add(ConvertAffinityConflictData.fromServer(element))
                    })
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getCasters() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.casterService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.Casters.add(CasterConverter.convert(element))
                    });
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getCodaEffects() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.codaService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.CodaEffects.add(ConvertEffectData.fromServer(element, EffectType.Coda))
                    });                    
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getPrimaryEffects() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.primaryEffectService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.PrimaryEffects.add(ConvertEffectData.fromServer(element, EffectType.Primary))
                    });
                    
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getSecondaryEffects() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.secondaryEffectservice.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.SecondaryEffects.add(ConvertEffectData.fromServer(element, EffectType.Secondary))
                    });
                    
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }  

    private getSpellBases() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.spellBaseService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.SpellBaseInfoList.add(SpellBaseInfoConverter.convert(element))
                    });
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getSpellLevels() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.spellLevelService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {
                        this.SpellLevelInfoList.add(ConvertSpellLevelInfoData.fromServer(element))
                    })
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }

    private getCustomSpells() : Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.customSpellService.getAll().subscribe({
                next: (data) => {
                    data.forEach(element => {                   
                        var spell = CustomSpellConverter.fromServer(element)
                        this.CustomSpells.add(spell) 
                    })
                    observer.next(true)
                },
                error: (error) => observer.error(error),
                complete: () => observer.complete()
            })
        })
    }
}