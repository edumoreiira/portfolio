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
    },
    works: {
        title: string;
        description: string;
        accordions: { title: string; description: string; button: string }[];
        previewer: {
            techsHeader: string;
            loading: string;
        }
    },
    advantages: {
        title: string,
        items: { title: string, description: string }[];
    },
    techs: {
        title: string;
        year: string;
        misc: string;
    },
    cta: {
        title: string[];
        description: string;
        button: string;
    },
    footer: {
        copyright: string;
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
        title: ["Olá, me chamo", "Eduardo", "sou", "Desenvolvedor", "e", "Designer" ],
        description: "Desenvolvo sites modernos, rápidos e com design de impacto. Transformo ideias em páginas atraentes, funcionais e feitas para valorizar seu negócio. Se você precisa de uma landing page profissional, posso te ajudar a destacar sua marca na internet.",
        button1: "Ver trabalhos",
        button2: "Sobre Mim",
    },
    works: {
        title: "Meus Trabalhos",
        description: "Aqui estão alguns dos meus projetos mais recentes. Cada um deles foi desenvolvido com atenção aos detalhes e foco na experiência do usuário.",
        accordions: [
            {
                title: "Bera Pools",
                description: "Landing page desenvolvida para Bera Pools, um projeto de portfólio e gerenciamento de carteiras Web3 na rede Berachain.",
                button: "Visitar Website"
            },
            {
                title: "Experience Life",
                description: "Experience-Life foi um site desenvolvido para uma comunidade online de GTA San Andreas, conta com um sistema de login, doações e painel de usuário.",
                button: "Visitar Website"
            },
            {
                title: "Aju Films",
                description: "Website desenvolvido para a Aju Films, empresa de aplicação de película residencial.",
                button: "Visitar Website"
            }
        ],
        previewer: {
            techsHeader: "Tecnologias:",
            loading: "Carregando website"
        }
    },
    advantages: {
        title: "Por que me escolher?",
        items: [ 
            {
                title: "Entrega rápida",
                description: "Normalmente entrego antes do prazo final, e nunca após ele."
            },
            {
                title: "Design que vende",
                description: "Sites pensados para chamar atenção e converter visitantes em clientes."
            },
            {
                title: "Totalmente responsivo",
                description: "Seu site funciona perfeitamente em celulares, tablets e computadores."
            },
            {
                title: "Atendimento personalizado",
                description: "Você fala direto comigo, sem intermediários. Escuto suas ideias e explico tudo com clareza."
            },
            {
                title: "Seu site no Google",
                description: "O site é construído com técnicas de SEO que facilitam sua aparição nos resultados de busca, aumentando a visibilidade e atraindo mais visitantes de forma orgânica."
            }
        ]
    },
    techs: {
        title: "Tecnologias que eu domino",
        year: "2025",
        misc: "Eduardo Moreira"
    },
    cta: {
        title: ["Seu site nas mãos de quem tem o" , "molho", "do design" ],
        description: "Uni experiência em design com conhecimento em programação para criar páginas que chamam atenção, passam confiança e ajudam seu negócio a crescer. Bora dar vida ao seu site?",
        button: "Vamos lá!"
    },
    footer: {
        copyright: "Desenvolvido com carinho e café por mim © 2025"
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
    },
    works: {
        title: "My Works",
        description: "Here are some of my latest projects. Each one was developed with attention to detail and a focus on user experience.",
        accordions: [
            {
                title: "Bera Pools",
                description: "Landing page developed for Bera Pools, a portfolio and Web3 wallet management project on the Berachain network.",
                button: "Visit Website"
            },
            {
                title: "Experience Life",
                description: "Experience-Life was a website developed for an online GTA San Andreas community, featuring a login system, donations, and user panel.",
                button: "Visit Website"
            },
            {
                title: "Aju Films",
                description: "Website developed for Aju Films, a residential film application company.",
                button: "Visit Website"
            }
        ],
        previewer: {
            techsHeader: "Technologies:",
            loading: "Loading website"
        }
    },
    advantages: {
        title: "Why choose me?",
        items: [
            {
                title: "Fast delivery",
                description: "Usually I deliver before the deadline, and never after it."
            },
            {
                title: "Design that sells",
                description: "Websites designed to attract attention and convert visitors into customers."
            },
            {
                title: "Fully responsive",
                description: "Your website works perfectly on mobile phones, tablets, and computers."
            },
            {
                title: "Personalized service",
                description: "You talk directly to me, with no intermediaries. I listen to your ideas and explain everything clearly."
            },
            {
                title: "Your site on Google",
                description: "The site is built with SEO techniques that make it easier to appear in search results, increasing visibility and attracting more visitors organically."
            }
        ]
    },
    techs: {
        title: "Technologies I'm skilled at",
        year: "2025",
        misc: "Eduardo Moreira"
    },
    cta: {
        title: ["Your site with a dash of design", "sauce", "expertise" ],
        description: "I combine design experience with programming skills to create pages that grab attention, build trust, and help your business grow. Ready to bring your site to life?",
        button: "Let's go!"
    },
    footer: {
        copyright: "Developed with love and coffee by me © 2025"
    }
    

}