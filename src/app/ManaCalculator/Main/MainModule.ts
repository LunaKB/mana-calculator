import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { MasterPageComponent } from '../MasterPage/MasterPage.Component';
import { ManaCalculatorRoutingModule } from '../Routing/Main.Routing';
import { CasterModule } from '../Caster/Module/Info/Caster.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CraftingModule } from '../Crafting/Crafting.Module';
import { SpellLevelModule } from '../SpellLevel/Module/Info/SpellLevel.Module';
import { SpellBaseModule } from '../SpellBase/Module/Info/SpellBase.Module';
import { CodaModule } from '../Coda/Module/Info/Coda.Module';
import { PrimaryEffectModule } from '../PrimaryEffect/Module/Info/PrimaryEffect.Module';
import { SecondaryEffectModule } from '../SecondaryEffect/Module/Info/SecondaryEffect.Module';
import { CustomSpellModule } from '../CustomSpell/CustomSpell.Module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrWrapper } from '../Utils/ToastrWrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from '../Services/Data/DataService';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    MasterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CasterModule,
    CodaModule,
    CraftingModule,
    CustomSpellModule,
    FormsModule,
    ManaCalculatorRoutingModule,
    PrimaryEffectModule,
    ReactiveFormsModule,
    SecondaryEffectModule,
    SpellBaseModule,
    SpellLevelModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {provide: APP_BASE_HREF, useValue: '/dnd/'}
  ],
  bootstrap: [MasterPageComponent]
})
export class MainModule {
  constructor(_dataService: DataService, _http: HttpClient, _toastr: ToastrService) {
    ToastrWrapper.setToastr(_toastr)
  }
}
