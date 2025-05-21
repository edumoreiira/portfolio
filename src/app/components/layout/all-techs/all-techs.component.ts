import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TechComponent } from '../../shared/tech/tech.component';
import { NgClass } from '@angular/common';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

@Component({
  selector: 'app-all-techs',
  imports: [TechComponent, NgClass],
  templateUrl: './all-techs.component.html',
  styleUrl: './all-techs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTechsComponent {
  lg = inject(LANGUAGE_APPLICATION);
  // 
  opened = signal(false);
  toggle() {
    this.opened.set(!this.opened());
  }
}
