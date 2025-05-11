import { ApplicationRef, Component, inject, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-site-previewer',
  imports: [],
  templateUrl: './site-previewer.component.html',
  styleUrl: './site-previewer.component.scss'
})
export class SitePreviewerComponent {
  private appRef = inject(ApplicationRef);
  isOverlayOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

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
      document.startViewTransition(async () => {
        this.openOverlay();
        await new Promise(resolve => setTimeout(resolve, 50));
        this.appRef.tick();
      });
    } else {
      this.openOverlay();
    }
  }

  private close() {
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        this.closeOverlay();
        this.appRef.tick();
      });
    } else {
      this.closeOverlay();
    }
  }
  
  
}
