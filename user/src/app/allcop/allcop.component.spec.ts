import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcopComponent } from './allcop.component';

describe('AllcopComponent', () => {
  let component: AllcopComponent;
  let fixture: ComponentFixture<AllcopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
