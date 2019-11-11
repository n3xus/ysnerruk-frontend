import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterLoginComponent} from './register-login.component';
import {LoginComponent} from './login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {RegisterComponent} from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisterLoginComponent', () => {
  let component: RegisterLoginComponent;
  let fixture: ComponentFixture<RegisterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
