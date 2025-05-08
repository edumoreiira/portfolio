import { Injectable, Renderer2, RendererFactory2, Signal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DocumentListenerService {
    private renderer: Renderer2;
    private eventSignal = signal<MouseEvent | KeyboardEvent | null>(null);

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.registerClickEventListener();
        this.registerKeyboardEventListener();
    }
    
    private registerClickEventListener() {
        this.renderer.listen('document', 'click', (event: MouseEvent) => {
            this.eventSignal.set(event);
        })
    }

    private registerKeyboardEventListener() {
        this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
            this.eventSignal.set(event);
        })
    }

    get event$(): Signal<MouseEvent | KeyboardEvent | null> {
        return this.eventSignal.asReadonly();
    }
}