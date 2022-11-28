let cell = document.querySelectorAll(".table__cell");
let table = document.querySelector(".table");
let result = document.querySelector(".result");
let resultNumber = document.querySelector(".result__number");
let resultButton = document.querySelector(".result__button");
const MAX_VALUE = 25;

const removeColor = (element) => {
  if (element.classList.contains("table__cell--correct")) {
    element.classList.remove("table__cell--correct");
  } else if (element.classList.contains("table__cell--error")) {
    element.classList.remove("table__cell--error");
  }
};

let start = new Date();
document.addEventListener("DOMContentLoaded", (ready) => {
  let usedNumbers = [];
  while (usedNumbers.length < MAX_VALUE) {
    let randomNumber = Math.floor(Math.random() * MAX_VALUE) + 1;
    if (usedNumbers.indexOf(randomNumber) === -1)
      usedNumbers.push(randomNumber);
    for (let i = 0; i < cell.length; i++) {
      cell[i].innerText = usedNumbers[i];
    }
  }
});

let checkedNumbers = [0];
table.addEventListener("click", (evt) => {
  if (Number(evt.target.innerHTML) !== MAX_VALUE) {
    for (let i = 0; i < cell.length; i++) {
      if (cell[i].classList.contains("table__cell--correct")) {
        cell[i].classList.remove("table__cell--correct");
      } else if (cell[i].classList.contains("table__cell--error")) {
        cell[i].classList.remove("table__cell--error");
      }
    }
  }
  if (checkedNumbers.indexOf(evt.target.innerHTML) === -1) {
    if (
      Number(evt.target.innerHTML) ===
      checkedNumbers[checkedNumbers.length - 1] + 1
    ) {
      evt.target.classList.add("table__cell--correct");
      setTimeout(removeColor, 500, evt.target);
      checkedNumbers.push(Number(evt.target.innerHTML));
    } else {
      evt.target.classList.add("table__cell--error");
      setTimeout(removeColor, 500, evt.target);
    }
  }
  if (
    Number(evt.target.innerHTML) === MAX_VALUE &&
    checkedNumbers[checkedNumbers.length - 1] === MAX_VALUE
  ) {
    let end = new Date();
    let minutes;
    let seconds = Math.round((end - start) / 1000);
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = Math.round(seconds % 60);
    } else {
      minutes = 0;
      seconds = seconds;
    }
    resultNumber.innerText = ` ${minutes}:${seconds}`;
    result.style.display = "block";
  }
});

resultButton.addEventListener("click", () => {
  result.style.display = "none";
  window.location.reload();
});
