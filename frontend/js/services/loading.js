export default function animacaoCarregar(){
        const loadingBody = document.getElementById('loading');
        const loading = document.querySelector('#loading div');
        const jogo = document.getElementById('jogo');
        const outTime = 0.6
        setTimeout(() => {
            loadingBody.style.animation = `FadeOut ${outTime}s`
            loading.style.animation = `ZoomOut ${outTime}s ease-out`
            setTimeout(()=>{
                loadingBody.style.display = 'none'
                jogo.style.display = 'flex'   
                jogo.style.animation = ' FadeIn 1s' 
            }, outTime * 1000)
        }, 1000)
    }