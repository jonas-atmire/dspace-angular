import * as deepFreeze from 'deep-freeze';

import { notificationReducer, NotificationState } from './notification.reducer';
import { Notification, NotificationType } from '../../notification/notification.model';
import {
  AddNotificationAction,
  RemoveNotificationAction,
  UpdateStatusAction,
} from './notification.actions';
import { UUID } from 'angular2-uuid';

class NullAction extends AddNotificationAction {
  type = null;
  payload = null;

  constructor() {
    super(null);
  }
}

describe('notificationReducer', () => {

  let notification1: Notification = new Notification();
  notification1.message = 'Testing notification 1';
  notification1.type = NotificationType.INFO;
  notification1.timeout = 5000;
  notification1.dismissible = true;
  notification1.id = UUID.UUID();

  let notification2: Notification = new Notification();
  notification2.message = 'Testing notification 2';
  notification2.type = NotificationType.DANGER;
  notification2.dismissible = true;
  notification2.id = UUID.UUID();
  const initialState: NotificationState = {
    notifications: [ notification1, notification2 ]
  }


  deepFreeze(initialState);
  deepFreeze(notification1);
  deepFreeze(notification2);

  it('should return the current state when no valid actions have been made', () => {
    const newState = notificationReducer(initialState, null);
    expect(newState).toEqual(initialState);
  });

  it('should start with a non empty notification array', () => {
    const newState = notificationReducer(initialState, null);
    expect(newState.notifications.length).toEqual(2);
  });

  it('should add a new notification to the state in response to an add action', () => {
    let notification: Notification = new Notification();
    notification.message = 'A third notification';
    const newState = notificationReducer(initialState, new AddNotificationAction(notification));
    deepFreeze(notification);
    expect(newState.notifications.length).toEqual(3);
    expect(newState.notifications).toContain(notification);
    expect(newState.notifications[ 2 ]).toEqual(notification);

  })

  it('should remove notification from the state in response to a remove action', () => {
    const newState = notificationReducer(initialState, new RemoveNotificationAction(notification1.id));
    expect(newState.notifications.length).toEqual(1);
    expect(newState.notifications[ 0 ]).toEqual(notification2);
    expect(newState.notifications[ 1 ]).toBeUndefined();
  })

  it('should update a notification status in the state in response to an update action', () => {
    const newState = notificationReducer(initialState, new UpdateStatusAction(notification1.id, 'closing'));
    expect(newState.notifications[ 0 ].state).toEqual('closing');
  })

  it('Passing along an "invalid" action will return the initial state', () => {
    const newState = notificationReducer(initialState, new NullAction());
    expect(newState).toEqual(initialState);
  })


});
