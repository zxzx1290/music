import { TestBed, inject } from '@angular/core/testing';

import { HtmlInterfaceService } from './html-interface.service';

describe('HtmlInterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtmlInterfaceService]
    });
  });

  it('should be created', inject([HtmlInterfaceService], (service: HtmlInterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
