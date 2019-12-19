import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  public edited = false;

  add(message: string) {
    this.edited = true;
    this.messages.push(message);
    // setTimeout(function() {
    //   console.log('hide');
    //   this.showElement = false;
    // }.bind(this), 2000);
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 5000);
  }

  clear() {
    this.messages = [];
  }



}
