import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventscalenderComponent } from './eventscalender.component';

describe('EventscalenderComponent', () => {
  let component: EventscalenderComponent;
  let fixture: ComponentFixture<EventscalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventscalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventscalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
