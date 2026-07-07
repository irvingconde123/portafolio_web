import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ArchitectureRoutingModule } from './architecture-routing.module';
import { ArchitecturePage } from './architecture.page';

@NgModule({
  imports: [CommonModule, IonicModule, ArchitectureRoutingModule],
  declarations: [ArchitecturePage],
})
export class ArchitectureModule {}
