import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, signal } from "@angular/core";
import { LANGUAGE_APPLICATION } from "../../../tokens/language.tokens";
import { LanguageService } from "../../../services/language.service";
import { language_en_us, language_pt_br } from "../../../models/language.model";
import { DropdownListOptions, DropdownSelectionComponent } from "../../shared/dropdown-selection/dropdown-selection.component";
import { createAnimation } from "../../../animations/default-transitions.animations";
import { ButtonComponent } from "../../base/button.component";
import { DocumentListenerService } from "../../../services/document-listener.service";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-navbar',
    imports: [DropdownSelectionComponent, ButtonComponent, NgClass],
    host: {
        class: 'flex items-center justify-between py-3 px-4 sm:px-8 lg:px-12 gap-6 backdrop-blur bg-neutral-950/80 sticky top-0 w-full z-20 relative'
    },
    template: `
    <span class="font-medium font-[Kanit] cursor-default transition-all"
    [ngClass]="scrollFromTop() > 100 ? 'text-2xl lg:text-xl' : 'text-[1.6rem]'">[edumoreira]</span>
    
    @if((isNavbarExpanded() === true && screenWidth() <= 640) || screenWidth() > 640) {
        <nav class="sm:static absolute max-w-[calc(100%-1.5rem)] right-0 top-full sm:py-0 sm:px-0 py-6 px-8 sm:bg-transparent bg-neutral-950/95 
        sm:rounded-none rounded-bl-2xl sm:border-none border-l border-b border-neutral-700/50 overflow-hidden z-10" @slideNavbar>
            <ul class="flex sm:items-center sm:gap-8 gap-6 flex-col sm:flex-row text-neutral-200 font-semibold">

                <li><button [attr.aria-label]="'Go to ' + nav().menu.home" class="cursor-pointer sm:p-0 p-1 hover:text-white transition-colors" tabIndex="0"
                (click)="scrollTo('home')"
                (keydown)="onAnchorKeydown($event, 'home')"> {{ nav().menu.home }} </button></li>

                <li><button [attr.aria-label]="'Go to ' + nav().menu.works" class="cursor-pointer sm:p-0 p-1 hover:text-white transition-colors" tabIndex="0"
                (click)="scrollTo('my-works')"
                (keydown)="onAnchorKeydown($event, 'my-works')"> {{ nav().menu.works }} </button></li>

                <li><button [attr.aria-label]="'Go to ' + nav().menu.techs" class="cursor-pointer sm:p-0 p-1 hover:text-white transition-colors" tabIndex="0"
                (click)="scrollTo('techs')"
                (keydown)="onAnchorKeydown($event, 'techs')"> {{ nav().menu.techs }} </button></li>
                <li>

                <button custom-btn variant="outline"
                class="px-4 py-2 rounded-xl sm:hidden block bg-neutral-950"
                (click)="scrollTo('contact')">
                {{ nav().contact }}
                </button>
                </li>
            </ul>
        </nav>
    }

    <div class="flex items-center gap-6 sm:gap-4">
        <dropdown-selection 
        [items]="languageDropdownList()" 
        dropdownId="languageList"
        class="text-[.95rem]"
        (clickedItem)="changeLanguage($event.value)"
        >
            <span class="sr-only">Change language</span>
            <i class="fi fi-rr-language-exchange flex text-3xl sm:text-2xl hover:text-neutral-300 transition-colors"></i>
        </dropdown-selection>
        <button custom-btn variant="outline" class="px-4 py-2 hidden sm:block"
        (click)="scrollTo('contact')">
            {{ nav().contact }}
        </button>

        <!-- hamburger button -->
        <button custom-btn variant="outline" class="sm:hidden flex items-center justify-center text-xl h-[3rem] w-[3rem] flex-col rounded-xl"
        [attr.aria-expanded]="isNavbarExpanded()"
        aria-label="Toggle navigation"
        (click)="toggleNavbar()"
        >   
            @if(isNavbarExpanded() === true) {
                <i class="fi fi-rr-cross-small flex" @fadeInOut></i>
            } @else {
                <i class="fi fi-rr-bars-sort flex" @fadeInOut></i>
            }
        </button>
    </div>
    `,
    animations: [
        createAnimation('slideNavbar', { animateY: true, opacity: '0' }),
        createAnimation('fadeInOut', { opacity: '0', animateY: true, })
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    private languageService = inject(LanguageService);
    private language = inject(LANGUAGE_APPLICATION);
    private documentListener = inject(DocumentListenerService);
    // 
    protected nav = computed(() => this.language().navbar);
    screenWidth = computed(() => this.documentListener.screenSize$());
    scrollFromTop = computed(() => this.documentListener.scrollFromTop$());
    isNavbarExpanded = signal(false);
    languageDropdownList = computed<DropdownListOptions[]>(() => [
        { name: 'Português', value: 'pt_br', isActive: this.languageService.$currentLanguage() === language_pt_br },
        { name: 'English', value: 'en_us', isActive: this.languageService.$currentLanguage() === language_en_us },
    ]);

    changeLanguage(language: 'pt_br' | 'en_us') {
        this.languageService.setLanguage(language);
    }

    toggleNavbar() {
        this.isNavbarExpanded.set(!this.isNavbarExpanded());
    }

    scrollTo(id: string) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    onAnchorKeydown(event: KeyboardEvent, idToScroll: string) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.scrollTo(idToScroll);
        }
    }
}