import { Component, input } from "@angular/core";

@Component({
    selector: 'app-tech',
    host: {
        class: 'flex items-center justify-center p-2 rounded-2xl border border-neutral-800 '
    },
    template: `
    <span class="h-[50px] aspect-square bg-white/50"
    style="mask: url('{{ iconUrl() }}') no-repeat center; mask-size: contain;"></span>
    `,
})
export class TechComponent {
    iconUrl = input('');

}