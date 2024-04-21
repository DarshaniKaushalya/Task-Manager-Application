import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningPopupComponent } from './warning-popup.component';

describe('WarningPopupComponent', () => {
  let component: WarningPopupComponent;
  let fixture: ComponentFixture<WarningPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningPopupComponent]
    });
    fixture = TestBed.createComponent(WarningPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
