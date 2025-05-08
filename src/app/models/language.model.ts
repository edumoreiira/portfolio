export interface LanguageApllication {
    navbar: {
        menu: {
            home: string;
            works: string;
            about: string;
        }
        contact: string;
    }
}

export const language_pt_br: LanguageApllication = {
    navbar: {
        menu: {
            home: "Início",
            works: "Trabalhos",
            about: "Sobre",
        },
        contact: "Entrar em contato",
    }
}

export const language_en_us: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Works",
            about: "About",
        },
        contact: "Contact me",
    }
}