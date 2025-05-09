import { Component, inject } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
}
