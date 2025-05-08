import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { LANGUAGE_APPLICATION, provideLanguage } from "../../../tokens/language.tokens";
import { LanguageService } from "../../../services/language.service";
import { language_en_us, language_pt_br } from "../../../models/language.model";
import { DropdownListOptions, DropdownSelectionComponent } from "../../shared/dropdown-selection/dropdown-selection.component";

@Component({
    selector: 'app-navbar',
    imports: [DropdownSelectionComponent],
    host: {
        class: 'flex items-center justify-between py-3 px-4 sm:px-8 lg:px-12 gap-6 backdrop-blur bg-neutral-950/50 sticky top-0 w-full z-20'
    },
    template: `
    <span class="text-xl font-medium font-[Kanit]">[edumoreira]</span>
    <nav>
        <ul class="flex items-center gap-4">
            <li><a href="#"> {{ nav().menu.home }} </a></li>
            <li><a href="#"> {{ nav().menu.works }} </a></li>
            <li><a href="#"> {{ nav().menu.about }} </a></li>
        </ul>
    </nav>
    <div class="flex items-center gap-4">
        <dropdown-selection 
        [items]="languageDropdownList()" 
        dropdownId="languageList"
        class="text-[.95rem]"
        (clickedItem)="changeLanguage($event.value)"
        >
            <i class="fi fi-rr-language-exchange flex text-2xl hover:text-neutral-300 transition-colors"></i>
        </dropdown-selection>
        <button class="px-4 py-2 rounded-xl border border-neutral-700 min-w-fit">
            {{ nav().contact }}
        </button>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    private languageService = inject(LanguageService);
    private language = inject(LANGUAGE_APPLICATION);
    protected nav = computed(() => this.language().navbar);

    languageDropdownList = computed<DropdownListOptions[]>(() => [
        { name: 'Português', value: 'pt_br', isActive: this.languageService.$currentLanguage() === language_pt_br },
        { name: 'English', value: 'en_us', isActive: this.languageService.$currentLanguage() === language_en_us },
    ]);

    changeLanguage(language: 'pt_br' | 'en_us') {
        this.languageService.setLanguage(language);
    }
    
}