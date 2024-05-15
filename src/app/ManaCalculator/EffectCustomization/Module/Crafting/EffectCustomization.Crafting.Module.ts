import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { EffectCustomizationCraftingControl } from "./EffectCustomization.Crafting.Component";
import { AlterAspectControl } from "../../Crafting/AlterAspect/AlterAspect.Control";
import { CurtailCapacityControl } from "../../Crafting/CurtailCapacity/CurtailCapacity.Control";
import { DamageIncreaseControl } from "../../Crafting/DamageIncrease/DamageIncrease.Control";
import { EchoedControl } from "../../Crafting/Echoed/Echoed.Control";
import { TemporaryFeatControl } from "../../Crafting/Feat/TemporaryFeat.Control";
import { InhibitControl } from "../../Crafting/Inhibit/Inhibit.Control";
import { PowerWordControl } from "../../Crafting/PowerWord/PowerWord.Control";
import { RicochetControl } from "../../Crafting/Ricochet/Ricochet.Control";
import { AlterSavingThrowControl } from "../../Crafting/SavingThrow/AlterSavingThrow.Control";
import { StealthedControl } from "../../Crafting/Stealthed/Stealthed.Control";

@NgModule({
    declarations: [
        EffectCustomizationCraftingControl,
        AlterAspectControl,
        AlterSavingThrowControl,
        CurtailCapacityControl,
        DamageIncreaseControl,
        EchoedControl,
        InhibitControl,
        PowerWordControl,
        RicochetControl,
        StealthedControl,
        TemporaryFeatControl
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    providers: [
        provideClientHydration()
    ],
    exports: [EffectCustomizationCraftingControl]
})
export class EffectCustomizationCraftingModule{}