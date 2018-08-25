import { TestBed, async, inject } from '@angular/core/testing';

import { EntryListGuard } from './entry-list.guard';

describe('EntryListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryListGuard]
    });
  });

  it('should ...', inject([EntryListGuard], (guard: EntryListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
