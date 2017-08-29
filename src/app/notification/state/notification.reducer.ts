import {
  AddNotificationAction, InitializeCloseTimeoutAction, NotificationAction,
  NotificationActionTypes, RemoveNotificationAction, UpdateStatusAction
} from './notification.actions';
import { Notification } from '../../notification/notification.model';

/**
 * The NotificationState State
 */
export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications : []
}


export const notificationReducer = (state = initialState, action: NotificationAction): NotificationState => {
  switch (action.type) {

    case NotificationActionTypes.ADD: {
      return addToNotificationState(state, action as AddNotificationAction)
    }

    case NotificationActionTypes.REMOVE: {
      return removeFromNotificationState(state, action as RemoveNotificationAction)
    }
    case NotificationActionTypes.UPDATE_STATUS: {
      return updateNotificationStatus(state, action as UpdateStatusAction)
    }
    case NotificationActionTypes.INITIALISE_CLOSE_TIMEOUT: {
      return initializeCloseTimeoutAction(state, action as InitializeCloseTimeoutAction)
    }

    default: {
      return state;
    }
  }
};


/**
 * Add an object to the state
 *
 * @param state
 *    the current state
 * @param action
 *    an AddNotificationAction
 * @return NotificationState
 *    the new state, with the object added, or overwritten.
 */
function addToNotificationState(state: NotificationState, action: AddNotificationAction): NotificationState {

  let notifications = [ ...state.notifications, action.payload.notification ];
  return Object.assign({}, state, {
    notifications: notifications
  });
}

/**
 * Remove an object from the state
 *
 * @param state
 *    the current state
 * @param action
 *    an RemoveNotificationAction
 * @return NotificationState
 *    the new state, with the object removed if it existed.
 */
function removeFromNotificationState(state: NotificationState, action: RemoveNotificationAction): NotificationState {
  const newNotifications = state.notifications.filter((notification) => notification.id !== action.payload)
  return Object.assign({}, state, {
    notifications: newNotifications
  });

}

function updateNotificationStatus(state: NotificationState, action: UpdateStatusAction): NotificationState {
  let notifications: Notification[] = [];
  state.notifications.map(value => {
    if (value.id === action.payload.uuid) {
      notifications.push(copyNotification(value, action.payload.state));
    } else {
      notifications.push(value);
    }
  })
  return Object.assign({}, state, {
    notifications: [ ...notifications ]
  });

}
function initializeCloseTimeoutAction(state: NotificationState, action: InitializeCloseTimeoutAction): NotificationState {
  return Object.assign({}, state);

}

function copyNotification(notification: Notification, notificationState : string): Notification{
  return Object.assign({}, notification,{
    state : notificationState,
    dismissible: (notificationState == 'closing') ? false : notification.dismissible
  })
}


