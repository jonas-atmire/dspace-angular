import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NotificationService } from './notification.service';
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
export class NotificationComponent implements OnInit {

  startAnimationNotification = new EventEmitter<Notification>();
  stopAnimationNotification = new EventEmitter<Notification>();

  @Input() notification: Notification;

  ngOnInit(): void {
    this.expand();
  }

  constructor(private notificationService: NotificationService) {
  }

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

