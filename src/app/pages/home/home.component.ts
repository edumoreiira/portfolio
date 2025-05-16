import { Component, inject } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { SitePreviewerComponent, WebSites } from "../../components/shared/site-previewer/site-previewer.component";

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, SitePreviewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);

  websites: WebSites[] = [
    {
      technologies: ["angular", "tailwind", "html", "css", "js", ],
      title: "Aju-Films",
      imgUrl: "./website-preview/aju-films.jpeg",
      websiteUrl: "https://edumoreiira.github.io/aju-films/"
    },
    {
      technologies: ["angular", "html", "css", "js", ],
      title: "BeraPools",
      imgUrl: "./website-preview/bera-pools.jpeg",
      websiteUrl: "https://ysociety-eth.github.io/web3-wallet-manager/"
    }
  ]
}
