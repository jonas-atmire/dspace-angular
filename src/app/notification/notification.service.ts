import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GLOBAL_CONFIG, GlobalConfig } from '../../config';
import { UUID } from 'angular2-uuid';

@Injectable()
export class NotificationService {

  notifications: BehaviorSubject<Notification[]>;

  constructor(@Inject(GLOBAL_CONFIG) public config: GlobalConfig) {
    this.notifications = new BehaviorSubject<Notification[]>([]);
  }

  addNotification(message: string) {
    let notification = this.createNotification(message);
    if (notification.timeout > 0) {
      setTimeout(() => {
        this.closeNotificationAnimation(notification);
      }, notification.timeout);
    }
    this.notifications.next([ ...this.notifications.getValue(), notification ])

  }

  private createNotification(message: string) {
    let notification = new Notification();
    notification.type = this.config.notification.type;
    notification.dismissible = this.config.notification.dismissible;
    notification.timeout = this.config.notification.timeout;
    notification.message = message;
    let uuid: string = UUID.UUID();
    notification.id = uuid;
    return notification;
  }

  closeNotificationAnimation(notification: Notification) {
    notification.state = 'closing';
    notification.dismissible = false;
  }

  expandNotification(notification: Notification) {
    notification.state = 'opening';
  }

  notificationOpened(notification: Notification){
    notification.state = 'open';
  }
  removeNotification(notification: Notification) {
    notification.state = 'closed';
    let notifications = this.notifications.getValue();
    let index: number = notifications.indexOf(notification);
    if (index !== -1) {
      notifications.splice(index, 1);
    }
  }
}
