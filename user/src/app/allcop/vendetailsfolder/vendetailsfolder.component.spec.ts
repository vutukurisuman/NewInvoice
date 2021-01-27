import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendetailsfolderComponent } from './vendetailsfolder.component';

describe('VendetailsfolderComponent', () => {
  let component: VendetailsfolderComponent;
  let fixture: ComponentFixture<VendetailsfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendetailsfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendetailsfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
