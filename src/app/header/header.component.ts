import { Component } from "@angular/core";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'open-book',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/open-book.svg')
    );
    iconRegistry.addSvgIcon(
      'cultery',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/cultery.svg')
    );
  }
}
