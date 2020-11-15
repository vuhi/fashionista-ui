import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../utils/guards/auth-guard/auth.guard';
import { ManageComponent } from './manage.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { AdminGuard } from '../../utils/guards/admin-guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ManageComponent,
    children: [
      { path: 'users', component: UserComponent, canActivate: [AdminGuard] },
      { path: 'products', component: ProductComponent, canActivate: [AdminGuard] },
    ],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
