import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { legacyArchitectureRedirect } from './seo/legacy-route.redirect';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'demos/:slug',
    loadChildren: () =>
      import('./demo/demo.module').then((module) => module.DemoModule),
  },
  {
    path: 'arquitecturas/:slug',
    redirectTo: legacyArchitectureRedirect,
  },
  {
    path: 'casos/:slug',
    loadChildren: () =>
      import('./case-study/case-study.module').then(
        (module) => module.CaseStudyModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
