import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { SpellLevelCraftingControlComponent } from "../SpellLevel/Crafting/SpellLevel.Crafting.Control.Component";
import { SpellAlterationCraftingComponent } from "../SpellBase/Crafting/SpellAlteration.Crafting.Component";
import { PrimaryEffectControlComponent } from "../PrimaryEffect/Crafting/PrimaryEffect.Crafting.Component";
import { SecondaryEffectControlComponent } from "../SecondaryEffect/Crafting/SecondaryEffect.Crafting.Component";
import { CodaCraftingComponent } from "../Coda/Crafting/Coda.Crafting.Component";
import { CasterCraftingControlComponent } from "../Caster/Crafting/Caster.Crafting.Component";
import { CasterOutputModule } from "../Caster/Module/Output/Caster.Output.Module";
import { SpellLevelOutputModule } from "../SpellLevel/Module/Output/SpellLevel.Output.Module";
import { SpellAlterationOutputModule } from "../SpellBase/Module/Output/SpellAlteration.Output.Module";
import { PrimaryEffectOutputModule } from "../PrimaryEffect/Module/Output/PrimaryEffect.Output.Module";
import { CodaOutputModule } from "../Coda/Module/Output/Coda.Output.Module";
import { EffectCustomizationCraftingModule } from "../EffectCustomization/Module/Crafting/EffectCustomization.Crafting.Module";
import { SecondaryEffectOutputModule } from "../SecondaryEffect/Module/Output/SecondaryEffect.Output.Module";
import { EffectCustomizationOutputModule } from "../EffectCustomization/Module/Output/EffectCustomization.Output.Module";
import { PopupComponent } from "../Popup/Popup.Component";
import { CraftingComponent } from "./Crafting.Component";

@NgModule({
    declarations: [
        CasterCraftingControlComponent,
        CodaCraftingComponent,
        CraftingComponent,
        PrimaryEffectControlComponent,
        SecondaryEffectControlComponent,
        SpellAlterationCraftingComponent,
        SpellLevelCraftingControlComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,    
        PopupComponent,
        CasterOutputModule,
        CodaOutputModule,
        EffectCustomizationCraftingModule,
        EffectCustomizationOutputModule,
        PrimaryEffectOutputModule,
        SecondaryEffectOutputModule,
        SpellAlterationOutputModule,
        SpellLevelOutputModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [ CraftingComponent ]
})
export class CraftingModule {}