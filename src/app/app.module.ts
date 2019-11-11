import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register-login/register.component';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TradeComponent, TradeCreateComponent, TradeDetailComponent, TradeEditComponent} from './trade';
import {MatInputModule, MatPaginatorModule} from '@angular/material';
import {LoginComponent} from './register-login/login.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthInterceptor} from './services';
import { AppLayoutComponent } from './layouts';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ReviewCreateComponent} from './review/review-create.component';
import {ReviewComponent} from './review/review.component';
import { MessagingComponent } from './messaging/messaging.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NavigationComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    TradeComponent,
    TradeCreateComponent,
    TradeDetailComponent,
    TradeEditComponent,
    AppLayoutComponent,
    ReviewCreateComponent,
    ReviewComponent,
    MessagingComponent,
    RegisterLoginComponent,
    LoadingOverlayComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
