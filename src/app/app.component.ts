import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalonPay';
  constructor(public translate: TranslateService, private router: Router) {
    translate.addLangs(['English', 'Vietnamese']);
    translate.setDefaultLang('English');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|Vietnamese/) ? browserLang : 'English');
  }
}


