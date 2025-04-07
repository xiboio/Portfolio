document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");

    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 3000);

    // Configura o listener para os botões de idioma
    document.querySelectorAll(".btn-lang").forEach((button) => {
        button.addEventListener("click", () => {
            const lang = button.getAttribute("data-lang");
            updateLanguage(lang);
        });
    });
});

const translations = {
    pt: {
        ".jesus-saves": "Jesus Salva",
        ".qm": "Quem Sou",
        ".desc": "Sou estudante de uma escola técnica(ETEC), onde faço o Ensino Médio junto com o curso técnico em Desenvolvimento de Sistemas. Com um interesse crescente na programação e no desenvolvimento de software. Meu objetivo é aprimorar habilidades e conhecimentos práticos que me permitam criar soluções eficientes e inovadoras, preparando-me para desafios profissionais e acadêmicos..",
        ".ha": "Habilidades",
        ".skill-level-bg": "Iniciante",
        ".skill-level-it": "Intermediário",
        ".np": "Projetos",
        ".ur": "Urna",
        ".desc_proj_ur": "Urna feita na escola de ensino médio com técnico integrado - ETEC",
        ".po": "Portifólio",
        ".desc_proj_port": "Portfólio feito para uso pessoal",
        ".a_ur": "Visualizar Projeto",
        ".a_proj": "Visualizar Projeto"
    },
    en: {
        ".jesus-saves": "Jesus Saves",
        ".qm": "About Me",
        ".desc": "I am a student of a Technical School (Etec), where I do high school along with the technical course in systems development. With a growing interest in software programming and development. My goal is to improve practical skills and knowledge that allow me to create efficient and innovative solutions, preparingme for professional and academic challenges." ,
        ".ha": "Skills",
        ".skill-level-bg": "Beginner",
        ".skill-level-it": "Intermediate",
        ".np": "Project",
        ".ur": "Ele Vot Mach",
        ".desc_proj_ur": "E.V.M made at the technical high school - ETEC",
        ".po": "Portfolio",
        ".desc_proj_port": "Portfolio made for personal use",
        ".a_ur": "View project",
        ".a_proj": "View project"
    }
};

function updateLanguage(lang) {
    // Itera sobre todas as classes no objeto de tradução
    for (const [selector, translation] of Object.entries(translations[lang])) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.textContent = translation;
        });
    }
}