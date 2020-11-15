import { TestBed } from '@angular/core/testing';

import { WsGuard } from './ws.guard';

describe('WsGuard', () => {
  let guard: WsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
