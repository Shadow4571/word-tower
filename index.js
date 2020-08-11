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
    clearTextBox();
    let table = document.getElementById("tableTower");
    let row = document.createElement("tr"), cell = document.createElement("td");
    cell.innerText = str;
    row.appendChild(cell);
    table.appendChild(row);
}

/**
 * Функция очищает окно вывода
 */
function clearTextBox() {
    let table = document.getElementById("tableTower");
    while(table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

/**
 * Функция формирует башню из слов. Принимает массив слов, после чего создает таблицу и устанавливает ее для пользователя
 * @param tower
 * @returns {string}
 */
function setTower(tower) {
    let maxChars = tower[0].length;
    let maxRows = tower.length;
    let table = document.getElementById("tableTower");

    for(let i = maxRows - 1; i > -1; i--) {
        let row = document.createElement("tr");
        for(let j = 0; j < maxChars; j++) {
            let cell = document.createElement("td");
            if(j < tower[i].length) {
                cell.innerText = tower[i][j] !== " " ? tower[i][j] : "";
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
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
    setTower(tower);
}

/**
 * Функция строит башню из максимального количества символов и выводит на окно вывода
 */
function beginSecondGame() {
    let textArray = getTextArrayFromBox();
    clearTextBox();

    if(textArray.length === 1 && textArray[0] === "") {
        setTextToBox("Вы не ввели слова в табличку.\nПопробуйте еще раз.");
        return 0;
    }

    let tower = getMaxCharTower(textArray);
    setTower(tower);
}
