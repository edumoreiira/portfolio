import { Injectable, signal } from "@angular/core";
import { language_en_us, LanguageApllication, language_pt_br } from "../models/language.model";

@Injectable({
    providedIn: 'root'

}) export class LanguageService {
    private currentLanguage = signal<LanguageApllication>(language_pt_br);
    public $currentLanguage = this.currentLanguage.asReadonly();

    setLanguage(language: 'pt_br' | 'en_us') {
        this.currentLanguage.set(language === 'pt_br' ? language_pt_br : language_en_us);
    }
}