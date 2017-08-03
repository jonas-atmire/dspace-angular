import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ds-notification',
  styleUrls: [ './notification.component.css' ],
  templateUrl: './notification.component.html',
  animations: [ trigger('shrinkOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({height: '0'}),
      animate(250, style({height: '*'}))
    ]),
    transition('* => void', [
      style({height: '*'}),
      animate(250, style({height: 0}))
    ])
  ])
  ],
})
export class NotificationComponent implements OnInit {
  ngOnInit(): void {
    this.expand();
  }

  @Input() notification: Notification;
  state: string = 'void';

  constructor(private notService: NotificationService) {
    this.expand();
  }

  expand() {
    this.state = 'in';
  }

  collapse() {
    this.state = 'void';
  }

  closeNotification() {
    this.collapse();
    setTimeout(() => {
      this.notService.removeNotification(this.notification);
    }, 250);
  }
}

