import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItem } from '../../shared/models/messageItem';
import { EventService }from './../../shared/services/EventService';


@Component({
  selector: 'message-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list-item.component.html',
  styleUrl: './message-list-item.component.scss'
})
export class MessageListItemComponent {

  @Input() message! : MessageItem;

  constructor( private events : EventService) { };

  removeMessage(){
    this.events.emit("removeMessage", this.message);
  }

}
