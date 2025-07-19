document.addEventListener('DOMContentLoaded', () => {

const input = document.getElementById('inputNumber');
const select = document.getElementById('formatSelect');
const output = document.getElementById('output');

function parseNumber(str) {
    const s = str.trim().toLowerCase();

    // 指数表記（"e" を含み、数値として変換できるか）
    if (s.includes('e')) {
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
    'k': 1e3,
    'thousand': 1e3,
    'm': 1e6,
    'million': 1e6,
    'b': 1e9,
    'billion': 1e9,
    't': 1e12,
    'trillion': 1e12,
    'qa': 1e15,
    'quadrillion': 1e15,
    'qi': 1e18,
    'quintillion': 1e18,
    'sx': 1e21,
    'sextillion': 1e21,
    'sp': 1e24,
    'septillion': 1e24,
    'oc': 1e27,
    'octillion': 1e27,
    'no': 1e30,
    'nonillion': 1e30,
    'dc': 1e33,
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
    return Number(num).toExponential(3);
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
  if (num >= 1e33) return Number((num / 1e33).toFixed(3)) + ' Dc (Decillion)';
  if (num >= 1e30) return Number((num / 1e30).toFixed(3)) + ' No (Nonillion)';
  if (num >= 1e27) return Number((num / 1e27).toFixed(3)) + ' Oc (Octillion)';
  if (num >= 1e24) return Number((num / 1e24).toFixed(3)) + ' Sp (Septillion)';
  if (num >= 1e21) return Number((num / 1e21).toFixed(3)) + ' Sx (Sextillion)';
  if (num >= 1e18) return Number((num / 1e18).toFixed(3)) + ' Qi (Quintillion)';
  if (num >= 1e15) return Number((num / 1e15).toFixed(3)) + ' Qa (Quadrillion)';
  if (num >= 1e12) return Number((num / 1e12).toFixed(3)) + ' T (Trillion)';
  if (num >= 1e9)  return Number((num / 1e9).toFixed(3)) + ' B (Billion)';
  if (num >= 1e6)  return Number((num / 1e6).toFixed(3)) + ' M (Million)';
  if (num >= 1e3)  return Number((num / 1e3).toFixed(3)) + ' K';
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

    input.addEventListener('input', updateOutput);
    select.addEventListener('change', updateOutput);
    updateOutput(); // 初期表示
    
});
