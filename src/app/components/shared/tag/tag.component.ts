import { ChangeDetectionStrategy, Component, HostBinding, HostListener, input, signal } from '@angular/core';
import { createAnimation } from '../../../animations/default-transitions.animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tag',
  imports: [NgClass],
  host: {
    tabIndex: '0',
    class: 'md:max-w-[min(25rem,100%)] lg:max-w-[min(27rem,100%)] md:w-auto w-full flex flex-col py-4 px-6 rounded-2xl border text-neutral-200 cursor-pointer hover:bg-neutral-600/5 hover:border-neutral-700 transition-all duration-200 overflow-hidden'
  },
  template: `
    <div class="flex items-center justify-between gap-18 lg:gap-22">
      <h3 class="leading-none font-semibold text-lg whitespace-nowrap">{{ title() }}</h3>
      <div class="flex items-center gap-1">
          <i class="fi {{ icon() }} flex text-lg"></i>
          <i class="fi fi-rr-caret-down flex text-sm transition-transform duration-200"
          [ngClass]="{ 'rotate-180': opened() }"></i>
      </div>
    </div>
    @if (opened()) {
      <hr class="border-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-4" @slide>
      <p class="text-neutral-400 text-sm" @slide>{{ description() }}</p>
    }
  `,
  styleUrl: './tag.component.scss',
  animations: [
    createAnimation('slide', { animateX: true, animateY: true, duration: '300ms',opacity: '0' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  title = input.required();
  description = input.required();
  icon = input('fi-rr-time-fast');
  // 
  opened = signal(false);
  

  toggle() {
    this.opened.update((state) => !state);
  }

  @HostListener('click')
  onHostClick() {
    this.toggle()
  }

  @HostListener('keydown', ['$event'])
  onHostKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggle();
      event.preventDefault(); // Prevent default action for space key
    }
  }

  @HostBinding('class')
  get hostClasses() {
    return this.opened() ? 'border-neutral-600' : 'border-neutral-800';
  }
}
