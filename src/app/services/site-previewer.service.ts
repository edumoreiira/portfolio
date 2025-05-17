import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { inject, Injectable, signal, TemplateRef, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentListenerService } from "./document-listener.service";

@Injectable({
    providedIn: 'root'
})
export class SitePreviewerService {
    private overlay = inject(Overlay);
    private dls = inject(DocumentListenerService);
    // 
    private overlayRef: OverlayRef | null = null;
    private isOverlayOpen = signal(false);
    private currentIndex = signal(0);
    // 
    public isOverlayOpen$ = this.isOverlayOpen.asReadonly();
    public currentIndex$ = this.currentIndex.asReadonly();
    
    setCurrentIndex(index: number) {
        this.currentIndex.set(index);
    }
    
    openOverlay(template: TemplateRef<any>, viewContainerRef: ViewContainerRef): OverlayRef | void {
        if (this.overlayRef) {
            return;
        }
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            height: 'calc(100svh - 4rem)',
            width: this.dls.screenSize$() > 1280 ? 'calc(100svw - 10rem)' : this.dls.screenSize$() > 640 ? 'calc(100svw - 3rem)' : 'calc(100svw - 1rem)',
            backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .bottom('0')
        });
        this.isOverlayOpen.set(true);
        this.overlayRef.attach(new TemplatePortal(template, viewContainerRef));
        return this.overlayRef
    }

    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.isOverlayOpen.set(false);
        }
    }
}