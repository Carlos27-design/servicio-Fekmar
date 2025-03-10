import { Injectable } from '@angular/core';
import { appConfig } from '../../../app.config';
import * as emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceID = appConfig.emailjs.serviceID;
  private templateID = appConfig.emailjs.templateID;
  private userID = appConfig.emailjs.userID;

  constructor() {
    emailjs.init(this.userID);
  }

  sendEmail(data: any): Promise<any> {
    return emailjs.send(this.serviceID, this.templateID, data);
  }
}
