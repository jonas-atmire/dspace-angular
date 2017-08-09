/**
 * An interface to represent objects that can be cached
 *
 * A cacheable object should have a uuid
 */
import { CacheEntry } from './cache-entry';
import {
  AddToNotificationCacheAction, NotificationCacheAction,
  NotificationCacheActionTypes, RemoveFromNotificationCacheAction
} from './notification-cache.actions';
import { hasValue } from '../../shared/empty.util';

export interface CacheableNotification {
  uuid: string;
  self?: string;
}

/**
 * An entry in the ObjectCache
 */
export class NotificationCacheEntry implements CacheEntry {
  data: CacheableNotification;
  timeAdded: number;
  msToLive: number;
}

/**
 * The ObjectCache State
 *
 * Consists of a map with UUIDs as keys,
 * and ObjectCacheEntries as values
 */
export interface NotificationCacheState {
  [uuid: string]: CacheableNotification
}


// Object.create(null) ensures the object has no default js properties (e.g. `__proto__`)
const initialState: NotificationCacheState = Object.create(null);


export const notificationReducer = (state = initialState, action: NotificationCacheAction): NotificationCacheState => {
  switch (action.type) {

    case NotificationCacheActionTypes.ADD: {
      return addToNotificationCache(state, action as AddToNotificationCacheAction);
    }

    case NotificationCacheActionTypes.REMOVE: {
      return removeFromNotificationCache(state, action as RemoveFromNotificationCacheAction)
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
function addToNotificationCache(state: NotificationCacheState, action: AddToNotificationCacheAction): NotificationCacheState {
  return Object.assign({}, state, {
    [action.payload.notificationTOCache.uuid]: {
      data: action.payload.notificationTOCache,
      timeAdded: action.payload.timeAdded,
      msToLive: action.payload.msToLive,
      requestHref: action.payload.requestHref
    }
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
function removeFromNotificationCache(state: NotificationCacheState, action: RemoveFromNotificationCacheAction): NotificationCacheState {
  if (hasValue(state[action.payload])) {
    const newObjectCache = Object.assign({}, state);
    delete newObjectCache[action.payload];

    return newObjectCache;
  } else {
    return state;
  }
}

