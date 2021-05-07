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

const lookAlikes = ["さ","ざ","ち","ぢ","つ",
"ぬ","め","ウ","ワ","シ",
"ジ","ツ","ヅ","マ","ム",
"ソ","ゾ","ン","ノ","ル",
"レ" ]

const allKana = hiragana.concat(katakana)
const kanaField = document.querySelector('#kana-field');
const correctKana = document.querySelector('#correct');
const unansweredKana = document.querySelector('#unanswered');
const textInput = document.querySelector('#wanakana-input');
const buttons = document.querySelectorAll('.btn-class');
const numKanaElement = document.querySelector('#numberOfKana');
const accordion = document.querySelector('.accordion');
wanakana.bind(textInput);
let selectedKana = hiragana;
let currentKanaSet;
let count = 0;
let numOfKana = 30;

function reload() {
    currentKanaSet = [];
    for (let i = 0; i < numOfKana; i++ ) {
        currentKanaSet.unshift(getRandomKana(selectedKana));
    }
    console.log(currentKanaSet)
    count = 0;
    correctKana.innerText = '';
    unansweredKana.innerText = currentKanaSet.join('');
}


function getRandomKana(kanaArray) {
    randomNum = Math.floor(Math.random() * kanaArray.length);
    return kanaArray[randomNum];
}

textInput.addEventListener("input", (e) => {
    inputKana = textInput.value[0];
    if (inputKana === currentKanaSet[count]) {
        textInput.value = "";
        correctKana.innerText += inputKana;
        unansweredKana.innerText = unansweredKana.innerText.replace(inputKana, '');
        count++;
        if (count >= numOfKana) {
            reload();
            count = 0;
        }
    }
})

numKanaElement.addEventListener("change", (e) => {
    console.log(e)
    numOfKana = e.target.value;
    console.log(numOfKana)
    reload();
})

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    kanaOptions = {'hiragana': hiragana, 'katakana': katakana, 'allKana': allKana, 'lookAlikes': lookAlikes};
    buttons.forEach(btn => btn.style.background = '');
    selectedKana = kanaOptions[btn.value];
    reload();
    e.target.style.background = 'rgb(151, 255, 125)';
}))

accordion.addEventListener('click', (e) => {
    accordion.classList.toggle("active");
    let panel = e.target.nextElementSibling;

    if (panel.style.display !== "flex") {
        panel.style.display = "flex";
    } else {
        panel.style.display = "none";
    }
})

reload();