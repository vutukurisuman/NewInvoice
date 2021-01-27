import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasefolderComponent } from './purchasefolder.component';

describe('PurchasefolderComponent', () => {
  let component: PurchasefolderComponent;
  let fixture: ComponentFixture<PurchasefolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasefolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasefolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
