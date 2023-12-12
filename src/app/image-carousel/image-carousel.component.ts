import { Component ,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselImage {
  url: string;
  caption?: string;
  alt?: string;
}

@Component({
  selector: 'image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent implements OnInit{

  @Input() images!: CarouselImage[];
  @Input() activeImageIndex = 0;
  @Input() lastIndexPosition!: number;
  @Input() config = {
    height: 70,
    width: 70,
  };

  ngOnInit(): void {
    this.lastIndexPosition = this.images.length - 1;
  }

  onNext() {
    if (this.activeImageIndex >= this.lastIndexPosition) {
      this.activeImageIndex = 0;
    }
    else {
      this.activeImageIndex += 1;
    }
  }

  onPrevious() {
    if (this.activeImageIndex == 0) {
      this.activeImageIndex = this.lastIndexPosition;
    }
    else {
      this.activeImageIndex -= 1;
    }
  }



}
