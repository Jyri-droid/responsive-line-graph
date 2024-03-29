getPowerOfTen = (number) => {
    let multiplier = "1";
    if (number >= 0) {
        for (let k = 0; k < String(number).length - 1; k++) {
            multiplier += "0";
        }
    } else {
        for (let k = 0; k < String(number).length - 2; k++) {
            multiplier += "0";
        }
    }
    return Number(multiplier);
}

getDividingNumber = (number) => {
    let dividingNumber = 3;
    let division = number / dividingNumber;
    while (division !== Math.floor(division)) {
        dividingNumber++;
        division = number / dividingNumber;
    }
    return dividingNumber; 
}

createSteps = (data) => {
    // Get smallest and highest numbers in data
    let min = Math.min(...data);
    let max = Math.max(...data);
    // Check which one has bigger power of ten
    let powerOfTen;
    if (getPowerOfTen(max) >= getPowerOfTen(min)) {
        powerOfTen = getPowerOfTen(max);
    } else {
        powerOfTen = getPowerOfTen(min);
    }
    // Round smallest and highest numbers into root numbers between 0-100
    min = Math.floor(min / powerOfTen) * 10;
    max = Math.ceil(max / powerOfTen) * 10;
    // Count range and make pretty
    const range = max - min;
    const amountOfSteps = getDividingNumber(range);
    const steps = [];
    for (let j = 0; j < amountOfSteps + 1; j++) {
        steps.push(((range / amountOfSteps) * j + min) * powerOfTen / 10);
    }
    return steps;
}