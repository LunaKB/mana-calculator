import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CasterOutputComponent } from "./Caster.Output.Component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";

@NgModule({
    declarations: [CasterOutputComponent],
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
    exports: [CasterOutputComponent]
})
export class CasterOutputModule{}