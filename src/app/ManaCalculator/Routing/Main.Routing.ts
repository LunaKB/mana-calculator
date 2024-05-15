import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CasterComponent } from "../Caster/Module/Info/Caster.Component";
import { CraftingComponent } from "../Crafting/Crafting.Component";
import { SpellLevelComponent } from "../SpellLevel/Module/Info/SpellLevel.Component";
import { SpellBaseComponent } from "../SpellBase/Module/Info/SpellBase.Component";
import { CodaComponent } from "../Coda/Module/Info/Coda.Component";
import { PrimaryEffectComponent } from "../PrimaryEffect/Module/Info/PrimaryEffect.Component";
import { SecondaryEffectComponent } from "../SecondaryEffect/Module/Info/SecondaryEffect.Component";
import { CustomSpellComponent } from "../CustomSpell/CustomSpell.Component";

const routes: Routes = [
    { path: "", component: CraftingComponent },
    { path: "Casters", component: CasterComponent },
    { path: "Coda", component: CodaComponent },
    { path: "Crafting", component: CraftingComponent },
    { path: "CustomSpell", component: CustomSpellComponent },
    { path: "PrimaryEffect", component: PrimaryEffectComponent },
    { path: "SecondaryEffect", component: SecondaryEffectComponent },
    { path: "SpellBase", component: SpellBaseComponent },
    { path: "SpellLevel", component: SpellLevelComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ManaCalculatorRoutingModule { }