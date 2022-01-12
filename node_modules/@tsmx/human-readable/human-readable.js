var sizes = new Map();
sizes.set('BYTE', {
    index: 0,
    unit: 'B',
    unitLowercase: 'b',
    unitIEC: 'B',
    unitLowercaseIEC: 'b'
});
sizes.set('KBYTE', {
    index: 1,
    unit: 'kB',
    unitLowercase: ' kb',
    unitIEC: 'KiB',
    unitLowercaseIEC: 'kib'
});
sizes.set('MBYTE', {
    index: 2,
    unit: 'MB',
    unitLowercase: 'mb',
    unitIEC: 'MiB',
    unitLowercaseIEC: 'mib'
});
sizes.set('GBYTE', {
    index: 3,
    unit: 'GB',
    unitLowercase: 'gb',
    unitIEC: 'GiB',
    unitLowercaseIEC: 'gib'
});
sizes.set('TBYTE', {
    index: 4,
    unit: 'TB',
    unitLowercase: 'tb',
    unitIEC: 'TiB',
    unitLowercaseIEC: 'tib'
});
sizes.set('PBYTE', {
    index: 5,
    unit: 'PB',
    unitLowercase: 'pb',
    unitIEC: 'PiB',
    unitLowercaseIEC: 'pib'
});

sizes[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1].index - a[1].index);
};

const factorDecimal = 1000;
const factorIEC = 1024;
const defaultMaxPrecision = 2;
const availableSizes = [...sizes.keys()];

function countDecimals(value) {
    return value % 1 ? value.toString().split('.')[1].length : 0;
}

function calcFromTo(value, fromSize, toSize, iecMode) {
    let resultValue = NaN;
    let resultUnit = null;
    if (!sizes.has(fromSize) || !sizes.has(toSize)) {
        return { val: resultValue, unit: resultUnit };
    }
    let original = sizes.get(fromSize);
    let target = sizes.get(toSize);
    let delta = target.index - original.index;
    let factor = iecMode ? factorIEC : factorDecimal;
    if (delta > 0) {
        // convert to larger unit
        resultValue = parseFloat(value) / Math.pow(factor, delta);
    }
    else if (delta < 0) {
        // convert to smaller unit
        resultValue = parseFloat(value) * Math.pow(factor, Math.abs(delta));
    }
    else {
        // target === original
        resultValue = parseFloat(value);
    }
    resultUnit = iecMode ? target.unitIEC : target.unit;
    return { val: resultValue, unit: resultUnit };
}

function calcFromBytes(bytes, iecMode) {
    let resultValue = parseFloat(bytes);
    let resultUnit = iecMode ? sizes.get('BYTE').unitIEC : sizes.get('BYTE').unit;
    let factor = iecMode ? factorIEC : factorDecimal;
    for (let [, value] of sizes) {
        if (bytes >= Math.pow(factor, value.index)) {
            resultValue = bytes / Math.pow(factor, value.index);
            resultUnit = iecMode ? value.unitIEC : value.unit;
            break;
        }
    }
    return { val: resultValue, unit: resultUnit };
}

function postProcessResult(value, unit, options) {
    let resultValue = parseFloat(value);
    // option: precision, defaultMax: 2 - only if fullPrecision is not present or false!
    if (!(options && options.fullPrecision === true)) {
        if (options && Object.prototype.hasOwnProperty.call(options, 'fixedPrecision')) {
            let precision = parseInt(options.fixedPrecision);
            if (!isNaN(precision)) {
                resultValue = resultValue.toFixed(precision);
            }
            else {
                if (countDecimals(resultValue) > defaultMaxPrecision)
                    resultValue = resultValue.toFixed(defaultMaxPrecision);
            }
        }
        else {
            if (countDecimals(resultValue) > defaultMaxPrecision)
                resultValue = resultValue.toFixed(defaultMaxPrecision);
        }
    }
    // option: numberOnly
    if (options && options.numberOnly && options.numberOnly === true) {
        return resultValue.toString();
    }
    // option: noWhitespace
    let noWhitespace = (options && options.noWhitespace && options.noWhitespace == true);
    return resultValue + (noWhitespace ? '' : ' ') + unit;
}

module.exports.fromBytes = function (bytes, options) {
    // option IEC mode: default = decimal
    let iecMode = (options && options.mode && options.mode === 'IEC') ? true : false;
    let { val, unit } = calcFromBytes(bytes, iecMode);
    return postProcessResult(val, unit, options);
};

module.exports.fromTo = function (value, fromSize, toSize, options) {
    // option IEC mode: default = decimal
    let iecMode = (options && options.mode && options.mode === 'IEC') ? true : false;
    let { val, unit } = calcFromTo(value, fromSize, toSize, iecMode);
    return postProcessResult(val, unit, options);
};

module.exports.availableSizes = function () {
    return availableSizes;
};