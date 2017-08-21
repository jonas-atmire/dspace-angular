import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'ds-notifications-wrapper',
  styleUrls: [ './notifications-wrapper.component.scss' ],
  templateUrl: './notifications-wrapper.component.html',
})
export class NotificationsWrapperComponent implements OnInit {

  notifications: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  startAnimationNotification(notification: Notification) {
    if (notification.state === 'open') {
      this.notificationService.closeNotificationAnimation(notification);
    } else {
      this.notificationService.expandNotification(notification);
    }
  }

  stopAnimationNotification(notification: Notification) {
    if (notification.state === 'closing') {
      this.notificationService.removeNotification(notification);
    } else if(notification.state==='opening'){
      this.notificationService.notificationOpened(notification);
    }
  }

}

