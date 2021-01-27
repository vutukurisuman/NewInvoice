import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientfolderComponent } from './clientfolder.component';

describe('ClientfolderComponent', () => {
  let component: ClientfolderComponent;
  let fixture: ComponentFixture<ClientfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
