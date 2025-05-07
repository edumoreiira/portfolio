import { Component } from "@angular/core";

@Component({
    selector: 'app-navbar',
    imports: [],
    host: {
        class: 'flex items-center justify-between py-3 px-4 sm:px-8 lg:px-12 gap-6 backdrop-blur bg-neutral-950/50 sticky top-0 w-full z-20'
    },
    template: `
    <span class="text-xl font-medium font-[Kanit]">[edumoreira]</span>
    <nav>
        <ul class="flex items-center gap-4">
            <li><a href="#">Home</a></li>
            <li><a href="#">Trabalhos</a></li>
            <li><a href="#">Sobre</a></li>
        </ul>
    </nav>
    <button class="px-4 py-2 rounded-xl border border-neutral-700 min-w-fit">
        Entrar em contato
    </button>
    `
})
export class NavbarComponent {

}