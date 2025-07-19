document.addEventListener('DOMContentLoaded', () => {

const input = document.getElementById('inputNumber');
const select = document.getElementById('formatSelect');
const output = document.getElementById('output');

const unitDefinitions = {
    jp: [
        { label: '垓', value: 1e20 },
        { label: '京', value: 1e16 },
        { label: '兆', value: 1e12 },
        { label: '億', value: 1e8 },
        { label: '万', value: 1e4 },
    ],
    en: [
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

    // 3. 日本語表記
    for (const unit of unitDefinitions.jp) {
        if (s.endsWith(unit.label)) {
            const base = s.slice(0, -unit.label.length);
            const baseNum = Number(base);
            if (!isNaN(baseNum)) return baseNum * unit.value;
        }
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

// 日本語表記
function toJapanese(num) {
    const units = unitDefinitions.jp;
    let result = '';
    let remainder = num;

    for (const unit of units) {
        const unitValue = Math.floor(remainder / unit.value);
        if (unitValue > 0) {
            result += unitValue + unit.label;
            remainder %= unit.value;
        }
    }

    if (remainder > 0 || result === '') {
        result += remainder;
    }

    return result;
}

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
    num = Math.floor(num)

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
