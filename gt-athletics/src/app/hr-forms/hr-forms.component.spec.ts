import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFormsComponent } from './hr-forms.component';

describe('HrFormsComponent', () => {
  let component: HrFormsComponent;
  let fixture: ComponentFixture<HrFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
