import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItem } from '../../shared/models/messageItem';
import { MessageListItemComponent } from '../message-list-item/message-list-item.component';

@Component({
  selector: 'message-list',
  standalone: true,
  imports: [CommonModule, MessageListItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() messages : MessageItem[] = [];
}
