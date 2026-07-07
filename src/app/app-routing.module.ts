import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'demos/:slug',
    loadChildren: () =>
      import('./demo/demo.module').then((module) => module.DemoModule),
  },
  {
    path: 'arquitecturas/:slug',
    loadChildren: () =>
      import('./architecture/architecture.module').then(
        (module) => module.ArchitectureModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
