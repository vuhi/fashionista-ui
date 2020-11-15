import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBtnClearComponent } from './form-btn-clear.component';

describe('FormBtnClearComponent', () => {
  let component: FormBtnClearComponent;
  let fixture: ComponentFixture<FormBtnClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBtnClearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBtnClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
