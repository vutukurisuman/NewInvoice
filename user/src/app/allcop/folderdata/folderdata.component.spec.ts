import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderdataComponent } from './folderdata.component';

describe('FolderdataComponent', () => {
  let component: FolderdataComponent;
  let fixture: ComponentFixture<FolderdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
