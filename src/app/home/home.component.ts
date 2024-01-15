import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselImage, ImageCarouselComponent } from '../image-carousel/image-carousel.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, ImageCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  images : CarouselImage[] = [
    {
      url: '../../assets/images/food_and_drinks_for_two_on_a_tray-scopio-ab957dbf-9d59-4137-8d47-7df1de081b01.jpg',
      caption: 'Food and drinks for two on a tray',
      alt: ''
    },
    {
      url: '../../assets/images/1FF713FB-6FE3-40C2-8AF1-D175E8B0BDBB.jpg',
      caption: 'shishlik sticks',
      alt: ''
    },
    {
      url: '../../assets/images/D2F2DE27-EF48-488C-9790-4C0EB1918A3C.jpg',
      caption: 'Dinner meal with five USDA food',
      alt: '',
    },
    {
      url: '../../assets/images/7D774C16-6CA9-4898-AEB5-A52FC76BBC8E.jpg',
      caption: 'Dog sitting tall by food bowl',
      alt: '',
    },
    {
      url: 'https://thumbnails.production.thenounproject.com/70ejvUcUTigld4lsxz1i42v7BJo=/fit-in/1000x1000/photos.production.thenounproject.com/photos/297DEA21-7398-45C4-B24A-CF130FD47866.jpg',
      caption: 'Healthy food and good morning text',
      alt: '',
    }

  ];

}
