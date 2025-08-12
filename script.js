document.addEventListener('DOMContentLoaded', () => {

const input = document.getElementById('inputNumber');
const select = document.getElementById('formatSelect');
const output = document.getElementById('output');

const unitDefinitions = {
    en: [
        { label: 'Tg (Trigintillion)', value: 1e93, aliases: ['tg', 'trigintillion'] },
        { label: 'NVg (Novemvigintillion)', value: 1e90, aliases: ['nvg', 'novemvigintillion'] },
        { label: 'OVg (Octovigintillion)', value: 1e87, aliases: ['ovg', 'octovigintillion'] },
        { label: 'SpVg (Septemvigintillion)', value: 1e84, aliases: ['spvg', 'septemvigintillion'] },
        { label: 'SxVg (Sesvigintillion)', value: 1e81, aliases: ['sxvg', 'sesvigintillion'] },
        { label: 'QiVg (Quinvigintillion)', value: 1e78, aliases: ['qivg', 'quinvigintillion'] },
        { label: 'QaVg (Quattuorvigintillion)', value: 1e75, aliases: ['qavg', 'quattuorvigintillion'] },
        { label: 'TVg (Tresvigintillion)', value: 1e72, aliases: ['tvg', 'tresvigintillion'] },
        { label: 'DVg (Duovigintillion)', value: 1e69, aliases: ['dvg', 'duovigintillion'] },
        { label: 'UVg (Unvigintillion)', value: 1e66, aliases: ['uvg', 'unvigintillion'] },
        { label: 'Vg (Vigintillion)', value: 1e63, aliases: ['vg', 'vigintillion'] },
        { label: 'NDc (Novemdecillion)', value: 1e60, aliases: ['ndc', 'novemdecillion'] },
        { label: 'ODc (Octodecillion)', value: 1e57, aliases: ['odc', 'octodecillion'] },
        { label: 'SpDc (Septendecillion)', value: 1e54, aliases: ['spdc', 'septendecillion'] },
        { label: 'SxDc (Sexdecillion)', value: 1e51, aliases: ['sxdc', 'sexdecillion'] },
        { label: 'QiDc (Quindecillion)', value: 1e48, aliases: ['qidc', 'quindecillion'] },
        { label: 'QaDc (Quattuordecillion)', value: 1e45, aliases: ['qadc', 'quattuordecillion'] },
        { label: 'TDc (Tredecillion)', value: 1e42, aliases: ['tdc', 'tredecillion'] },
        { label: 'DDc (Duodecillion)', value: 1e39, aliases: ['ddc', 'duodecillion'] },
        { label: 'UDc (Undecillion)', value: 1e36, aliases: ['udc', 'undecillion'] },
        { label: 'Dc (Decillion)', value: 1e33, aliases: ['dc', 'decillion'] },
        { label: 'No (Nonillion)', value: 1e30, aliases: ['no', 'nonillion'] },
        { label: 'Oc (Octillion)', value: 1e27, aliases: ['oc', 'octillion'] },
        { label: 'Sp (Septillion)', value: 1e24, aliases: ['sp', 'septillion'] },
        { label: 'Sx (Sextillion)', value: 1e21, aliases: ['sx', 'sextillion'] },
        { label: 'Qi (Quintillion)', value: 1e18, aliases: ['qi', 'quintillion'] },
        { label: 'Qa (Quadrillion)', value: 1e15, aliases: ['qa', 'quadrillion'] },
        { label: 'T (Trillion)', value: 1e12, aliases: ['t', 'trillion'] },
        { label: 'B (Billion)', value: 1e9, aliases: ['b', 'billion'] },
        { label: 'M (Million)', value: 1e6, aliases: ['m', 'million'] },
        { label: 'K', value: 1e3, aliases: ['k', 'thousand'] },
        ]
};

    /*
            入力部分
                        */

function parseNumber(str) {
    const s = str.trim().toLowerCase();

    // 1. 指数表記
    if (s.includes('e')) {
        const n = Number(s);
        if (!isNaN(n)) return n;
    }

    // 2. 数字表記
    const noComma = s.replace(/,/g, '');
    if (!isNaN(Number(noComma))) {
        return Number(noComma);
    }

    // 4. 英語表記
    for (const unit of unitDefinitions.en) {
        for (const alias of unit.aliases) {
            if (s.endsWith(alias)) {
                const base = s.slice(0, -alias.length).trim();
                const baseNum = Number(base);
                if (!isNaN(baseNum)) return baseNum * unit.value;
            }
        }
    }
    return NaN;
}

    /*
            出力部分
                        */
//英語表記
function toEnglishUnit(num) {
    for (const unit of unitDefinitions.en) {
        if (num >= unit.value) {
            return Number((num / unit.value).toFixed(3)) + ' ' + unit.label;
        }
    }
    return num.toString();
}

//指数表記
function toExponential(num){
    return num.toExponential(3)
}

//カンマ区切り表記
function toComma(num){
    return num.toLocaleString()
}


//変換
function convertNumber(inputStr, outputFormat) {
    let num = parseNumber(inputStr);
    if (isNaN(num)) return '無効な数値です';
    if (num < 0) return '正の値を入力してください';
    num = Math.round(num)

    switch (outputFormat) {
        case 'exp': return toExponential(num);
        case 'jp': return toJapanese(num);
        case 'comma': return toComma(num);
        case 'en': return toEnglishUnit(num);
        case 'plain': return num.toString();
        default: return num.toString();
    }
}


function updateOutput() {
    const inputStr = input.value;
    const outputFormat = select.value;
    const result = convertNumber(inputStr, outputFormat);
    output.textContent = result;
}

    input.addEventListener('input', updateOutput);
    select.addEventListener('change', updateOutput);
    updateOutput(); // 初期表示
    
});


