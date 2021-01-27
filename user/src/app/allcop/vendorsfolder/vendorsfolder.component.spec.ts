import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsfolderComponent } from './vendorsfolder.component';

describe('VendorsfolderComponent', () => {
  let component: VendorsfolderComponent;
  let fixture: ComponentFixture<VendorsfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
