import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Notification, NotificationType } from './notification.model'
import { NotificationService } from './notification.service'
import { NotificationState } from './state/notification.reducer'
import { UUID } from 'angular2-uuid';
import {
  AddNotificationAction, InitializeCloseTimeoutAction, RemoveNotificationAction,
  UpdateStatusAction
} from './state/notification.actions';

describe('NotificationService', () => {
  let service: NotificationService;
  let store: Store<NotificationState>;
  let existingNotification: Notification = new Notification();
  existingNotification.message = 'Existing notification';
  existingNotification.type = NotificationType.INFO;
  existingNotification.dismissible = true;
  existingNotification.id = UUID.UUID();

  let notification1: Notification = new Notification();
  notification1.message = 'Testing notification 1';
  notification1.type = NotificationType.INFO;
  notification1.timeout = 5000;
  notification1.dismissible = true;
  notification1.id = UUID.UUID();

  let notification2: Notification = new Notification();
  notification2.message = 'Testing notification 2';
  notification2.type = NotificationType.INFO;
  notification2.dismissible = true;
  notification2.id = UUID.UUID();

  beforeEach(() => {
    const initialState: NotificationState = {
      notifications: [ existingNotification ]
    }
    store = new Store<NotificationState>(undefined, undefined, Observable.of(initialState));
    spyOn(store, 'dispatch');
    service = new NotificationService(store);
  })


  it('should call AddNotificationAction and InitializeCloseTimeoutAction when a notification with a timeout is added', () => {
    service.addNotification(notification1);
    expect(store.dispatch).toHaveBeenCalledWith(new AddNotificationAction(notification1));
    expect(store.dispatch).toHaveBeenCalledWith(new InitializeCloseTimeoutAction(notification1));
  })

  it('should call UpdateStatusAction when closing a notification', () => {
    service.closeNotificationAnimation(existingNotification);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateStatusAction(existingNotification.id,'closing'));
  })
  it('should call UpdateStatusAction when opening a notification', () => {
    service.expandNotification(existingNotification);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateStatusAction(existingNotification.id,'opening'));
  })
  it('should call UpdateStatusAction when a notification is opened', () => {
    service.notificationOpened(existingNotification);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateStatusAction(existingNotification.id,'open'));
  })

  it('should call UpdateStatusAction when a notification is removed', () => {
    service.removeNotification(existingNotification);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateStatusAction(existingNotification.id,'closed'));
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveNotificationAction(existingNotification.id));
  })
})
