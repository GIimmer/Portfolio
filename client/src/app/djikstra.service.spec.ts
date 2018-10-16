import { TestBed } from '@angular/core/testing';

import { DjikstraService } from './djikstra.service';

describe('DjikstraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DjikstraService = TestBed.get(DjikstraService);
    expect(service).toBeTruthy();
  });
});
