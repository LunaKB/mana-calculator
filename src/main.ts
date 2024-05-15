import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainModule } from './app/ManaCalculator/Main/MainModule';


platformBrowserDynamic().bootstrapModule(MainModule)
  .catch(err => console.error(err));
