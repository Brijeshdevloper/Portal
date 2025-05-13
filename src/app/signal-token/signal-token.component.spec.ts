import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTokenComponent } from './signal-token.component';

describe('SignalTokenComponent', () => {
  let component: SignalTokenComponent;
  let fixture: ComponentFixture<SignalTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalTokenComponent]
    });
    fixture = TestBed.createComponent(SignalTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
