document.addEventListener("DOMContentLoaded"), () => {
    const loadingScreen = document.getElementById("loading-screen");
    const portfolioContent = document.getElementById("portfolio-content");
}

setTimeout(() => {
    loadingScreen.style.display = "none";
    portfolioContent.style.display = "block";
}, 3000);