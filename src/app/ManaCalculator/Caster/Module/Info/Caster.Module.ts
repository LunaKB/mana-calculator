import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CasterComponent } from "./Caster.Component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";

@NgModule({
    declarations: [
        CasterComponent
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
    bootstrap: [ CasterComponent ]
})
export class CasterModule {}