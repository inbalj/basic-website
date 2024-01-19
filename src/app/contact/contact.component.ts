import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageItem } from '../../shared/models/messageItem';
import { MessageListItemComponent } from '../message-list-item/message-list-item.component';
import { EventService } from '../../shared/services/EventService';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, MessageListComponent, MessageListItemComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  items : MessageItem[] = [
    new MessageItem('Jery','jery@test.com','How are you?'),
    new MessageItem('Linda','lin@t.com','Get Coffee'),
    new MessageItem('Harry Potter','snitch@hogwarts.com','Find the snitch')
  ];

  constructor(private events : EventService) {
    events.listen('removeMessage', (message : any) => {
      // todo remove message from items
      let index = this.items.indexOf(message);
      this.items.splice(index, 1);

    })
  }


  get messageItems() : MessageItem[] {
    return this.items;
  };
}
