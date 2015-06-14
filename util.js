function getRandomFromArray(array){
    var randIndex = getRandomFromRange(0, array.length);
    return array[randIndex];
}

function getRandomFromRange(start, range){
    var rand = Math.floor(Math.random() * range) + start;
    return rand;
}