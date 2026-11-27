export function mostrarLoading() {
    const loadingBody = document.getElementById("loading");
    const loading = document.querySelector("#loading div");

    loadingBody.style.animation = "";
    loading.style.animation = "";
    loadingBody.style.display = "flex";
}

export function esconderLoading() {
    document.getElementById("loading").style.display = "none";
}

export default function animacaoCarregar(idJogo, displayJogo) {
    const loadingBody = document.getElementById("loading");
    const loading = document.querySelector("#loading div");
    const jogo = document.getElementById(idJogo);
    const outTime = 0.6;

    setTimeout(() => {
        loadingBody.style.animation = `FadeOut ${outTime}s`;
        loading.style.animation = `ZoomOut ${outTime}s ease-out`;

        setTimeout(() => {
            loadingBody.style.display = "none";
            jogo.style.display = displayJogo;
        }, outTime * 1000);
    }, 1000);
}
