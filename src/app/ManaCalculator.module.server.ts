import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { MainModule } from './ManaCalculator/Main/MainModule';
import { MasterPageComponent } from './ManaCalculator/MasterPage/MasterPage.Component';

@NgModule({
  imports: [
    MainModule,
    ServerModule,
  ],
  bootstrap: [MasterPageComponent],
})
export class AppServerModule {}
