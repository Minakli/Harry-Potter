import { importData } from "./data.js";
const header = document.querySelector("header");
const main = document.querySelector("main");
const mainWrapper = document.createElement("div");
const headForm = document.createElement("form");
const inputName = document.createElement("input");
const selectSchool = document.createElement("select");

//like
importData.map((item) => {
  item.isLiked = false;
});
//add filtered array
let dataFiltered = importData;

//schools array
const schoolsTmp = importData.map((elem) =>
  elem.house ? (elem = elem.house) : null
);
const schools = [...new Set(schoolsTmp)].filter((item) => item !== null);

//Отрисовка header
function createHeader() {
  const headerContainer = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const labelName = document.createElement("label");
  const labelSchool = document.createElement("label");
  const optSchool_1 = document.createElement("option");
  headerContainer.classList.add("header__container");
  h1.textContent = "Harry Potter";
  h2.textContent = "View all characters from the Harry Potter universe";
  labelName.setAttribute("for", "input__name");
  labelSchool.setAttribute("for", "input__school");
  labelName.textContent = "Name";
  labelSchool.textContent = "School";
  inputName.setAttribute(`type`, `text`);
  inputName.setAttribute("id", "input__name");
  inputName.setAttribute("placeholder", "   Select unit");
  selectSchool.setAttribute("type", "text");
  selectSchool.setAttribute("id", "input__school");
  optSchool_1.setAttribute("selected", "selected");
  optSchool_1.textContent = "Choose one";
  optSchool_1.setAttribute("value", "");
  header.append(headerContainer);
  headerContainer.append(h1, h2, headForm);
  headForm.append(labelName, labelSchool);
  labelName.append(inputName);
  labelSchool.append(selectSchool);
  selectSchool.append(optSchool_1);

  //options
  schools.forEach((elem) => {
    const option = document.createElement("option");
    selectSchool.append(option);
    option.textContent = elem;
    option.setAttribute("value", elem);
  });

  //inputName
  inputName.addEventListener("input", search);
  //selectSchool
  selectSchool.addEventListener("change", search);
}

//main
function createMain(arr) {
  mainWrapper.classList.add("main__wrapper");
  main.append(mainWrapper);
  arr.forEach(createCard);
}
//card
function createCard(unit) {
  const card = document.createElement("div");
  card.classList.add("card");
  mainWrapper.append(card);
  const cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.setAttribute("src", unit.image);
  cardImg.setAttribute("width", "334");
  cardImg.setAttribute("height", "192");
  cardImg.setAttribute("alt", unit.name);
  card.append(cardImg);
  const like = document.createElement("button");
  like.classList.add("card__like");
  like.addEventListener("click", (event) => {
    unit.isLiked ? (unit.isLiked = false) : (unit.isLiked = true);
    mainWrapper.innerHTML = "";
    createMain(dataFiltered);
  });

  card.append(like);
  const likeImg = document.createElement("img");
  likeImg.classList.add("card__like_img");
  like.append(likeImg);
  unit.isLiked
    ? likeImg.setAttribute("src", "../images/Heart_red.svg")
    : likeImg.setAttribute("src", "../images/Heart_white.svg");
  // likeImg.setAttribute("id", { id });
  likeImg.setAttribute("alt", "heart");
  likeImg.setAttribute("width", "24");
  likeImg.setAttribute("height", "23");
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card__title");
  cardTitle.textContent = unit.name;
  const cardActor = document.createElement("p");
  cardActor.classList.add("unit_stats");
  cardActor.textContent = "Actor: " + unit.actor;
  const cardGender = document.createElement("p");
  cardGender.classList.add("unit_stats");
  cardGender.textContent = "Gender: " + unit.gender;
  const cardHouse = document.createElement("p");
  cardHouse.classList.add("unit_stats");
  unit.house
    ? (cardHouse.textContent = "House: " + unit.house)
    : (cardHouse.textContent = "House :");
  const cardWard = document.createElement("p");
  cardWard.classList.add("unit_stats");
  cardWard.textContent = "Wand core: " + unit.wand.core;
  const cardAlive = document.createElement("p");
  cardAlive.classList.add("unit_stats");
  unit.alive
    ? (cardAlive.textContent = "Alive: yes")
    : (cardAlive.textContent = "Alive: no");
  card.append(cardTitle, cardActor, cardGender, cardHouse, cardWard, cardAlive);
}

//search
function search() {
  dataFiltered = importData
    .filter((elem) =>
      elem.name.toLowerCase().includes(inputName.value.toLowerCase())
    )
    .filter((elem) => elem.house.includes(selectSchool.value));
  console.log(dataFiltered);
  mainWrapper.innerHTML = "";
  createMain(dataFiltered);
}

createHeader();
createMain(importData);
