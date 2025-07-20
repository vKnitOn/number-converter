function toJapanese(num) {
    if (num === 0) return '0';

    const units = unitDefinitions.jp;
    let result = '';
    let remainder = num;
    let count = 0;

    for (const unit of units) {
        const unitCount = Math.floor(remainder / unit.value);
        if (unitCount >= 1) {
            result += unitCount + unit.label;
            remainder -= unitCount * unit.value;
            count++;
        }

        if (count >= 2) break;
    }

    // 万未満やどの単位にも該当しない場合
    if (result === '') {
        result = num.toString();
    }

    return result;
}
