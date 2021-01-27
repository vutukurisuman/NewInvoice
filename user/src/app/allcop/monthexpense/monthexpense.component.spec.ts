import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthexpenseComponent } from './monthexpense.component';

describe('MonthexpenseComponent', () => {
  let component: MonthexpenseComponent;
  let fixture: ComponentFixture<MonthexpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthexpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
