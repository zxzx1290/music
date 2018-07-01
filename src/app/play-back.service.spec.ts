import { TestBed, inject } from '@angular/core/testing';

import { PlayBackService } from './play-back.service';

describe('PlayBackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayBackService]
    });
  });

  it('should be created', inject([PlayBackService], (service: PlayBackService) => {
    expect(service).toBeTruthy();
  }));
});
