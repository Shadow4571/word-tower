'use strict';

/**
 * Функция принимает два слова и проверяет можно ли разместить одно слово над другим.
 * После чего функция возвращает объект с результатом и измененными словами.
 * @param firstWord - string
 * @param secondWord - string
 * @returns {{canCollision: boolean, first: string, second: string}}
 */
function canWordCollision(firstWord, secondWord) {
    let wordCollision = {canCollision: false, first: firstWord, second: secondWord};
    if(firstWord.length < secondWord.length)
        return wordCollision;

    let size = firstWord.length > secondWord.length ? secondWord.length : firstWord.length;
    for(let i = 0; i < size; i++) {
        if(firstWord[i] === secondWord[i]) {
            if(secondWord.length < firstWord.length) {
                secondWord = " " + secondWord;
                i = -1;
                size++;
            } else {
                return wordCollision;
            }
        }
    }

    wordCollision.canCollision = true;
    wordCollision.first = firstWord;
    wordCollision.second = secondWord;

    return wordCollision;
}

/**
 * Функция принимает массив слов и возвращает массив объектов совместимости слов.
 * Объект содержит слово и массив слов, которые могут располагаться рядом с ним.
 * @param textArray - [string]
 * @returns {[{word: string, comp: []}]}
 */
function getWordCompatibility(textArray) {
    let wordCompatibility = [];

    for(let i = 0; i < textArray.length; i++) {
        wordCompatibility.push({word: textArray[i], comp: []});
        for(let j = 0; j < textArray.length; j++) {
            if(j !== i) {

                let collision = canWordCollision(wordCompatibility[wordCompatibility.length - 1].word, textArray[j]);
                if(collision.canCollision) {
                    wordCompatibility[wordCompatibility.length - 1].comp.push(textArray[j]);
                }
            }
        }
    }

    return wordCompatibility;
}

/**
 * Функция принимает слово, массив объектов совместимости и массив слов.
 * Рекурсивно возвращает последовательность слов, которые могут стоять рядом.
 * @param word - string
 * @param compatibilityObject - [{word: string, comp: []}]
 * @param floorsArray - [string]
 * @returns {[string]}
 */
function findWordOnFloor(word, compatibilityObject, floorsArray) {
    if(floorsArray.indexOf(word) !== -1)
        return floorsArray;

    for(let i = 0; i < compatibilityObject.length; i++) {
        if(compatibilityObject[i].word === word) {
            floorsArray.push(word);
            for(let j = 0; j < compatibilityObject[i].comp.length; j++) {
                floorsArray = Array.from(new Set(floorsArray.concat(findWordOnFloor(compatibilityObject[i].comp[j], compatibilityObject, floorsArray)).sort((a, b) => b.length - a.length)));
            }

            break;
        }
    }

    return floorsArray;
}

/**
 * Функция принимает массив объектов совместимости.
 * После чего возвращает массив массивов строк, содержащих все варианты соединений слов.
 * @param wordCompatibility - [{word: string, comp: []}]
 * @returns {[[string]]}
 */
function getFloors(wordCompatibility) {
    let floors = [];

    for(let i = 0; i < wordCompatibility.length; i ++) {
        if(wordCompatibility[i].comp.length > 0) {
            for(let j = 0; j < wordCompatibility[i].comp.length; j++) {
                let floor = findWordOnFloor(wordCompatibility[i].comp[j], wordCompatibility, Array.from([wordCompatibility[i].word]));
                floors.push(floor);
            }
        } else {
            floors.push([wordCompatibility[i].word]);
        }
    }

    return floors;
}

/**
 * Функция принимает массивы слов и удаляет слова, которые не могут находиться в массиве
 * @param floors - [[string]]
 * @returns {[[string]]}
 */
function checkFloors(floors) {
    for(let i = 0; i < floors.length; i++) {
        for(let j = 0; j < floors[i].length - 1; j++) {
            let collision = canWordCollision(floors[i][j], floors[i][j + 1])
            if(!collision.canCollision) {
                floors[i].splice(j + 1);
                j--;
            }
        }
    }

    return floors;
}

/**
 * Функция принимает массивы слов и ищет самый длинный массив (башню)
 * @param floors - [[string]]
 * @returns {[string]}
 */
function getLongestTower(floors) {
    let tower = {tower: [], size: 0};
    for(let floor of floors) {
        if(floor.length > tower.size) {
            tower.tower = floor;
            tower.size = floor.length;
        }
    }

    return tower.tower;
}

/**
 * Функция сдвигает слова ровно друг под друга, чтобы создать эффект башни
 * @param firstWord - string
 * @param secondWord - string
 * @returns {{first: string, second: string}}
 */
function locateWord(firstWord, secondWord) {
    let locate = {first: firstWord, second: secondWord};
    if(firstWord.length === secondWord.length)
        return locate;

    let size = firstWord.length > secondWord.length ? secondWord.length : firstWord.length;
    for(let i = 0; i < size; i++) {
        if((locate.first[i] === locate.second[i] && locate.first[i] !== " " && locate.second[i] !== " ") || (locate.first[i] === " " && locate.second[i] !== " ")) {
            locate.second = " " + locate.second;
            i = -1;
            size++;
        }
    }

    return locate;
}

/**
 * Функция формирует башню принимая массив слов
 * @param tower - [string]
 * @returns {[string]}
 */
function getRightWordLocation(tower) {
    let result = [];

    if(tower.length > 1) {
        for (let i = 0; i < tower.length - 1; i++) {
            if (i === 0) {
                let location = locateWord(tower[i], tower[i + 1]);
                result.push(location.first);
                result.push(location.second);
            } else {
                let location = locateWord(result[result.length - 1], tower[i + 1]);
                result.push(location.second);
            }
        }
    } else {
        result.push(tower[0]);
    }

    return result;
}

/**
 * Функция ищет среди массивов строк, массив с самым большим количеством символов
 * @param floors - [[string]]
 * @returns {[string]}
 */
function findMaxCharTower(floors) {
    let maxCharTower = {tower: [], charCount: 0};

    for(let i = 0; i < floors.length; i++) {
        let charCount = 0;
        for(let j = 0; j < floors[i].length; j++) {
            charCount += floors[i][j].length;
        }

        if(charCount > maxCharTower.charCount) {
            maxCharTower.tower = floors[i];
            maxCharTower.charCount = charCount;
        }
    }

    return maxCharTower.tower;
}

/**
 * Функция принимает массив слов и возвращает самую высокую башню из них
 * @param textArray
 * @returns {string[]}
 */
function getWordTower(textArray) {
    if(textArray.length === 1)
        return [textArray[0]];

    let wordCompatibility = getWordCompatibility(textArray);

    let floors = getFloors(wordCompatibility);

    floors = checkFloors(floors);

    let tower = getLongestTower(floors);

    let result = getRightWordLocation(tower);

    return result;
}

/**
 * Функция принимает массив слов и возвращает башню с самым большим количеством символов
 * @param textArray
 * @returns {string[]}
 */
function getMaxCharTower(textArray) {
    if(textArray.length === 1)
        return [textArray[0]];

    let wordCompatibility = getWordCompatibility(textArray);

    let floors = getFloors(wordCompatibility);

    floors = checkFloors(floors);

    let charTower = findMaxCharTower(floors);

    let result = getRightWordLocation(charTower);

    return result;
}