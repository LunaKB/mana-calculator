import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideClientHydration } from "@angular/platform-browser";
import { SpellBaseComponent } from "./SpellBase.Component";


@NgModule({
    declarations: [
        SpellBaseComponent
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
    bootstrap: [ SpellBaseComponent ]
})
export class SpellBaseModule {}