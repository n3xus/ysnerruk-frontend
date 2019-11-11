import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoadingOverlayComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatCheckboxModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        FlexLayoutModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
