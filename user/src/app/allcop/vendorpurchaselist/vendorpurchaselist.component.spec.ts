import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorpurchaselistComponent } from './vendorpurchaselist.component';

describe('VendorpurchaselistComponent', () => {
  let component: VendorpurchaselistComponent;
  let fixture: ComponentFixture<VendorpurchaselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorpurchaselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorpurchaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
