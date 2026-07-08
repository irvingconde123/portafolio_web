import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseStudyPage } from './case-study.page';

const routes: Routes = [{ path: '', component: CaseStudyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseStudyRoutingModule {}
