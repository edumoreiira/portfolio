import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, signal } from "@angular/core";
import { LANGUAGE_APPLICATION } from "../../../tokens/language.tokens";
import { LanguageService } from "../../../services/language.service";
import { language_en_us, language_pt_br } from "../../../models/language.model";
import { DropdownListOptions, DropdownSelectionComponent } from "../../shared/dropdown-selection/dropdown-selection.component";
import { createAnimation } from "../../../animations/default-transitions.animations";

@Component({
    selector: 'app-navbar',
    imports: [DropdownSelectionComponent],
    host: {
        class: 'flex items-center justify-between py-3 px-4 sm:px-8 lg:px-12 gap-6 backdrop-blur bg-neutral-950/50 sticky top-0 w-full z-20 relative'
    },
    template: `
    <span class="text-xl font-medium font-[Kanit]">[edumoreira]</span>
    
    @if((isNavbarExpanded() === true && screenWidth() <= 640) || screenWidth() > 640) {
        <nav class="sm:static absolute max-w-[calc(100%-1.5rem)] right-0 top-full sm:py-0 sm:px-0 py-6 px-8 sm:bg-transparent bg-neutral-950/50 sm:backdrop-blur-none backdrop-blur 
        sm:rounded-none rounded-bl-2xl sm:border-none border-l border-b border-neutral-700/50 overflow-hidden z-10" @slideNavbar>
            <ul class="flex sm:items-center sm:gap-8 gap-6 flex-col sm:flex-row ">
                <li><a class="sm:p-0 p-1" href="#"> {{ nav().menu.home }} </a></li>
                <li><a class="sm:p-0 p-1" href="#"> {{ nav().menu.works }} </a></li>
                <li><a class="sm:p-0 p-1" href="#"> {{ nav().menu.about }} </a></li>
                <li>
                <button class="px-4 py-2 rounded-xl border border-neutral-700 min-w-fit sm:hidden block">
                {{ nav().contact }}
                </button>
                </li>
            </ul>
        </nav>
    }

    <div class="flex items-center gap-4">
        <dropdown-selection 
        [items]="languageDropdownList()" 
        dropdownId="languageList"
        class="text-[.95rem]"
        (clickedItem)="changeLanguage($event.value)"
        >
            <i class="fi fi-rr-language-exchange flex text-2xl hover:text-neutral-300 transition-colors"></i>
        </dropdown-selection>
        <button class="px-4 py-2 rounded-xl border border-neutral-700 min-w-fit hidden sm:block">
            {{ nav().contact }}
        </button>

        <!-- hamburger button -->
        <button class="sm:hidden flex items-center justify-center h-[2.4rem] w-[2.4rem] flex-col rounded-xl border border-neutral-700 
        hover:bg-neutral-700/15 hover:border-neutral-500 hover:text-white transition-colors"
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
export class NavbarComponent implements OnInit {
    private languageService = inject(LanguageService);
    private language = inject(LANGUAGE_APPLICATION);
    protected nav = computed(() => this.language().navbar);
    screenWidth = signal<number>(0);
    isNavbarExpanded = signal(false);
    languageDropdownList = computed<DropdownListOptions[]>(() => [
        { name: 'Português', value: 'pt_br', isActive: this.languageService.$currentLanguage() === language_pt_br },
        { name: 'English', value: 'en_us', isActive: this.languageService.$currentLanguage() === language_en_us },
    ]);

    ngOnInit() {
        this.updateScreenSize();
    }

    changeLanguage(language: 'pt_br' | 'en_us') {
        this.languageService.setLanguage(language);
    }
    
    updateScreenSize() {
        if(typeof window !== 'undefined') {
            this.screenWidth.set(window.innerWidth);
        }
    }

    toggleNavbar() {
        this.isNavbarExpanded.set(!this.isNavbarExpanded());
    }
    @HostListener('window:resize', [])
    onResize() {
        this.updateScreenSize();
    }
}