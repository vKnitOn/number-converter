const input = document.getElementById('inputNumber');
const select = document.getElementById('formatSelect');
const output = document.getElementById('output');

function parseNumber(str) {
    const s = str.trim().toLowerCase();

    // 1) 指数表記 例: 1e9
    if (/^[\d.]+e[-+]?\d+$/.test(s)) {
        const n = Number(s);
        if (!isNaN(n)) return n;
    }

    // 2) カンマ区切り除去して数値に
    const noComma = s.replace(/,/g, '');
    if (!isNaN(Number(noComma))) {
        return Number(noComma);
    }

    // 3) 日本語単位対応（兆・億・万）
    const jpUnits = { '兆': 1e12, '億': 1e8, '万': 1e4 };
    for (const unit in jpUnits) {
        if (s.endsWith(unit)) {
        const baseStr = s.slice(0, -unit.length);
        const baseNum = Number(baseStr);
        if (!isNaN(baseNum)) {
            return baseNum * jpUnits[unit];
        }
        }
    }

    // 4) 英語単位対応（billion, million, thousand, trillion）
    const enUnits = {
        'hundred': 1e2,
        'thousand': 1e3,
        'million': 1e6,
        'billion': 1e9,
        'trillion': 1e12,
        'quadrillion': 1e15,
        'quintillion': 1e18,
        'sextillion': 1e21,
        'septillion': 1e24,
        'octillion': 1e27,
        'nonillion': 1e30,
        'decillion': 1e33
    };
    for (const unit in enUnits) {
        if (s.endsWith(unit)) {
        const baseStr = s.slice(0, -unit.length).trim();
        const baseNum = Number(baseStr);
        if (!isNaN(baseNum)) {
            return baseNum * enUnits[unit];
        }
        }
    }

    return NaN; // パース失敗
}

// 指数表記
function toExponential(num) {
    return num.toExponential();
}

// 日本語表記（兆・億・万）
function toJapanese(num) {
    if (num >= 1e20) return (num / 1e20) + '垓';
    if (num >= 1e16) return (num / 1e16) + '京';
    if (num >= 1e12) return (num / 1e12) + '兆';
    if (num >= 1e8) return (num / 1e8) + '億';
    if (num >= 1e4) return (num / 1e4) + '万';
  return num.toString();
}

// カンマ区切り
function toComma(num) {
    return num.toLocaleString();
}

// 英語単位表記（billion, million, thousand, trillion）
function toEnglishUnit(num) {
    if (num >= 1e12) return (num / 1e12) + ' trillion';
    if (num >= 1e9) return (num / 1e9) + ' billion';
    if (num >= 1e6) return (num / 1e6) + ' million';
    if (num >= 1e3) return (num / 1e3) + ' thousand';
    return num.toString();
}

function convertNumber(inputStr, outputFormat) {
    const num = parseNumber(inputStr);
    if (isNaN(num)) return '無効な数値です';

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

// 入力と選択変化で更新
input.addEventListener('input', updateOutput);
select.addEventListener('change', updateOutput);
