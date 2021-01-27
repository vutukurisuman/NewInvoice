import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewExpensesComponent } from './preview-expenses.component';

describe('PreviewExpensesComponent', () => {
  let component: PreviewExpensesComponent;
  let fixture: ComponentFixture<PreviewExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
