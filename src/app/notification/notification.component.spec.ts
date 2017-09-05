import { NotificationComponent } from './notification.component'
import { NgbAlert, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationComponent', () => {
  let comp = NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent, NgbAlert ],
      imports: [ BrowserAnimationsModule ],
      providers: [ NgbAlertConfig ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    // comp = fixture.componentInstance;
  });
  it('should display the component', () => {
  })
})
