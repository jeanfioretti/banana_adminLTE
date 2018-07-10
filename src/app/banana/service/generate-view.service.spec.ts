import { TestBed, inject } from '@angular/core/testing';

import { GenerateViewService } from './generate-view.service';

describe('GenerateViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateViewService]
    });
  });

  it('should be created', inject([GenerateViewService], (service: GenerateViewService) => {
    expect(service).toBeTruthy();
  }));
});
