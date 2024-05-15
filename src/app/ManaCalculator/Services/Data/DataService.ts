import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, mergeMap, of, tap, timeout } from "rxjs";
import { Data } from "./Data";
import { DataListener } from "./DataListener";
import { ArrayList } from "../../Utils/List/ArrayList";
import { Caster } from "../../Models/Caster";
import { Effect } from "../../Models/Effect";
import { SpellBaseInfo } from "../../Models/SpellBase";
import { SpellLevelInfo } from "../../Models/SpellLevel";
import { CastingCalculator } from "../../Utils/CastingCalculator";
import { CasterList } from "../../Utils/List/CasterList";
import { EffectList } from "../../Utils/List/EffectList";
import { BaseEffectCustomizationList } from "../../Utils/List/BaseEffectCustomizationList";
import { ToastrWrapper } from "../../Utils/ToastrWrapper";
import { CastingInfo } from "../../Models/CastingInfo";
import { environment } from "../../../../environments/environment";

const localUrl = environment.localServer
const externalUrl = environment.externalServer
const networkUrl = environment.networkServer

@Injectable({
    providedIn: 'root'
})
export class DataService {
    Data: Data
    static DataListeners = new ArrayList<DataListener>()

    private static http: HttpClient
    private static url = ""
    
    private static isLocal = false
    private static isExternal = false
    private static isNetwork = false

    constructor(_http: HttpClient) {
        DataService.http = _http
        this.getExternalUrl().pipe(
            mergeMap(() => this.getNetworkUrl()),
            mergeMap(() => this.getLocalUrl()),
            tap(val => this.setUrl()),
            tap(val => this.setData()),
            mergeMap(() => this.Data.getApplicationData())
        ).subscribe({
            next: val => {
                if (val) {
                    console.log('Data service finished')
                    this.Data.Ready = true
                    DataService.DataListeners.getItems().forEach(listener => listener.onDataReady(true))
                    ToastrWrapper.Toastr.success("Data loaded.")
                }
            }, error: error => {
                console.log(error)
                ToastrWrapper.Toastr.error("Error loading data. Check console.")
            }
        })
    }

    static getHttp() : HttpClient {
        return this.http
    }

    static getUrl() : string {
        return this.url
    }

    getOriginCaster(uuid: string) : Caster {
        var item = this.Data.Casters.getItemByUUID(uuid)
        if (item == undefined)
            return null
        return item
    }

    getAdditionalCasters(casterList: ArrayList<string>) : CasterList {
        var list = new CasterList()
        if (casterList.length() == 0)
            return list
        casterList.getItems().forEach(id => {
            var caster = this.Data.Casters.getItemByUUID(id)
            if (caster != undefined)
                list.add(caster)
        })
        return list 
    }

    getSpellLevelInfo(spellLevel: number) : SpellLevelInfo {
        return this.Data.SpellLevelInfoList.getItemById(spellLevel)        
    }

    getPrimaryEffect(id: number) : Effect {
        return this.Data.PrimaryEffects.getItemById(id)
    }

    getSecondaryEffects(ids: ArrayList<number>) : EffectList {
        if (ids.length() == 0)
            return new EffectList()
        return new EffectList(...Array.from(ids.getItems(), (id) => this.Data.SecondaryEffects.getItemById(id)))
    }

    getCodas(ids: ArrayList<number>) : EffectList {
        if (ids.length() == 0)
            return new EffectList()
        return new EffectList(...Array.from(ids.getItems(), (id) => this.Data.CodaEffects.getItemById(id)))
    }

    getCastingInfo(spellLevel: number, spellAlteration: SpellBaseInfo, originCasterId: string, additionalCasterIds: ArrayList<string>,
        primaryId: number, secondaryIds: ArrayList<number>, codaIds: ArrayList<number>, customizations: BaseEffectCustomizationList) 
    : CastingInfo {
        var originCaster = this.getOriginCaster(originCasterId)
        if (!originCaster)
            return new CastingInfo()
        var additionalCasters = this.getAdditionalCasters(additionalCasterIds)
        var primaryEffect = this.getPrimaryEffect(primaryId)
        var secondaryEffects = this.getSecondaryEffects(secondaryIds)
        var codas = this.getCodas(codaIds)

        return CastingCalculator.getCastingInfo(spellLevel, spellAlteration, this.Data.AffinityConflicts, originCaster,additionalCasters, primaryEffect, secondaryEffects, codas, customizations)
    }

    setListener(listener: DataListener) {
        DataService.DataListeners.replace(listener)
        if (this.Data)
            listener.onDataReady(this.Data.Ready)
    }

    removeListener(listener: DataListener) {
        DataService.DataListeners.remove(listener)
    }

    private getLocalUrl() : Observable<any> {
        return DataService.http.get<any>(localUrl).pipe(
            timeout(1000),
            catchError(e => {return of(null)}),
            tap(val => { if (val) DataService.isLocal = true }))
    }

    private getExternalUrl() : Observable<any> {
        return DataService.http.get<any>(externalUrl).pipe(
            timeout(1000),
            catchError(e => {return of(null)}),
            tap(val => { if (val) DataService.isExternal = true }))
    }

    private getNetworkUrl() : Observable<any> {
        return DataService.http.get<any>(networkUrl).pipe(
            timeout(1000),
            catchError(e => {return of(null)}),
            tap(val => { if (val) DataService.isNetwork = true }))
    }

    private setUrl() {
        if (DataService.isExternal) DataService.url = externalUrl
        else if (DataService.isNetwork) DataService.url = networkUrl
        else if (DataService.isLocal) DataService.url = localUrl
        console.log(DataService.url)
    }

    private setData() {
        this.Data = new Data()
    }
}