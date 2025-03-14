import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  images: string[] = [
    'images/download(5).webp',
    'images/download(2).webp',
    'images/download(4).webp',
  ];

  currentIndex: number = 0;
  private observer: IntersectionObserver | null = null;
  private autoPlayInterval: any;
  private element = inject(ElementRef);

  ngOnInit(): void {
    this.startAutoPlay();
    this.preloadFirstImage();
  }

  ngAfterViewInit(): void {
    const sections: NodeListOf<Element> =
      this.element.nativeElement.querySelectorAll('section');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          } else {
            entry.target.classList.add('opacity-0', 'translate-y-10');
            entry.target.classList.remove('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.02 }
    );

    sections.forEach((section: Element) => {
      this.observer?.observe(section);
    });
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  prevImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  preloadFirstImage(): void {
    const image = new Image();
    image.src = this.images[0];
  }
}
