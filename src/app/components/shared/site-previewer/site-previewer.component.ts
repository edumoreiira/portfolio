import { ApplicationRef, Component, ElementRef, inject, input, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgStyle } from '@angular/common';
import { createAnimation } from '../../../animations/default-transitions.animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface WebSites {
  technologies: technologies[];
  title: string;
  imgUrl: string;
  websiteUrl: string;
}

type technologies = "angular" | "html" | "css" | "js" | "tailwind" 

@Component({
  selector: 'app-site-previewer',
  imports: [NgStyle],
  templateUrl: './site-previewer.component.html',
  styleUrl: './site-previewer.component.scss',
  animations: [
    createAnimation('slide', { animateX: true }),
  createAnimation('fade', { opacity: '0', duration: '500ms'}),]
})
export class SitePreviewerComponent implements OnInit {
  private appRef = inject(ApplicationRef);
  private sanitizer = inject(DomSanitizer);
  //
  isOverlayOpen = signal(false);
  websites = input.required<WebSites[]>();
  sanitizedUrl = signal<SafeResourceUrl>('');
  protected currentIndex = signal(0);
  private overlayRef: OverlayRef | null = null;
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;
  @ViewChild('iframeRef') iframeRef: ElementRef<HTMLIFrameElement> | undefined;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }
  
  ngOnInit() {
    this.sanitizeCurrentUrl();
  }

  iframe = signal({
    startLoading: false,
    loaded: false
  });

  private openOverlay() {
    if(this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      height: 'calc(100svh - 4rem)',
      width: 'calc(100svw - 10rem)',
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .bottom('0')
    })
    this.isOverlayOpen.set(true);

    const portal = new TemplatePortal(this.overlayTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }
  private closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOverlayOpen.set(false);
    }
  }

  open() {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        this.openOverlay();
        await new Promise(resolve => setTimeout(resolve, 50));
        this.appRef.tick();
      });
      transition.finished.then(() => { // Wait for the transition to finish then start loading the iframe
        this.startIframeLoading();
      })
    } else {
      this.openOverlay();
      this.startIframeLoading();
    }
  }

  private close() {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        this.closeOverlay();
        this.appRef.tick();
      });
      transition.finished.then(() => { // Wait for the transition to finish then reset the iframe status
        this.resetIframe();
      });
    } else {
      this.closeOverlay();
      this.resetIframe();
    }
  }
  
  setCurrentIndex(index: number) {
    this.currentIndex.set(index);
    this.sanitizeCurrentUrl();
  }

  next() {
    if (this.currentIndex() < this.websites().length - 1) {
      this.setCurrentIndex(this.currentIndex() + 1);
    } else {
      this.setCurrentIndex(0);
    }
  }

  previous() {
    if (this.currentIndex() > 0) {
      this.setCurrentIndex(this.currentIndex() - 1);
    } else {
      this.setCurrentIndex(this.websites().length - 1);
    }
  }

  setIframeLoaded(loaded: boolean) {
    if(this.iframeRef) {
      this.iframe.update((state) => ({
        ...state,
        loaded: loaded
      }));
    }
  }

  startIframeLoading() {
    this.iframe.update((state) => ({
      ...state,
      startLoading: true
    }));
  }

  resetIframe() {
    this.iframe.set({
      startLoading: false,
      loaded: false
    });
  }
  
  private sanitizeCurrentUrl() {
    const url = this.websites()[this.currentIndex()].websiteUrl;
    // Adiciona timestamp para evitar cache
    const uniqueUrl = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
    this.sanitizedUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(uniqueUrl)
    );
  }

  handleIframeLoad() {
  // Verifica se o iframe realmente carregou o conteúdo
  setTimeout(() => {
    const iframe = document.querySelector('iframe');
    if (iframe?.contentDocument?.readyState === 'complete') {
      this.setIframeLoaded(true);
    } else {
      this.handleIframeLoad(); // Tenta novamente
    }
  }, 100);
}

}
