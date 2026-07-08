import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyPage } from './case-study.page';

@NgModule({
  imports: [CommonModule, IonicModule, CaseStudyRoutingModule],
  declarations: [CaseStudyPage],
})
export class CaseStudyModule {}
