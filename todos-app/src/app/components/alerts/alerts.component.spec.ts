import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should appendMessages method', () => {
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component, 'appendMessages').and.callThrough();
    expect(component.alerts.length).toBe(0);
    expect(appendMessagesSpyOn).not.toHaveBeenCalledWith();
    component.appendMessages({
      type: 'type',
      message: 'message'
    });
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'type',
      message: 'message'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.alerts.length).toBe(1);
  });

  it('should remove method', () => {
    let event: Event;
    expect(component.alerts.length).toBe(0);
    component.appendMessages({
      type: 'type',
      message: 'message'
    });
    const removeSpyOn: jasmine.Spy = spyOn(component, 'remove').and.callThrough();
    expect(component.alerts.length).toBe(1);
    expect(removeSpyOn).not.toHaveBeenCalledWith();
    component.remove(event, 0);
    expect(removeSpyOn).toHaveBeenCalledWith(event, 0);
    expect(removeSpyOn.calls.count()).toBe(1);
    expect(component.alerts.length).toBe(0);
  });
  
});
