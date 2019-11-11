import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCreateComponent } from './trade-create.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';

describe('TradeCreateComponent', () => {
  let component: TradeCreateComponent;
  let fixture: ComponentFixture<TradeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TradeCreateComponent,
        LoadingOverlayComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
