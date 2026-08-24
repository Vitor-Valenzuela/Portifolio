const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");


// FILTRO DOS PROJETOS

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        projects.forEach(project => {

            const tags =
                project.dataset.tags.split(" ");

            if (
                selected === "all" ||
                tags.includes(selected)
            ) {

                project.classList.remove("hidden");

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


// SCROLL SUAVE

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

                if (
                    window.innerWidth <= 900
                ) {

                    nav.classList.remove("mobile-open");

                }

            }
        );

    });


// MENU MOBILE

const menu =
    document.querySelector(".menu");

const nav =
    document.querySelector("nav");


menu.addEventListener(
    "click",
    () => {

        nav.classList.toggle(
            "mobile-open"
        );

        menu.textContent =
            nav.classList.contains("mobile-open")
                ? "✕"
                : "☰";

    }
);


// FECHAR MENU AO CLICAR

nav.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "mobile-open"
                );

                menu.textContent = "☰";

            }
        );

    });


// ANIMAÇÃO DOS PROJETOS

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


document
    .querySelectorAll(
        ".project, .tech-item, .timeline-item, .info-box, .mini-terminal, .featured-visual, .featured-info"
    )
    .forEach(element => {

        element.classList.add(
            "animate"
        );

        observer.observe(element);

    });


// EFEITO DO TERMINAL

const cursor =
    document.querySelector(".cursor");

if (cursor) {

    setInterval(() => {

        cursor.style.opacity =
            cursor.style.opacity === "0"
                ? "1"
                : "0";

    }, 500);

}


// TERMINAL DE COMANDOS (HERO) — EFEITO DE DIGITAÇÃO

const terminal =
    document.querySelector("#terminal-output");

if (terminal) {

    let lines = [];

    try {

        lines = JSON.parse(
            terminal.dataset.lines
        );

    } catch (error) {

        lines = [];

    }

    const typeLine = (line, container, callback) => {

        if (line.type === "gap") {

            const gap = document.createElement("p");
            gap.className = "gap";
            container.appendChild(gap);

            callback();
            return;

        }

        const p = document.createElement("p");

        if (line.type === "cmd") {

            const prompt = document.createElement("span");
            prompt.className = "prompt";
            prompt.textContent = "$";

            p.appendChild(prompt);

        } else {

            p.className =
                "out" + (line.highlight ? " highlight" : "");

        }

        const textSpan = document.createElement("span");
        p.appendChild(textSpan);

        container.appendChild(p);

        const text = line.text;
        let index = 0;

        const speed = line.type === "cmd" ? 45 : 18;

        const typeChar = () => {

            if (index <= text.length) {

                textSpan.textContent =
                    (line.type === "cmd" ? " " : "") +
                    text.slice(0, index);

                index++;

                setTimeout(typeChar, speed);

            } else {

                setTimeout(callback, 120);

            }

        };

        typeChar();

    };

    const runTerminal = (index) => {

        if (index >= lines.length) {

            const cursor = document.createElement("p");
            cursor.className = "cursor";
            cursor.textContent = "▋";

            terminal.appendChild(cursor);

            return;

        }

        typeLine(
            lines[index],
            terminal,
            () => runTerminal(index + 1)
        );

    };

    const terminalObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    runTerminal(0);

                    terminalObserver.disconnect();

                }

            });

        },
        { threshold: 0.3 }

    );

    terminalObserver.observe(terminal);

}


// GLITCH PERIÓDICO NO NOME EM DESTAQUE

const glitchTarget =
    document.querySelector("h1 span");

if (glitchTarget) {

    glitchTarget.dataset.text =
        glitchTarget.textContent;

    setInterval(() => {

        glitchTarget.classList.add("glitch");

        setTimeout(() => {

            glitchTarget.classList.remove("glitch");

        }, 260);

    }, 6000);

}


// CONTAGEM ANIMADA DOS NÚMEROS (STATS)

const statNumbers =
    document.querySelectorAll(".stat strong");

if (statNumbers.length) {

    const animateNumber = (element) => {

        const raw = element.textContent.trim();
        const match = raw.match(/\d+/);

        if (!match) {
            return;
        }

        const target = parseInt(match[0], 10);
        const suffix = raw.replace(match[0], "");

        let current = 0;

        const step = Math.max(
            1,
            Math.round(target / 30)
        );

        const update = () => {

            current += step;

            if (current >= target) {

                element.textContent = target + suffix;
                return;

            }

            element.textContent = current + suffix;

            requestAnimationFrame(update);

        };

        update();

    };

    const statsObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateNumber(entry.target);

                    statsObserver.unobserve(entry.target);

                }

            });

        },
        { threshold: 0.5 }

    );

    statNumbers.forEach(element => {

        statsObserver.observe(element);

    });

}


// FORMULÁRIO DE CONTATO

const contactForm =
    document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const data = new FormData(contactForm);

        const nome = data.get("nome") || "";
        const email = data.get("email") || "";
        const mensagem = data.get("mensagem") || "";

        const subject =
            encodeURIComponent(
                `Contato via portfólio — ${nome}`
            );

        const body =
            encodeURIComponent(
                `${mensagem}\n\n—\n${nome}\n${email}`
            );

        window.location.href =
            `mailto:vitoralex0412@gmail.com?subject=${subject}&body=${body}`;

    });

}


// ANO AUTOMÁTICO NO FOOTER

const footerYear =
    document.querySelector("footer");

if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.innerHTML =
        footerYear.innerHTML.replace(
            "2026",
            currentYear
        );

}