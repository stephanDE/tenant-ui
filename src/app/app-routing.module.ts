import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CanActivateDashboard } from './login/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
    canActivate: [CanActivateDashboard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
    {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
