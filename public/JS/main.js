document.addEventListener("DOMContentLoaded", () => {

    /* ------------------- VARIABLES GLOBALES ------------------- */
    const heroText = document.getElementById("heroText");
    const discoverBtn = document.getElementById("discoverBtn");
    const fadeOverlay = document.getElementById("fadeOverlay");
    const startScreen = document.getElementById("startScreen");
    const mainContent = document.getElementById("mainContent");
    const projectButtons = document.querySelectorAll("[data-category]");
    const display = document.getElementById("projectDisplay");

    /* ------------------- EFFET CRT (Balayage + scintillement) ------------------- */
    const crtOverlay = document.createElement("div");
    crtOverlay.classList.add("crt-overlay");
    document.body.appendChild(crtOverlay);

    const crtLine = document.createElement("div");
    crtLine.classList.add("crt-scanline");
    crtOverlay.appendChild(crtLine);

    setInterval(() => {
        crtOverlay.style.opacity = 0.05 + Math.random() * 0.05;
    }, 100);

    /* ------------------- CURSEUR UNIQUE ------------------- */
    const cursor = document.createElement("span");
    cursor.classList.add("charBlink");
    cursor.textContent = "";
    if (heroText) heroText.appendChild(cursor);

    /* ------------------- HERO TEXT + BOUTON ------------------- */
    if (heroText) {
        const lines = [
            "Initialisation du système...",
            "Chargement de l’interface NieraUI...",
            "Chargement du profil Julien Raynaud...",
            "Accès autorisé.",
            "Bienvenue Utilisateur !"
        ];

        let lineIndex = 0;
        let charIndex = 0;

        function typeLine() {
            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                // Supprime le curseur temporairement pour ajouter le caractère
                cursor.remove();
                heroText.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                heroText.appendChild(cursor);
                setTimeout(typeLine, 40); // vitesse de frappe
            } else {
                // Fin de ligne → retour à la ligne
                heroText.innerHTML += "<br>";
                heroText.appendChild(cursor);
                charIndex = 0;
                lineIndex++;

                if (lineIndex < lines.length) {
                    setTimeout(typeLine, 800);
                } else {
                    // Toutes les lignes terminées → supprimer le curseur
                    cursor.remove();

                    // Affiche le bouton
                    if (discoverBtn) {
                        setTimeout(() => discoverBtn.classList.add("visible"), 500);
                    }
                }
            }
        }

        typeLine();
    }

    /* ------------------- TRANSITION START → MAIN ------------------- */
    if (discoverBtn) {
        discoverBtn.addEventListener("click", () => {
            fadeOverlay.style.opacity = 1;
            fadeOverlay.style.pointerEvents = "auto";

            setTimeout(() => {
                startScreen.style.display = "none";
                mainContent.style.display = "flex";
                mainContent.style.opacity = 0;
                fadeOverlay.style.opacity = 0;

                // fade in main content
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    opacity += 0.05;
                    mainContent.style.opacity = opacity;
                    if (opacity >= 1) clearInterval(fadeIn);
                }, 30);

                fadeOverlay.style.pointerEvents = "none";
            }, 700);
        });
    }

    /* ------------------- WIZARD / PROJECTS ------------------- */
    if (display && projectButtons.length > 0) {
        const projects = {
            front: { text: "SystamJR – Interface claire et logique machine", url: "frontend.html" },
            back: { text: "BBH Ecosystem – Ecosystem sécurité client", url: "backend.html" },
            design: { text: "NieraUI – Design organique et mécanique", url: "UI-UX.html" }
        };

        projectButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const project = projects[btn.dataset.category];
                display.innerHTML = project
                    ? `<a href="${project.url}" class="block p-4 rounded border border-[rgba(80,76,67,0.4)] bg-white/10 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer text-[#504c43]">${project.text}</a>`
                    : "Aucun projet";
            });
        });
    }

    /* ------------------- BOOT SCREENS ------------------- */
    const bootScreens = [
        { screenId: "bootScreen", textId: "bootText", text: "Chargement de la page…" },
        { screenId: "pa-boot-screen", textId: "pa-boot-text", text: "Chargement de la page [Projet SYSTEM[JR]]...\nInitialisation des modules graphiques...\nConnexion à NieraUI..." },
        { screenId: "bbh-boot-screen", textId: "bbh-boot-text", text: "Chargement de la page Projet BBH Ecosystem…" }
    ];

    bootScreens.forEach(({ screenId, textId, text }) => {
        const screen = document.getElementById(screenId);
        const textElement = document.getElementById(textId);
        if (screen && textElement) {
            // Marqueur de saisi pour boot screens
            let i = 0;
            function typeBoot() {
                if (i <= text.length) {
                    textElement.textContent = text.slice(0, i);
                    i++;
                    setTimeout(typeBoot, 40);
                }
            }
            typeBoot();

            window.addEventListener("load", () => {
                setTimeout(() => {
                    screen.style.opacity = 1;
                    let opacity = 1;
                    const fadeOut = setInterval(() => {
                        opacity -= 0.05;
                        screen.style.opacity = opacity;
                        if (opacity <= 0) {
                            clearInterval(fadeOut);
                            screen.style.display = "none";
                        }
                    }, 30);
                }, 2500);
            });
        }
    });

});
