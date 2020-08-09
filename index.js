'use strict';

/**
 * Функция возвращает массив слов из формы ввода текста
 * @returns {string[]}
 */
function getTextArrayFromBox() {
    return document.getElementById("textArea").value.split(" ");
}

/**
 * Функция принимает строку и устанавливает ее в окно вывода
 * @param str
 */
function setTextToBox(str) {
    document.getElementById("textTower").innerText = str;
}

/**
 * Функция очищает окно вывода
 */
function clearTextBox() {
    document.getElementById("textTower").innerText = " ";
}

/**
 * Функция формирует башню из слов. Принимает массив слов, возвращает строку
 * @param tower
 * @returns {string}
 */
function getMessage(tower) {
    let message = "";

    for(let i = tower.length - 1; i > -1; i--) {
        for(let char of tower[i]) {
            if(char === " ") {
                message += "\u2007" + "\u2003";
            } else {
                message += char + "\u2003";
            }
        }
        message += "\n";
    }

    return message;
}

/**
 * Функция строит самую высокую башню и выводит на окно вывода
 */
function beginFirstGame() {
    let textArray = getTextArrayFromBox();
    clearTextBox();

    if(textArray.length === 1 && textArray[0] === "") {
        setTextToBox("Вы не ввели слова в табличку.\nПопробуйте еще раз.");
        return 0;
    }

    let tower = getWordTower(textArray);
    let message = getMessage(tower);

    setTextToBox(message);
}

/**
 * Функция строит башню из максимального количества символов и выводин на окно вывода
 */
function beginSecondGame() {
    let textArray = getTextArrayFromBox();
    clearTextBox();

    if(textArray.length === 1 && textArray[0] === "") {
        setTextToBox("Вы не ввели слова в табличку.\nПопробуйте еще раз.");
        return 0;
    }

    let tower = getMaxCharTower(textArray);
    let message = getMessage(tower);

    setTextToBox(message);
}