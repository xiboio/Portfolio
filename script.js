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
        ".desc": "Sou estudante de uma escola técnica(ETEC), onde faço o Ensino Médio junto com o curso técnico em Desenvolvimento de Sistemas. Com um interesse crescente na programação e no desenvolvimento de software, escolhi focar meus estudos na linguagem C#, pela sua versatilidade e uso em diversas áreas, como desenvolvimento web e aplicações empresariais. Meu objetivo é aprimorar habilidades e conhecimentos práticos que me permitam criar soluções eficientes e inovadoras, preparando-me para desafios profissionais e acadêmicos.",
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
        ".desc": "I am a student at a technical school (ETEC), where I attend high school along with the technical course in Systems Development. With a growing interest in programming and software development, I chose to focus my studies on the C# language, due to its versatility and use in different areas, such as web development and business applications. My goal is to improve practical skills and knowledge that allow me to create efficient and innovative solutions, preparing me for professional and academic challenges.",
        ".ha": "Skills",
        ".skill-level-bg": "Beginner",
        ".skill-level-it": "Intermediate",
        ".np": "Project",
        ".ur": "Eletro Vot Mach",
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