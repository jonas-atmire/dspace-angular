import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification.model';
import { GLOBAL_CONFIG, GlobalConfig } from '../../config';
import { UUID } from 'angular2-uuid';
import {
  AddNotificationAction, InitializeCloseTimeoutAction,
  RemoveNotificationAction, UpdateStatusAction
} from '../core/cache/notification.actions';
import { Store } from '@ngrx/store';
import { NotificationState } from '../core/cache/notification.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService{
  constructor(@Inject(GLOBAL_CONFIG) public config: GlobalConfig, private store : Store<NotificationState>) {
  }

  addNotification(message: string) {
    let notification = new Notification();
    notification = this.createNotification(notification);
    notification.message= message;
    this.store.dispatch(new AddNotificationAction(notification));
    if (notification.timeout > 0) {
      // Dispatch action to be caught by "TimeOutClosingEffect"
      this.store.dispatch(new InitializeCloseTimeoutAction(notification));
    }
  }

  private createNotification(notification: Notification) {
    notification.type = this.config.notification.type;
    notification.dismissible = this.config.notification.dismissible;
    notification.timeout = this.config.notification.timeout;
    let uuid: string = UUID.UUID();
    notification.id = uuid;
    return notification;
  }

  closeNotificationAnimation(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'closing'));
  }

  expandNotification(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'opening'));
  }

  notificationOpened(notification: Notification){
    this.store.dispatch(new UpdateStatusAction(notification.id, 'open'));
  }
  removeNotification(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'closed'));
    this.store.dispatch(new RemoveNotificationAction(notification.id));
  }

  getNotifications(): Observable<Notification[]> {
    let observable = this.store.select<NotificationState>('notification');
    return observable.map(value => value.notifications);
  }
}
