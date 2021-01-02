let monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Obtener fecha del pc
let currentDate = new Date();
// Obtener el día
let currentDay = currentDate.getDate();
// Obtener el mes del 0 al 11
let monthNumber = currentDate.getMonth();
// Obtener la fecha completa
let currentYear = currentDate.getFullYear();

// console.log(currentDay + "---" + monthNumber + "---" + currentYear);

let dates = document.getElementById("dates");
let month = document.getElementById("month");
let year = document.getElementById("year");

let prevMonthDOM = document.getElementById("prev-month");
let nextMonthDOM = document.getElementById("next-month");

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener("click", () => lastMonth());
nextMonthDOM.addEventListener("click", () => nextMonth());

writeMonth(monthNumber);

// Funciones
function writeMonth(month) {
  for (let i = startDay(); i > 0; i--) {
    dates.innerHTML += /*html*/ `<div class='calendar-date calendar-item calendar-last-days'>
            ${getTotalDays(monthNumber - 1) - (i - 1)}
        </div>`;
  }

  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i === currentDay) {
      dates.innerHTML += /*html*/ `<div class='calendar-date calendar-item calendar-today'>${i}</div>`;
    } else {
      dates.innerHTML += /*html*/ `<div class='calendar-date calendar-item'>${i}</div>`;
    }
  }
}

function getTotalDays(month) {
  if (month === -1) month = 11;

  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }
}

// Función para comprobar si el año es biciesto
function isLeap() {
  return (
    (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
    currentYear % 400 === 0
  );
}

// Calcular cuando comienza la semana
function startDay() {
  let start = new Date(currentYear, monthNumber, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

// Calcular el mes anterior
function lastMonth() {
  if (monthNumber !== 0) {
    monthNumber--;
  } else {
    monthNumber = 11;
    currentYear--;
  }

  setNewDate();
}

// Calcular el mes siguiente
function nextMonth() {
  if (monthNumber !== 11) {
    monthNumber++;
  } else {
    monthNumber = 0;
    currentYear++;
  }

  setNewDate();
}

function setNewDate() {
  currentDate.setFullYear(currentYear, monthNumber, currentDay);
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  dates.textContent = "";
  writeMonth(monthNumber);
}
