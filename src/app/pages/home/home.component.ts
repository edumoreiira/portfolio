import { Component, inject } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { SitePreviewerComponent } from "../../components/shared/site-previewer/site-previewer.component";

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, SitePreviewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
}
