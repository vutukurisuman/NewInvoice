import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldertopdfComponent } from './foldertopdf.component';

describe('FoldertopdfComponent', () => {
  let component: FoldertopdfComponent;
  let fixture: ComponentFixture<FoldertopdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldertopdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldertopdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
