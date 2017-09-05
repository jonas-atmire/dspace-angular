import { NotificationsWrapperComponent } from './notifications-wrapper.component'
import { NgbAlert, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationState } from './state/notification.reducer';
import { NotificationType } from './notification.model';
import { Notification } from './notification.model';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let comp: NotificationsWrapperComponent;
  let fixture: ComponentFixture<NotificationsWrapperComponent>;
  let existingNotification: Notification = new Notification();
  existingNotification.message = 'Existing notification';
  existingNotification.type = NotificationType.INFO;
  existingNotification.dismissible = true;
  existingNotification.id = UUID.UUID();
  const initialState: NotificationState = {
    notifications: [ existingNotification ]
  }
  let store: Store<NotificationState> = new Store<NotificationState>(undefined, undefined, Observable.of(initialState));

  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ NotificationsWrapperComponent, NotificationComponent, NgbAlert ],
      imports: [ BrowserAnimationsModule ],
      providers: [
        NgbAlertConfig,
        { provide: NotificationService, useValue: new NotificationService(store) },
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsWrapperComponent);
    comp = fixture.componentInstance;
  });

})

