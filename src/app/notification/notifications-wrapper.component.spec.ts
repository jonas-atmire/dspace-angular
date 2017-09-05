import { NotificationsWrapperComponent } from './notifications-wrapper.component'
import { NgbAlert, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { Store } from '@ngrx/store';

describe('NotificationComponent', () => {
  let comp = NotificationsWrapperComponent;
  let fixture: ComponentFixture<NotificationsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsWrapperComponent, NotificationComponent, NgbAlert ],
      imports: [ BrowserAnimationsModule ],
      providers: [ NgbAlertConfig, NotificationService, Store]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsWrapperComponent);
    // comp = fixture.componentInstance;
  });
  it('should display the component', () => {
  })
})
