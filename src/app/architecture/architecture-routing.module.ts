import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchitecturePage } from './architecture.page';

const routes: Routes = [{ path: '', component: ArchitecturePage }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ArchitectureRoutingModule {}
