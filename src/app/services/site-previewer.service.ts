import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { inject, Injectable, signal, TemplateRef, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SitePreviewerService {
    private overlay = inject(Overlay);
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
            width: 'calc(100svw - 10rem)',
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