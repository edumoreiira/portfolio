import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SocialIconComponent } from "../../shared/social-icon/social-icon.component";
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

@Component({
  selector: 'footer[app-footer]',
  imports: [SocialIconComponent],
  host: {
    class: 'relative flex flex-col items-center justify-center py-8 border-t border-neutral-900 gap-6 text-center bg-[hsla(0,0%,3.5%)]'
  },
  template: `
    <span class="text-3xl font-medium font-[Kanit] cursor-default">[edumoreira]</span>
    <ul class="flex items-center">
        <li> <app-social-icon icon="flex fi fi-brands-instagram" /> </li>
        <div class="h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></div>
        <li> <app-social-icon icon="flex fi fi-brands-behance" /> </li>
        <div class="h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></div>
        <li> <app-social-icon icon="flex fi fi-brands-twitter-alt-circle" /> </li>
        <div class="h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></div>
        <li> <app-social-icon icon="ri-linkedin-fill" /> </li>
        <div class="h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></div>
        <li> <app-social-icon icon="fi fi-brands-github flex" /> </li>
        <div class="h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></div>
        <li> <app-social-icon icon="fi fi-sr-envelope-plus flex" /> </li>
    </ul>
    <p class="text-neutral-300 text-sm">{{ lg().footer.copyright }}</p>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
}
