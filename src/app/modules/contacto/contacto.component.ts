import { Component, ElementRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../shared/services/email.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  private element = inject(ElementRef);

  public cotizacionForm: FormGroup;

  public emailSent: boolean = false;

  public emailError: boolean = false;

  private _emailService = inject(EmailService);

  constructor() {
    this.cotizacionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(9)]),
      message: new FormControl('', [Validators.required]),
    });
  }

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
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  onSubmit(): void {
    if (this.cotizacionForm.valid) {
      const formData = {
        name: this.cotizacionForm.get('name')?.value,
        email: this.cotizacionForm.get('email')?.value,
        phone: this.cotizacionForm.get('phone')?.value,
        message: this.cotizacionForm.get('message')?.value,
      };

      this._emailService.sendEmail(formData).then(
        (response) => {
          this.emailSent = true;
          this.hideMessagesAfterDelay();
          this.cotizacionForm.reset();
        },
        (error) => {
          this.emailError = true;
          this.hideMessagesAfterDelay();
        }
      );
    }
  }

  hideMessagesAfterDelay() {
    setTimeout(() => {
      this.emailSent = false;
      this.emailError = false;
    }, 4000);
  }
}
