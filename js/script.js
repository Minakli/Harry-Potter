import { data } from "./data.js";
const header = document.querySelector("header");
const main = document.querySelector("main");
const headForm = document.createElement("form");
const inputName = document.createElement("input");
const mainContainer = document.createElement("div");
const selectSchool = document.createElement("select");
//Отрисовывает header
function createHeader() {
  const headerContainer = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const labelName = document.createElement("label");
  const labelSchool = document.createElement("label");
  const decorLine = document.createElement("div");
  const optSchool_0 = document.createElement("option");
  const optSchool_all = document.createElement("option");
  headerContainer.classList.add("header__container");
  h1.textContent = "Harry Potter";
  h2.textContent = "View all characters from the Harry Potter universe";
  labelName.setAttribute("for", "input__name");
  labelSchool.setAttribute("for", "input__school");
  labelName.textContent = "Name";
  labelSchool.textContent = "School";
  inputName.setAttribute("type", "text");
  inputName.setAttribute("id", "input__name");
  inputName.setAttribute("placeholder", "   Select unit");
  selectSchool.setAttribute("type", "text");
  selectSchool.setAttribute("id", "input__school");
  optSchool_0.setAttribute("disabled", "disabled");
  optSchool_0.setAttribute("selected", "selected");
  optSchool_0.textContent = "Choose one";
  optSchool_all.textContent = "Select all";
  decorLine.classList.add("header__decorline");
  header.append(headerContainer);
  headerContainer.append(h1, h2, headForm);
  header.append(decorLine);
  headForm.append(labelName, labelSchool, inputName, selectSchool);
  selectSchool.prepend(optSchool_all);
  selectSchool.prepend(optSchool_0);
}

//Создает массив школ из полученных карт и вызывает функцию отрисовки списка
createHouses();
function createHouses() {
  let allHouses = data.map((elem) => {
    return elem.house;
  });
  let houses = [];
  for (let elem of allHouses) {
    if (houses.find((item) => item == elem)) {
    } else {
      houses.push(elem);
      createOptionsList(elem);
    }
  }
}
//Создает список options из масства школ
function createOptionsList(elem) {
  let optionSchool = document.createElement("option");
  if (elem) {
    selectSchool.append(optionSchool);
    optionSchool.textContent = elem;
  }
}
//Отрисовка карточки
function createCards(obj) {
  mainContainer.classList.add("main__container");
  const wrapper = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const actor = document.createElement("p");
  const gender = document.createElement("p");
  const house = document.createElement("p");
  const wand = document.createElement("p");
  const alive = document.createElement("p");
  wrapper.classList.add("wrapper");
  img.setAttribute("src", "https://via.placeholder.com/334x192");
  img.setAttribute("alt", obj.name);
  img.setAttribute("width", "334");
  img.setAttribute("height", "192");
  title.classList.add("name_hero");
  title.textContent = obj.name;
  actor.textContent = "Actor: " + obj.actor;
  gender.textContent = "Gender: " + obj.gender;
  if (obj.house) {
    house.textContent = "House: " + obj.house;
  } else {
    house.textContent = "House: none";
  }
  wand.textContent = "Wand core: " + obj.wand.wood + obj.wand.core;
  if (obj.alive) {
    alive.textContent = "Alive: yes";
  } else {
    alive.textContent = "Alive: no";
  }
  main.append(mainContainer);
  mainContainer.append(wrapper);
  wrapper.append(img, title, actor, gender, house, wand, alive);
}
//Перебор и отрисовка массива карточек
function showCards(arr) {
  mainContainer.innerHTML = "";
  arr.forEach((elem) => {
    createCards(elem);
  });
}
//Фильтрует массив и вызывает функцию отрисовки
function createFilterDataArr() {
  let dataPreFiltered = data.filter((elem) =>
    elem.name.toLowerCase().includes(inputName.value.toLowerCase())
  );
  let dataFiltered;
  if (
    selectSchool.value !== "Choose one" &&
    selectSchool.value !== "Select all"
  ) {
    dataFiltered = dataPreFiltered.filter(
      (elem) => elem.house == selectSchool.value
    );
  } else {
    dataFiltered = dataPreFiltered;
  }
  showCards(dataFiltered);
}

createHeader();
showCards(data);
headForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
inputName.addEventListener("input", createFilterDataArr);
selectSchool.addEventListener("change", createFilterDataArr);
