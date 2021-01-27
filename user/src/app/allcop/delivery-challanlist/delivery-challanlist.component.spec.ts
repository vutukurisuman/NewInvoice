import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallanlistComponent } from './delivery-challanlist.component';

describe('DeliveryChallanlistComponent', () => {
  let component: DeliveryChallanlistComponent;
  let fixture: ComponentFixture<DeliveryChallanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChallanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChallanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
