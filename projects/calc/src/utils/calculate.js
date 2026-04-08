// исправление погрешности, 1e10 гарантированно обеспечивает это исправление
export function cleanFloat(num) {
    let cleanNum = Math.round(num * 1e10) / 1e10;
    cleanNum = parseFloat(cleanNum.toPrecision(12));
    return cleanNum;
}
