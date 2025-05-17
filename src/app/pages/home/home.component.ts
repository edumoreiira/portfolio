import { Component, computed, inject } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { SitePreviewerComponent, WebSites } from "../../components/shared/site-previewer/site-previewer.component";
import { AccordionComponent } from "../../components/shared/accordion/accordion.component";
import { SitePreviewerService } from '../../services/site-previewer.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, SitePreviewerComponent, AccordionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
  private sitePreviewerService = inject(SitePreviewerService);
  protected currentSiteIndex = computed(() => this.sitePreviewerService.currentIndex$()); 

  setCurrentSiteIndex(index: number) {
    this.sitePreviewerService.setCurrentIndex(index);
  }
  websites: WebSites[] = [
    {
      technologies: ["angular", "tailwind", "html", "css", "js", ],
      title: "Bera Pools",
      imgUrl: "./website-preview/bera-pools.jpeg",
      websiteUrl: "https://ysociety-eth.github.io/web3-wallet-manager/"
    },
    {
      technologies: ["angular", "html", "css", "js", ],
      title: "Experience Life",
      imgUrl: "./website-preview/experience-life.jpeg",
      websiteUrl: "https://edumoreiira.github.io/experience-life/"
    },
    {
      technologies: ["angular", "tailwind", "html", "css", "js", ],
      title: "Aju-Films",
      imgUrl: "./website-preview/aju-films.jpeg",
      websiteUrl: "https://edumoreiira.github.io/aju-films/"
    },
  ]
}
