import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostListener, input, signal } from "@angular/core";

@Component({
    selector: 'app-tech',
    host: {
        class: 'flex items-center justify-center p-2 rounded-2xl border border-neutral-800 transition-all group relative overflow-hidden'
    },
    template: `
    <span class="h-[50px] aspect-square transition-colors"
    style="mask: url('{{ iconUrl() }}') no-repeat center; mask-size: contain;"
    [ngStyle]="{ 'background-color': hovered() ?  hoveredColor() : 'hsla(0, 0%, 100%, 0.5)'  }"></span>
    <div class="absolute inset-[0] bg-neutral-600/5 backdrop-blur-xs opacity-0 
    group-hover:opacity-100 transition-all duration-300 ease-out flex justify-center items-center">
        <span class="scale-50 group-hover:scale-100 transition-transform cursor-default" aria-hidden="true">{{ title() }}</span>
    </div>
    `,
    imports: [NgStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechComponent {
    iconUrl = input('');
    title = input('');
    hoveredColor = input('hsla(0, 0%, 100%, 0.5)');
    // 
    hovered = signal(false);

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hovered.set(true);
    }
    @HostListener('mouseleave')
    onMouseLeave() {
        this.hovered.set(false);
    }
}