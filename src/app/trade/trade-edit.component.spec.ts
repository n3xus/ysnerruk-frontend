import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeEditComponent } from './trade-edit.component';
import {
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';

describe('TradeCreateComponent', () => {
  let component: TradeEditComponent;
  let fixture: ComponentFixture<TradeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeEditComponent, LoadingOverlayComponent ],
      imports: [
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatInputModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
