import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorformComponent } from './vendorform.component';

describe('VendorformComponent', () => {
  let component: VendorformComponent;
  let fixture: ComponentFixture<VendorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
