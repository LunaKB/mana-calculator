import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { EffectCustomizationOutputComponent } from "./EffectCustomization.Output.Component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";

@NgModule({
    declarations: [EffectCustomizationOutputComponent],
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
    exports: [EffectCustomizationOutputComponent]
})
export class EffectCustomizationOutputModule{}