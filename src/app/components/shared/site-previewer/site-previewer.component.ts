import { ApplicationRef, Component, inject, input, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgStyle } from '@angular/common';
import { createAnimation } from '../../../animations/default-transitions.animations';

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
export class SitePreviewerComponent {
  private appRef = inject(ApplicationRef);
  isOverlayOpen = signal(false);
  websites = input.required<WebSites[]>();
  protected currentIndex = signal(0);
  private overlayRef: OverlayRef | null = null;
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  iframe = signal({
    startLoading: false,
    loaded: false
  });

  private openOverlay() {
    console.log("x")
    if(this.overlayRef) {
      return;
    }
    console.log("open")
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

  next() {
    if (this.currentIndex() < this.websites().length - 1) {
      this.currentIndex.update((index) => index + 1);
    } else {
      this.currentIndex.set(0);
    }
  }


  previous() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((index) => index - 1);
    } else {
      this.currentIndex.set(this.websites().length - 1);
    }
  }

  setIframeLoaded(loaded: boolean) {
    this.iframe.update((state) => ({
      ...state,
      loaded: loaded
    }));
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
  
}
