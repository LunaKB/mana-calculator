import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { PrimaryEffectOutputComponent } from "./PrimaryEffect.Output.Component";

@NgModule({
    declarations: [PrimaryEffectOutputComponent],
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
    exports: [PrimaryEffectOutputComponent]
})
export class PrimaryEffectOutputModule{}