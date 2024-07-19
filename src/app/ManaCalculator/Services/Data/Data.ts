import { Observable, switchMap } from 'rxjs';
import { Caster, CasterConverter, CasterDTO } from '../../Models/Caster';
import { CasterService } from '../Caster.Service';
import { ServiceComponent } from '../ServiceComponent';
import { Affinity } from '../../Models/Affinity';
import { CodaService } from '../Coda.Service';
import { PrimaryEffectService } from '../PrimaryEffect.Service';
import { SecondaryEffectService } from '../SecondaryEffect.Service';
import { SpellBaseInfo, SpellBaseInfoConverter } from '../../Models/SpellBase';
import { SpellBaseService } from '../SpellBase.Service';
import { ConvertSpellLevelInfoData, SpellLevelInfo } from '../../Models/SpellLevel';
import { SpellLevelService } from '../SpellLevel.Service';
import { CasterList } from '../../Utils/List/CasterList';
import { EffectList } from '../../Utils/List/EffectList';
import { SpellLevelInfoList } from '../../Utils/List/SpellLevelInfoList';
import { ArrayList } from '../../Utils/List/ArrayList';
import { AffinityConflict, ConvertAffinityConflictData } from '../../Models/AffinityConflict';
import { AffinityConflictService } from '../AffinityConflict.Service';
import { CustomSpellService } from '../CustomSpell.Service';
import { CustomSpell, CustomSpellConverter, CustomSpellDTO } from '../../Models/CustomSpell';
import { ConvertEffectData, Effect, EffectType } from '../../Models/Effect';
import { CustomSpellList } from '../../Utils/List/CustomSpellList';
import { ToastrWrapper } from '../../Utils/ToastrWrapper';

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
        var body = CasterConverter.toServer(caster)
        this.casterService.add(body).subscribe({
            next: (val) => {
                var serverCaster = CasterConverter.convert(val)
                this.Casters.add(serverCaster)
            },
            error: (error) =>  {
                console.log(error) 
                ToastrWrapper.Toastr.error(`Error adding caster ${caster.Name}.`)
            }, complete: () => {
                ToastrWrapper.Toastr.success(`Caster ${caster.Name} added.`)
            }
        })
    }

    updateCaster(caster: Caster) {        
        var body = CasterConverter.toServer(caster)
        this.casterService.update(caster.Id, body).subscribe({
            next: (val) => {
                var serverCaster = CasterConverter.convert(val)
                this.Casters.updateItem(serverCaster)
            },
            error: (error) =>  {
                console.log(error)
                ToastrWrapper.Toastr.error(`Error updating caster ${caster.Name}.`)
            }, complete: () => {
                ToastrWrapper.Toastr.success(`Caster ${caster.Name} updated.`)
            }
        })
    }

    removeCaster(caster: Caster) {
        this.casterService.remove(caster.Id).subscribe({
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error(`Error deleting caster ${caster.Name}.`)                
            }, complete: () => {
                this.Casters.removeItemByUUID(caster.Id)
                ToastrWrapper.Toastr.success(`Caster ${caster.Name} deleted.`)
            }
        })
    }

    addCustomSpell(customSpell: CustomSpell) : Observable<CustomSpell> {
        return new Observable<CustomSpell>(observer => {
            var body = CustomSpellConverter.toServer(customSpell)
            this.customSpellService.add(body).subscribe({
                next: (val) => {
                    var serverSpell = CustomSpellConverter.fromServer(val)
                    this.CustomSpells.add(serverSpell)
                    observer.next(serverSpell)
                },
                error: (error) => {
                    console.log(error)
                    ToastrWrapper.Toastr.error('Error adding spell.')  
                    observer.error(error)
                }, complete: () => {
                    ToastrWrapper.Toastr.success('Spell added.')
                    observer.complete()
                }
            })
        })
    }

    updateCustomSpell(customSpell: CustomSpell) {
        var body = CustomSpellConverter.toServer(customSpell)
        this.customSpellService.update(customSpell.UniqueId, body).subscribe({
            next: (val) => {
                if (val)
                    this.CustomSpells.updateItem(customSpell)
            },
            error: (error) => {
                console.log(error)
                ToastrWrapper.Toastr.error('Error updating spell.')
            }, complete: () => {
                ToastrWrapper.Toastr.success('Spell updated.')
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
                ToastrWrapper.Toastr.success('Spell deleted.')
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
                    console.log('Loaded application data.')
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