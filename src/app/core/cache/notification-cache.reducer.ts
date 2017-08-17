/**
 * An interface to represent objects that can be cached
 *
 * A cacheable object should have a uuid
 */
import {
  AddToNotificationCacheAction, NotificationCacheAction,
  NotificationCacheActionTypes, RemoveFromNotificationCacheAction, UpdateStatusAction
} from './notification-cache.actions';
import { hasValue } from '../../shared/empty.util';
import { Notification } from '../../notification/notification.model';

let counter = 0;
/**
 * The ObjectCache State
 *
 * Consists of a map with UUIDs as keys,
 * and ObjectCacheEntries as values
 */
export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications : []
}


export const notificationReducer = (state = initialState, action: NotificationCacheAction): NotificationState => {
  switch (action.type) {

    case NotificationCacheActionTypes.ADD: {
      return addToNotificationCache(state, action as AddToNotificationCacheAction)
    }

    case NotificationCacheActionTypes.REMOVE: {
      return removeFromNotificationCache(state, action as RemoveFromNotificationCacheAction)
    }
    case NotificationCacheActionTypes.UPDATE_STATUS: {
      return updateNotificationStatus(state, action as UpdateStatusAction)
    }

    default: {
      return state;
    }
  }
};


/**
 * Add an object to the cache
 *
 * @param state
 *    the current state
 * @param action
 *    an AddToObjectCacheAction
 * @return ObjectCacheState
 *    the new state, with the object added, or overwritten.
 */
function addToNotificationCache(state: NotificationState, action: AddToNotificationCacheAction): NotificationState {

  let notifications = [ ...state.notifications, action.payload.notification ];
  return Object.assign({}, state, {
    notifications: notifications
  });
}

/**
 * Remove an object from the cache
 *
 * @param state
 *    the current state
 * @param action
 *    an RemoveFromObjectCacheAction
 * @return ObjectCacheState
 *    the new state, with the object removed if it existed.
 */
function removeFromNotificationCache(state: NotificationState, action: RemoveFromNotificationCacheAction): NotificationState {
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

function copyNotification(notification: Notification, notificationState : string): Notification{
  return Object.assign({}, notification,{
    state : notificationState,
    dismissible: (notificationState == 'closing') ? false : notification.dismissible
  })
}


