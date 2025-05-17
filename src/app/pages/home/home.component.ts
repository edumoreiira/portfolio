import { Component, computed, inject, signal } from '@angular/core';
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
websites = computed<WebSites[]>(() => [
  {
    technologies: ["angular", "tailwind", "html", "css", "js"],
    title: "Bera Pools",
    description: this.lg().works.accordions[0].description,
    button: this.lg().works.accordions[0].button,
    imgUrl: "./website-preview/bera-pools.jpeg",
    websiteUrl: "https://ysociety-eth.github.io/web3-wallet-manager/"
  },
  {
    technologies: ["angular", "html", "css", "js"],
    title: "Experience Life",
    description: this.lg().works.accordions[1].description,
    button: this.lg().works.accordions[1].button,
    imgUrl: "./website-preview/experience-life.jpeg",
    websiteUrl: "https://edumoreiira.github.io/experience-life/"
  },
  {
    technologies: ["angular", "tailwind", "html", "css", "js"],
    title: "Aju-Films",
    description: this.lg().works.accordions[2].description,
    button: this.lg().works.accordions[2].button,
    imgUrl: "./website-preview/aju-films.jpeg",
    websiteUrl: "https://edumoreiira.github.io/aju-films/"
  },
]);
}
