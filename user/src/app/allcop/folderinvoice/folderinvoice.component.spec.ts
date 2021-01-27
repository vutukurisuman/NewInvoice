import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderinvoiceComponent } from './folderinvoice.component';

describe('FolderinvoiceComponent', () => {
  let component: FolderinvoiceComponent;
  let fixture: ComponentFixture<FolderinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
