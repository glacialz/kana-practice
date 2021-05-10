const hiragana = ["あ","い","う","え","お",
"か","き","く","け","こ",
"が","ぎ","ぐ","げ","ご",
"さ","し","す","せ","そ",
"ざ","じ","ず","ぜ","ぞ",
"た","ち","つ","て","と",
"だ","ぢ","づ","で","ど",
"な","に","ぬ","ね","の",
"は","ひ","ふ","へ","ほ",
"ば","び","ぶ","べ","ぼ",
"ぱ","ぴ","ぷ","ぺ","ぽ",
"ま","み","む","め","も",
"や","ゆ","よ",
"ら","り","る","れ","ろ",
"わ","を",
"ん"];

const katakana = ["ア","イ","ウ","エ","オ",
"カ","キ","ク","ケ","コ",
"ガ","ギ","グ","ゲ","ゴ",
"サ","シ","ス","セ","ソ",
"ザ","ジ","ズ","ゼ","ゾ",
"タ","チ","ツ","テ","ト",
"ダ","ヂ","ヅ","デ","ド",
"ナ","ニ","ヌ","ネ","ノ",
"ハ","ヒ","フ","ヘ","ホ",
"バ","ビ","ブ","ベ","ボ",
"パ","ピ","プ","ペ","ポ",
"マ","ミ","ム","メ","モ",
"ヤ","ユ","ヨ",
"ラ","リ","ル","レ","ロ",
"ワ","ヲ",
"ン"];

const allKana = ["あ","い","う","え","お",
"か","き","く","け","こ",
"が","ぎ","ぐ","げ","ご",
"さ","し","す","せ","そ",
"ざ","じ","ず","ぜ","ぞ",
"た","ち","つ","て","と",
"だ","ぢ","づ","で","ど",
"な","に","ぬ","ね","の",
"は","ひ","ふ","へ","ほ",
"ば","び","ぶ","べ","ぼ",
"ぱ","ぴ","ぷ","ぺ","ぽ",
"ま","み","む","め","も",
"や","ゆ","よ",
"ら","り","る","れ","ろ",
"わ","を",
"ん",
"ア","イ","ウ","エ","オ",
"カ","キ","ク","ケ","コ",
"ガ","ギ","グ","ゲ","ゴ",
"サ","シ","ス","セ","ソ",
"ザ","ジ","ズ","ゼ","ゾ",
"タ","チ","ツ","テ","ト",
"ダ","ヂ","ヅ","デ","ド",
"ナ","ニ","ヌ","ネ","ノ",
"ハ","ヒ","フ","ホ",
"バ","ビ","ブ","ボ",
"パ","ピ","プ","ポ",
"マ","ミ","ム","メ","モ",
"ヤ","ユ","ヨ",
"ラ","リ","ル","レ","ロ",
"ワ","ヲ",
"ン"];

const lookAlikes = ["さ","ざ","ち","ぢ","つ",
"ぬ","め","ウ","ワ","シ",
"ジ","ツ","ヅ","マ","ム",
"ソ","ゾ","ン","ノ","ル",
"レ" ]

const kanaField = document.querySelector('#kana-field');
const unansweredKana = document.querySelector('#unanswered');
const textInput = document.querySelector('#wanakana-input');
const buttons = document.querySelectorAll('.btn-class');
const numKanaElement = document.querySelector('#numberOfKana');
const accordion = document.querySelector('.accordion');

let selectedKana = hiragana;
let currentKanaSet;
let count = 0;
let numOfKana = 30;

wanakana.bind(textInput);
reload();

function reload() {
    currentKanaSet = getRandomKana(selectedKana, numOfKana);
    count = 0;
    unansweredKana.innerHTML = '';
    displayKana(currentKanaSet);
    unansweredKana.childNodes[0].classList.add("currentKana");
}

function getRomaji(kana) {
    let correctedRomaji = {"ぢ": "di","づ": "du","ヂ": "di","ヅ": "du"}
    if (kana in correctedRomaji) {
        return correctedRomaji[kana];
    } else {
        return wanakana.toRomaji(kana);
    }
}

function displayKana(kanaArray) {
    for(let i = 0; i < kanaArray.length; i++) {
        let romaji = getRomaji(kanaArray[i]);
        unansweredKana.innerHTML = unansweredKana.innerHTML + `<div class="tooltip">${kanaArray[i]}<span class="tooltiptext">${romaji}</span></div>`;
    }
}

function getRandomKana(kanaArray, size) {
    let kanaSet = []
    for (let i = 0; i < size; i++) {
        randomNum = Math.floor(Math.random() * kanaArray.length);
        kanaSet.push(kanaArray[randomNum]);
    }
    return kanaSet;
}

function checkAnswer(inputKana) {
    if(inputKana === currentKanaSet[count]) {
        textInput.value = "";
        let currentKanaClassList = unansweredKana.childNodes[count].classList;
        if (!currentKanaClassList.contains("wrong")) {
            currentKanaClassList.add("correct");
        }
        currentKanaClassList.remove("currentKana");
        count++;
        if (count >= numOfKana) {
            reload();
            count = 0;
        } else {
            let nextKana = unansweredKana.childNodes[count];
            nextKana.classList.add("currentKana");
        }
    }
    else {
        unansweredKana.childNodes[count].classList.add("wrong");
    }
}

textInput.addEventListener("input", (e) => {
    let input = textInput.value[0];
    if (wanakana.isKana(input)) {
        checkAnswer(input);
    }
})

numKanaElement.addEventListener("change", (e) => {
    numOfKana = e.target.value;
    reload();
})

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    kanaOptions = {'hiragana': hiragana, 'katakana': katakana, 'allKana': allKana, 'lookAlikes': lookAlikes};
    buttons.forEach(btn => btn.style.background = '');
    selectedKana = kanaOptions[btn.value];
    reload();
    e.target.style.background = 'rgb(177, 255, 157)';
}))

accordion.addEventListener('click', (e) => {
    accordion.classList.toggle("active");
    let panel = e.target.nextElementSibling;

    if (panel.style.display !== "flex") {
        panel.style.display = "flex";
        accordion.innerText = "Hide"
        accordion.classList.toggle("hide");
    } else {
        panel.style.display = "none";
        accordion.innerText = "Options"
        accordion.classList.toggle("hide");
    }
})