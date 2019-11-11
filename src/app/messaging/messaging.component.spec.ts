import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingComponent } from './messaging.component';
import { MatIconModule, MatListModule, MatTabsModule, MatCardModule, MatSidenavModule, MatFormFieldModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

describe('MessagingComponent', () => {
  let component: MessagingComponent;
  let fixture: ComponentFixture<MessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingComponent ],
      imports: [
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
