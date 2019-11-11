import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register-login/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {TradeComponent, TradeCreateComponent, TradeDetailComponent, TradeEditComponent} from './trade';
import {LoginComponent} from './register-login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReviewComponent} from './review/review.component';
import {ReviewCreateComponent} from './review/review-create.component';
import {AuthGuard} from './services';
import { MessagingComponent } from './messaging/messaging.component';

import {AppLayoutComponent} from './layouts';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent, data: {title: 'Welcome'}},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}, canActivate: [AuthGuard]},
      {path: 'trade', component: TradeComponent, data: {title: 'Trade'}, canActivate: [AuthGuard]},
      {path: 'trade/:id', component: TradeDetailComponent, data: {title: 'Trade'}, canActivate: [AuthGuard]},
      {path: 'create', component: TradeCreateComponent, data: {title: 'Trade'}, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: TradeEditComponent, data: {title: 'Trade'}, canActivate: [AuthGuard]},
      {path: 'review/:id', component: ReviewComponent, data: {title: 'Review'}, canActivate: [AuthGuard]},
      {path: 'review/create/:id', component: ReviewCreateComponent, data: {title: 'Review'}, canActivate: [AuthGuard]},
      {path: 'messaging', component: MessagingComponent, data: {title: 'Messaging'}, canActivate: [AuthGuard]}
    ]
  },

  {path: 'login', redirectTo: 'welcome'},
  {path: 'register', redirectTo: 'welcome'},
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
