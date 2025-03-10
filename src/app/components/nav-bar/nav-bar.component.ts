import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public menuOpen: boolean = false;
  public currentRoute: string = '/inicio';
  public indicatorPosition: number = 0;
  public indicatorWidth: number = 0;

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        setTimeout(() => this.updateIndicator(), 50);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.updateIndicator();
  }

  updateIndicator(): void {
    setTimeout(() => {
      const activeElement =
        this.elementRef.nativeElement.querySelector('.nav-link.active');
      if (activeElement) {
        this.indicatorPosition = activeElement.offsetLeft;
        this.indicatorWidth = activeElement.offsetWidth;
      }
    }, 50);
  }

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
