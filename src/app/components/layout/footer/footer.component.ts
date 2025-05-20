import { Component } from '@angular/core';
import { SocialIconComponent } from "../../shared/social-icon/social-icon.component";

@Component({
  selector: 'footer[app-footer]',
  imports: [SocialIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
