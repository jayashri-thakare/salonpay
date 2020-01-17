import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { environment } from './../environments/environment';

// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalonPay';
  HOSTNAME = 'http://salonpay.leosys.net';
  constructor(public translate: TranslateService, private router: Router) {
    translate.addLangs(['English', 'Vietnamese']);
    translate.setDefaultLang('English');
    console.log(environment.apiUrl);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|Vietnamese/) ? browserLang : 'English');
  }
}


