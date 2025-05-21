import { Component, inject } from '@angular/core';
import { SocialIconComponent } from "../../shared/social-icon/social-icon.component";
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

@Component({
  selector: 'footer[app-footer]',
  imports: [SocialIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
}
