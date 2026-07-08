import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoPage } from './demo.page';
import { AdastraDemoComponent } from './adastra-demo.component';
import { CmsDemoComponent } from './cms-demo.component';
import { HostlycDemoComponent } from './hostlyc-demo.component';
import { LandingDemoComponent } from './landing-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DemoRoutingModule],
  declarations: [
    DemoPage,
    AdastraDemoComponent,
    LandingDemoComponent,
    CmsDemoComponent,
    HostlycDemoComponent,
  ],
})
export class DemoModule {}
