import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule
} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        LoadingOverlayComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatInputModule,
        MatCardModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatButtonModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        FlexLayoutModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
