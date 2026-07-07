import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoPage } from './demo.page';

@NgModule({
  imports: [CommonModule, IonicModule, DemoRoutingModule],
  declarations: [DemoPage],
})
export class DemoModule {}
