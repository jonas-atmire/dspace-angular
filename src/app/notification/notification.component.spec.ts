import { NotificationComponent } from './notification.component'
import { NgbAlert, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Notification } from './notification.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let comp: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent, NgbAlert ],
      imports: [ BrowserAnimationsModule ],
      providers: [ NgbAlertConfig ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('div.toggle-container > ngb-alert'));
    el = de.nativeElement;
  });
  it('should display the component', () => {
    comp.notification = new Notification();
    fixture.detectChanges();
  })
})
