import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { CustomSpellComponent } from "./CustomSpell.Component";
import { CasterOutputModule } from "../Caster/Module/Output/Caster.Output.Module";
import { SpellLevelOutputModule } from "../SpellLevel/Module/Output/SpellLevel.Output.Module";
import { SpellAlterationOutputModule } from "../SpellBase/Module/Output/SpellAlteration.Output.Module";
import { PrimaryEffectOutputModule } from "../PrimaryEffect/Module/Output/PrimaryEffect.Output.Module";
import { CodaOutputModule } from "../Coda/Module/Output/Coda.Output.Module";
import { EffectCustomizationOutputModule } from "../EffectCustomization/Module/Output/EffectCustomization.Output.Module";
import { SecondaryEffectOutputModule } from "../SecondaryEffect/Module/Output/SecondaryEffect.Output.Module";

@NgModule({
    declarations: [
        CustomSpellComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CasterOutputModule,
        CodaOutputModule,
        EffectCustomizationOutputModule,
        PrimaryEffectOutputModule,
        SecondaryEffectOutputModule,
        SpellAlterationOutputModule,
        SpellLevelOutputModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [ CustomSpellComponent ]
})
export class CustomSpellModule {}