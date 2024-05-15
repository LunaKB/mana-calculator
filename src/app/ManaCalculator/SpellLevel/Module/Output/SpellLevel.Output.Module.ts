import { NgModule } from "@angular/core";
import { SpellLevelOutputComponent } from "./SpellLevel.Output.Component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [SpellLevelOutputComponent],
    exports: [SpellLevelOutputComponent]
})
export class SpellLevelOutputModule {

}