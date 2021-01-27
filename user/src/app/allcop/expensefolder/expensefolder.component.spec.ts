import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensefolderComponent } from './expensefolder.component';

describe('ExpensefolderComponent', () => {
  let component: ExpensefolderComponent;
  let fixture: ComponentFixture<ExpensefolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensefolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensefolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
