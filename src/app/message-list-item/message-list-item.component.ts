import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItem } from '../../shared/models/messageItem';


@Component({
  selector: 'message-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list-item.component.html',
  styleUrl: './message-list-item.component.scss'
})
export class MessageListItemComponent {
  /* @Input() messageName!: string;
  @Input() messageEmail!: string;
  @Input() messageText!: string; */
  @Input() message! : MessageItem;

}
