import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  imports: [],
  template: `
  <a [href]='hrefLink()' target="_blank" rel="noopener noreferrer" class="flex items-center justify-center h-[48px] w-[48px] rounded-full border-[2px] text-xl border-neutral-700 text-neutral-700
   hover:bg-neutral-200 hover:border-neutral-200 hover:text-neutral-950 transition-colors duration-200">
    <i class="{{ icon() }}"></i>
  </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialIconComponent {
  icon = input.required();
  hrefLink = input('#');
}
