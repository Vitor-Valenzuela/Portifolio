/* =========================================
   TEMA
========================================= */

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeToggleLarge = document.querySelector("#themeToggleLarge");

const savedTheme = localStorage.getItem("portfolio-theme");

/*
    Tema padrão:
    - Se não existir preferência, inicia no escuro.
    - Se existir preferência, utiliza a salva.
*/

if (savedTheme === "light") {

    root.removeAttribute("data-theme");

} else {

    root.setAttribute("data-theme", "dark");

}


/* Atualiza o ícone do botão */

function updateThemeIcon() {

    const isDark =
        root.getAttribute("data-theme") === "dark";

    const icon = isDark ? "☀" : "☾";

    if (themeToggle) {
        themeToggle.textContent = icon;
    }

    if (themeToggleLarge) {
        themeToggleLarge.textContent = icon;
    }

}


/* Alternar tema */

function toggleTheme() {

    const isDark =
        root.getAttribute("data-theme") === "dark";


    if (isDark) {

        root.removeAttribute("data-theme");

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        root.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    }


    updateThemeIcon();

}


/* Inicializa o ícone */

updateThemeIcon();


/* Botão pequeno */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* Botão grande, caso exista */

if (themeToggleLarge) {

    themeToggleLarge.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================
   MENU MOBILE
========================================= */

const mobileMenu =
    document.querySelector("#mobileMenu");

const sidebar =
    document.querySelector(".sidebar");


if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );


    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }
        );

    });

}


/* =========================================
   HORÁRIO
========================================= */

function updateTime() {

    const element =
        document.querySelector("#currentTime");


    if (!element) {
        return;
    }


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    element.textContent =
        time;

}


updateTime();


setInterval(
    updateTime,
    1000
);


/* =========================================
   ANO AUTOMÁTICO
========================================= */

const year =
    document.querySelector("#year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   FILTRO DE PROJETOS
========================================= */

const filters =
    document.querySelectorAll(".filter");


const projectCards =
    document.querySelectorAll(".project-card");


if (filters.length > 0) {

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {


                /* Remove ativo */

                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });


                /* Ativa filtro selecionado */

                filter.classList.add(
                    "active"
                );


                const selected =
                    filter.dataset.filter;


                /* Filtra projetos */

                projectCards.forEach(project => {

                    const tags =
                        project.dataset.tags || "";


                    if (
                        selected === "all" ||
                        tags.includes(selected)
                    ) {

                        project.classList.remove(
                            "hidden"
                        );

                    } else {

                        project.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });

}


/* =========================================
   FORMULÁRIO DE CONTATO
========================================= */

const contactForm =
    document.querySelector("#contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const data =
                new FormData(contactForm);


            const nome =
                data.get("nome") || "";


            const email =
                data.get("email") || "";


            const mensagem =
                data.get("mensagem") || "";


            const subject =
                encodeURIComponent(
                    `Contato via portfólio - ${nome}`
                );


            const body =
                encodeURIComponent(
                    `${mensagem}\n\nNome: ${nome}\nEmail: ${email}`
                );


            window.location.href =
                `mailto:vitoralex0412@gmail.com?subject=${subject}&body=${body}`;

        }
    );

}


/* =========================================
   ANIMAÇÃO DE ENTRADA
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".panel, .stat-card, .project-card, .tech-card, .timeline-card, .contact-card"
    );


if (
    animatedElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    animatedElements.forEach(element => {

        element.style.opacity =
            "0";


        element.style.transform =
            "translateY(12px)";


        element.style.transition =
            "opacity .5s ease, transform .5s ease";


        observer.observe(
            element
        );

    });

}


/* =========================================
   FECHAR SIDEBAR AO CLICAR FORA
========================================= */

document.addEventListener(
    "click",
    event => {


        if (
            window.innerWidth > 800 ||
            !sidebar ||
            !mobileMenu
        ) {

            return;

        }


        if (
            sidebar.contains(event.target) ||
            mobileMenu.contains(event.target)
        ) {

            return;

        }


        sidebar.classList.remove(
            "mobile-open"
        );

    }
);