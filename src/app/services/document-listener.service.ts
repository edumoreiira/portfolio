import { Injectable, Renderer2, RendererFactory2, Signal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DocumentListenerService {
    private renderer: Renderer2;
    private eventSignal = signal<MouseEvent | KeyboardEvent | null>(null);
    get event$(): Signal<MouseEvent | KeyboardEvent | null> {
        return this.eventSignal.asReadonly();
    }
    private screenSize = signal(0);
    screenSize$ = this.screenSize.asReadonly();
    
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.registerClickEventListener();
        this.registerKeyboardEventListener();
        this.registerScreenResizeListener();
        this.updateScreenSize();
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

    private registerScreenResizeListener() {
        this.renderer.listen('window', 'resize', () => {
            this.updateScreenSize();
        })
    }

    updateScreenSize() {
        if(typeof window !== 'undefined') {
            this.screenSize.set(window.innerWidth);
        }
    }

}