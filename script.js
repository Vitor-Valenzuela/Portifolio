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


// PROJECT REEL — carrossel cinematográfico (adaptação vanilla)

(() => {

    const stage = document.querySelector("#reel-stage");

    if (!stage) {
        return;
    }

    const strip = document.querySelector("#reel-strip");
    const cards = Array.from(
        document.querySelectorAll(".reel-card")
    );
    const titleEl = document.querySelector("#reel-title");
    const creditEl = document.querySelector("#reel-credit");
    const metaEl = document.querySelector("#reel-meta");
    const bgColor = document.querySelector("#reel-bg-color");
    const currentEl = document.querySelector("#reel-current");
    const totalEl = document.querySelector("#reel-total");
    const railFill = document.querySelector("#reel-rail-fill");

    const SLIDES = [
        {
            title: "Sistema de\nPonto Eletrônico",
            credit: "SISTEMA • SOFTWARE",
            meta: ["WEB", "BANCO DE DADOS", "AUTENTICAÇÃO"],
            accent: "#a7ff3f"
        },
        {
            title: "DataAnalyzer\nPro",
            credit: "SOFTWARE • DADOS",
            meta: ["PYTHON", "PANDAS", "PLOTLY"],
            accent: "#b58cff"
        },
        {
            title: "Automação de\nIrrigação Agrícola",
            credit: "AUTOMAÇÃO • IOT",
            meta: ["ESP32", "C/C++", "SUPABASE"],
            accent: "#4be3c0"
        },
        {
            title: "Modelagem de\nBanco de Dados",
            credit: "BANCO DE DADOS • ACADÊMICO",
            meta: ["SQL", "MYSQL", "MODELAGEM"],
            accent: "#67b7ff"
        },
        {
            title: "MUARQ\nMuseu Digital",
            credit: "WEB • DESIGN",
            meta: ["HTML", "CSS", "JAVASCRIPT"],
            accent: "#d68a4b"
        },
        {
            title: "Logística Reversa\nde Baterias",
            credit: "SUSTENTABILIDADE • ACADÊMICO",
            meta: ["ODS", "RECICLAGEM", "PESQUISA"],
            accent: "#5fe37f"
        },
        {
            title: "Envelhecer nos\nTerritórios",
            credit: "PROJETO ACADÊMICO • UFMS",
            meta: ["UFMS", "PESQUISA", "DADOS"],
            accent: "#83a9c9"
        }
    ];

    const last = SLIDES.length - 1;
    let index = 0;
    let dragging = false;

    if (totalEl) {

        totalEl.textContent =
            String(SLIDES.length).padStart(2, "0");

    }

    const stripWrap = document.querySelector(".reel-strip-wrap");

    const cardWidth = () =>
        cards[0] ? cards[0].getBoundingClientRect().width : 0;

    const gapWidth = () => {

        if (cards.length < 2) {
            return 0;
        }

        return (
            cards[1].getBoundingClientRect().left -
            cards[0].getBoundingClientRect().right
        );

    };

    const center = (i) => {

        const wrapWidth = stripWrap.getBoundingClientRect().width;
        const w = cardWidth();
        const gap = gapWidth();
        const step = w + gap;

        return wrapWidth / 2 - (i * step + w / 2);

    };

    const renderTitle = (raw) => {

        titleEl.innerHTML = "";

        raw.split("\n").forEach((line, i) => {

            const mask = document.createElement("span");
            mask.className = "reel-line-mask";

            const span = document.createElement("span");
            span.className = "reel-line";
            span.textContent = line;
            span.style.animationDelay = `${i * 0.08}s`;

            mask.appendChild(span);
            titleEl.appendChild(mask);

        });

    };

    const renderMeta = (facts) => {

        metaEl.innerHTML = "";

        facts.forEach(fact => {

            const span = document.createElement("span");
            span.textContent = fact;

            metaEl.appendChild(span);

        });

    };

    const render = () => {

        const slide = SLIDES[index];

        renderTitle(slide.title);

        creditEl.textContent = slide.credit;

        renderMeta(slide.meta);

        bgColor.style.backgroundColor = slide.accent;

        cards.forEach((card, i) => {

            card.classList.toggle(
                "is-active",
                i === index
            );

            card.setAttribute(
                "aria-current",
                i === index ? "true" : "false"
            );

        });

        if (currentEl) {

            currentEl.textContent =
                String(index + 1).padStart(2, "0");

        }

        if (railFill) {

            railFill.style.left =
                `${(index / SLIDES.length) * 100}%`;

        }

        requestAnimationFrame(() => {

            strip.style.transform =
                `translateX(${center(index)}px)`;

        });

    };

    const clampIndex = (n) =>
        Math.min(last, Math.max(0, n));

    const goTo = (n) => {

        index = clampIndex(n);

        render();

    };

    cards.forEach((card, i) => {

        card.addEventListener("click", () => {

            goTo(i);

        });

    });

    stage.addEventListener("keydown", (event) => {

        const map = {
            ArrowLeft: index - 1,
            ArrowRight: index + 1,
            Home: 0,
            End: last
        };

        if (!(event.key in map)) {
            return;
        }

        event.preventDefault();

        goTo(map[event.key]);

    });


    // ARRASTAR (mouse / touch)

    let startX = 0;
    let startTranslate = 0;
    let movedEnough = false;
    let pointerActive = false;
    let suppressClick = false;

    const DRAG_THRESHOLD = 6;

    const onPointerDown = (event) => {

        pointerActive = true;
        startX = event.clientX;
        startTranslate = center(index);
        movedEnough = false;

    };

    const onPointerMove = (event) => {

        if (!pointerActive) {
            return;
        }

        const delta = event.clientX - startX;

        if (!movedEnough) {

            if (Math.abs(delta) < DRAG_THRESHOLD) {
                return;
            }

            movedEnough = true;
            dragging = true;

            strip.classList.add("dragging");

        }

        strip.style.transform =
            `translateX(${startTranslate + delta}px)`;

    };

    const onPointerUp = (event) => {

        pointerActive = false;

        if (!dragging) {
            return;
        }

        dragging = false;

        strip.classList.remove("dragging");

        // A card sob o cursor se move junto com o arraste, então o
        // clique nativo que o navegador dispara em seguida ainda cairia
        // sobre ela. Suprime esse clique fantasma.
        suppressClick = true;

        const delta = event.clientX - startX;

        if (Math.abs(delta) > 40) {

            goTo(index - Math.sign(delta));

        } else {

            render();

        }

    };

    strip.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    strip.addEventListener("click", (event) => {

        if (suppressClick) {

            event.stopPropagation();
            event.preventDefault();

            suppressClick = false;

        }

    }, true);


    // RODA DO MOUSE / TRACKPAD

    let acc = 0;
    let cooldownUntil = 0;

    stage.addEventListener("wheel", (event) => {

        const delta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.deltaY;

        const stuck =
            (delta > 0 && index === last) ||
            (delta < 0 && index === 0);

        if (stuck) {

            acc = 0;
            return;

        }

        event.preventDefault();

        const now = event.timeStamp;

        if (now < cooldownUntil) {
            return;
        }

        acc += delta;

        if (Math.abs(acc) < 55) {
            return;
        }

        goTo(index + Math.sign(acc));

        acc = 0;
        cooldownUntil = now + 420;

    }, { passive: false });


    // RESIZE — recentraliza o card ativo

    window.addEventListener("resize", () => {

        strip.style.transition = "none";

        render();

        requestAnimationFrame(() => {

            strip.style.transition = "";

        });

    });


    render();

})();


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
