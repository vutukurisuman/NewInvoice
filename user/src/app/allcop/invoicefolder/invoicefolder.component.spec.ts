import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicefolderComponent } from './invoicefolder.component';

describe('InvoicefolderComponent', () => {
  let component: InvoicefolderComponent;
  let fixture: ComponentFixture<InvoicefolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicefolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicefolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
