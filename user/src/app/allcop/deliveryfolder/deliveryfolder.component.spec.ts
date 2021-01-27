import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryfolderComponent } from './deliveryfolder.component';

describe('DeliveryfolderComponent', () => {
  let component: DeliveryfolderComponent;
  let fixture: ComponentFixture<DeliveryfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
