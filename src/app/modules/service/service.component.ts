import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  private element = inject(ElementRef);

  ngAfterViewInit(): void {
    const sections: NodeListOf<Element> =
      this.element.nativeElement.querySelectorAll('section');

    const observer = new IntersectionObserver(
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

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}
