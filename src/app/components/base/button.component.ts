import { ChangeDetectionStrategy, Component, HostBinding, input } from "@angular/core";

@Component({
    selector: "button[custom-btn]",
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    variant = input<"contained" | "outline">("contained");

    private contained = 
    "bg-neutral-50 rounded-xl text-neutral-950 font-semibold shadow-[0_0_25px_2px] shadow-white/20 " +
    "hover:bg-neutral-300 transition-colors"

    private outline = "border border-neutral-800 rounded-xl text-neutral-50 " +
    "hover:bg-neutral-800/15 hover:border-neutral-600 hover:text-white transition-colors"

    @HostBinding("class")
    get variantClasses() {
        return `${ this[this.variant()] }`;
    }
}