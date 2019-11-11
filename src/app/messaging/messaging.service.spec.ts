import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: MessagingService = TestBed.get(MessagingService);
    expect(service).toBeTruthy();
  });
});
