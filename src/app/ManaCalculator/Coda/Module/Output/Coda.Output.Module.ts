import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { CodaOutputComponent } from "./Coda.Output.Component";

@NgModule({
    declarations: [CodaOutputComponent],
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
    exports: [CodaOutputComponent]
})
export class CodaOutputModule{}