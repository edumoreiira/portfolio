import { ChangeDetectionStrategy, Component, HostBinding, inject, signal } from '@angular/core';
import { TechComponent } from '../../shared/tech/tech.component';
import { NgClass } from '@angular/common';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

@Component({
  selector: 'app-all-techs',
  imports: [TechComponent, NgClass],
  templateUrl: './all-techs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTechsComponent {
  lg = inject(LANGUAGE_APPLICATION);
  // 
  opened = signal(false);
  toggle() {
    this.opened.set(!this.opened());
  }

  @HostBinding('class')
  get hostClasses() {
    const conditionalClasses = this.opened() ? 'max-h-[50rem]' : 'max-h-[28rem] sm:max-h-[50rem] overflow-hidden';
    const classes = 'relative max-w-full grid sm:[grid-template-columns:repeat(auto-fit,minmax(6.82rem,1fr))] sm:[grid-auto-rows:6.82rem] [grid-auto-flow:dense] gap-3 ' + 
    'xs:[grid-template-columns:repeat(auto-fit,minmax(5.5rem,min(1fr,100%)))] xs:[grid-auto-rows:5.5rem] ' + 
    '[grid-template-columns:repeat(auto-fit,minmax(5rem,min(1fr,100%)))] [grid-auto-rows:5rem] ' +
    'sm:overflow-auto transition-all duration-300 '


    return conditionalClasses + ' ' + classes;
  }
}
