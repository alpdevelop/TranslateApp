const fromlang = document.getElementById("from-lang")
const tolang = document.getElementById("to-lang")
const btn = document.getElementById("btnTranslate")
const fromTextArea = document.getElementById("from-text")
const toTextArea = document.getElementById("to-text")
const exchange = document.querySelector(".exchangeIcon")
const icons = document.querySelectorAll(".icons")

for(let lang in languages){
    const append = `<option value="${lang}">${languages[lang]}</option>`

    fromlang.insertAdjacentHTML("beforeend" , append);
    tolang.insertAdjacentHTML("beforeend" , append);

    fromlang.value = "tr-TR";
    tolang.value =  "en-GB";
}


btn.addEventListener("click" , () => {
    let text = fromTextArea.value

    let from = fromlang.value.slice(0,2)
    let to = tolang.value.slice(0,2)

    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`
    fetch(url)
            .then(res => res.json())
            .then(data => {
                toTextArea.textContent = data.responseData.translatedText;
            });
})

exchange.addEventListener("click" , () => {
    let text = fromTextArea.value 
    fromTextArea.value = toTextArea.value
    toTextArea.value = text

    let lang = fromlang.value
    fromlang.value = tolang.value
    tolang.value = lang
})

for(let icon of icons){
    icon.addEventListener("click", (e) => {
        if(e.target.classList.contains("fa-copy")){
            if(e.target.id == "leftCopy"){
                // console.log('left copy');
                navigator.clipboard.writeText(fromTextArea.value)
            }else{
                // console.log('copy right');
                navigator.clipboard.writeText(toTextArea.value)
            }
        }else{
            let utterance;
            if(e.target.id == "rightVolume"){
                // console.log('right volume');
                utterance = new SpeechSynthesisUtterance(toTextArea.value)
                utterance.lang = tolang.value
            }else{
                // console.log('left volume');
                utterance = new SpeechSynthesisUtterance(fromTextArea.value)
                utterance.lang = fromlang.value
            }
            speechSynthesis.speak(utterance);
        }
    })
}