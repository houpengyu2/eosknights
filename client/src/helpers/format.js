export function toLocaleString(num){
    return num.toLocaleString('en', {useGrouping:true});
}

export function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function addDecimals(num) {
    const split = String(num).split(".");
    const first = Number(split[0]).toLocaleString('en', {useGrouping:true});

    let decimals = 0;
    if(split[1] !== undefined){
        decimals = split[1].length;
    };

    let second = ""
    if(decimals === 0){
        second = "."
    } else {
        second = "." + split[1]
    }

    for(let i = decimals; i < 4; i++){
        second += "0"
    }

    return first + second;
} 

export function prepNum(initial){
    const rounded = precisionRound(initial, 4);
    const final = addDecimals(rounded);
    return final;
}