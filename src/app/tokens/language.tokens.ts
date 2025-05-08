import { FactoryProvider, InjectionToken, signal, Signal } from "@angular/core";
import { LanguageApllication, language_pt_br } from "../models/language.model";
import { LanguageService } from "../services/language.service";

export const LANGUAGE_APPLICATION = new InjectionToken<Signal<LanguageApllication>>('language-application', {
    factory: () => signal<LanguageApllication>(language_pt_br)
});

export const provideLanguage = (): FactoryProvider => {
    return {
        provide: LANGUAGE_APPLICATION,
        useFactory: (languageService: LanguageService) => languageService.$currentLanguage,
        deps: [LanguageService]
    };
}