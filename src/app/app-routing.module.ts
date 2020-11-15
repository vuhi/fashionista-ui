import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'manage', loadChildren: () => import('./components/manage/manage.module').then(m => m.ManageModule) },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      status: 404,
      title: 'Oops! Page not found',
      message: 'The page you were looking for doesn\'t exist. \nYou may have mistyped the address or the page may have moved.'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
