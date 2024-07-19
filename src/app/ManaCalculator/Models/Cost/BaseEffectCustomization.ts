import { EffectCustomizationType } from "../Effect";

export abstract class BaseEffectCustomization {
    public abstract CustomizationType: EffectCustomizationType
    public abstract getCost() : number
    public abstract getSummary() : string
    public abstract getEffectData() : string
    
    public getDC() {
        return this.getCost()
    }


    public getEffectName() : string {
        return this.CustomizationType
    }
}

export class BaseEffectCustomizationDTO {
    uuid: string
    effectName: string
    effectData: string

    constructor(uuid: string, effectName: string, effectData: string) {
        this.uuid = uuid
        this.effectName = effectName
        this.effectData = effectData
    }
}

export class ConverBaseEffectCustomization {
    static toServer(uuid: string, effectCustomization: BaseEffectCustomization) : BaseEffectCustomizationDTO {
        return new BaseEffectCustomizationDTO(uuid, effectCustomization.getEffectName(), effectCustomization.getEffectData())
    }
}