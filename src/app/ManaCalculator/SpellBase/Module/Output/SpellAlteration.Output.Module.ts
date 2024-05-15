import { NgModule } from "@angular/core";
import { SpellAlterationOutputComponent } from "./SpellAlteration.Output.Component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [SpellAlterationOutputComponent],
    exports: [SpellAlterationOutputComponent]
})
export class SpellAlterationOutputModule {}