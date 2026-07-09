import { inject, NgModule, provideAppInitializer } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SeoService } from './seo/seo.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => inject(SeoService).initialize()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
