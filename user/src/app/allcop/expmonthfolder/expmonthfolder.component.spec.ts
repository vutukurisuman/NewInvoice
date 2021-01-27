import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpmonthfolderComponent } from './expmonthfolder.component';

describe('ExpmonthfolderComponent', () => {
  let component: ExpmonthfolderComponent;
  let fixture: ComponentFixture<ExpmonthfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpmonthfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpmonthfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
