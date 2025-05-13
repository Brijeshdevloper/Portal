import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrfrontendComponent } from './signalrfrontend.component';

describe('SignalrfrontendComponent', () => {
  let component: SignalrfrontendComponent;
  let fixture: ComponentFixture<SignalrfrontendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalrfrontendComponent]
    });
    fixture = TestBed.createComponent(SignalrfrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
