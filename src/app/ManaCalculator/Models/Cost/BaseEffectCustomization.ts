import { EffectCustomizationType } from "../Effect";

export abstract class BaseEffectCustomization {
    public abstract CustomizationType: EffectCustomizationType
    public abstract getCost() : number
    public abstract getSummary() : string
    
    public getDC() {
        return this.getCost()
    }
}