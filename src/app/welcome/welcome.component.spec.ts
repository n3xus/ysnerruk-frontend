import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {RegisterLoginComponent} from '../register-login/register-login.component';
import {LoginComponent} from '../register-login/login.component';
import {RegisterComponent} from '../register-login/register.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent,
        RegisterLoginComponent,
        LoginComponent,
        RegisterComponent,
        LoadingOverlayComponent
      ],
      imports: [
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
