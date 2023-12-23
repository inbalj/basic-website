import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MessageItem } from '../shared/models/messageItem';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,
            HomeComponent, ContactFormComponent,
            PageComponent, MatButtonModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'basic-website';
}
