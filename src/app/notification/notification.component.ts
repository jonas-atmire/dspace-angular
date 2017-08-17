import { Component, Input, EventEmitter } from '@angular/core';
import { Notification } from './notification.model';

import {
  trigger,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'ds-notification',
  styleUrls: [ './notification.component.css' ],
  templateUrl: './notification.component.html',
  outputs: ['stopAnimationNotification', 'startAnimationNotification' ],
  animations: [ trigger('openClose', [
    transition('* => opening', [
      style({ height: '0' }),
      animate(250, style({ height: '*' }))
    ]),
    transition('* => closing', [
      style({ height: '*' }),
      animate(250, style({ height: 0 }))
    ])
  ])
  ],
})
export class NotificationComponent {

  startAnimationNotification = new EventEmitter<Notification>();
  stopAnimationNotification = new EventEmitter<Notification>();

  @Input() notification: Notification;

  expand() {
    this.startAnimationNotification.emit(this.notification);
  }

  collapse() {
    this.startAnimationNotification.emit(this.notification);
  }

  animationDone($event: AnimationEvent) {
    this.stopAnimationNotification.emit(this.notification);
  }
}

