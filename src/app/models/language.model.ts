export interface LanguageApllication {
    navbar: {
        menu: {
            home: string;
            works: string;
            about: string;
        }
        contact: string;
    },
    main: {
        misc: string;
        title: string[];
        description: string;
        button1: string;
        button2: string;
    }
}

export const language_pt_br: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Trabalhos",
            about: "Sobre",
        },
        contact: "Entrar em contato",
    },
    main: {
        misc: "Desenvolvedor Angular",
        title: ["Olá, me chamo", "Eduardo", "Sou", "Desenvolvedor", "e", "Designer" ],
        description: "Desenvolvo sites modernos, rápidos e com design de impacto. Transformo ideias em páginas atraentes, funcionais e feitas para valorizar seu negócio. Se você precisa de uma landing page profissional, posso te ajudar a destacar sua marca na internet.",
        button1: "Ver trabalhos",
        button2: "Sobre Mim",
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
    },
    main: {
        misc: "Angular Developer",
        title: ["Hello, my name is", "Eduardo", "I'm", "Developer", "and", "Designer"],
        description: "I build modern, fast websites with clean, impactful design. I turn ideas into attractive, functional pages crafted to highlight and grow your business. If you need a professional landing page, I can help your brand stand out online with confidence.",
        button1: "See works",
        button2: "About me",
    }
}