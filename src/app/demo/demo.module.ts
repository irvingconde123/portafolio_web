import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoPage } from './demo.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DemoRoutingModule],
  declarations: [DemoPage],
})
export class DemoModule {}
