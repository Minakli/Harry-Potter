import { importData } from "./data.js";
const header = document.querySelector("header");
const main = document.querySelector("main");
const mainWrapper = document.createElement("div");
const headForm = document.createElement("form");

let count = 0;
//Likes props add
importData.map((item) => {
  item.isLiked = false;
});
//Array
let data;
// if (localStorage.getItem("dataFiltred")) {

// }
if (localStorage.getItem("data")) {
  data = JSON.parse(localStorage.getItem("data"));
} else {
  data = importData;
}

let dataFiltred = data;
if (localStorage.getItem("dataFiltred")) {
  dataFiltred = JSON.parse(localStorage.getItem("dataFiltred"));
}
//InputName
const inputName = document.createElement("input");
inputName.value = localStorage.getItem("inputName");
//selectSchool
const selectSchool = document.createElement("select");
selectSchool.value = localStorage.getItem("selectSchool");
console.log(selectSchool.value);
console.log(dataFiltred[0]);
//Schools
const schoolsTmp = importData.map((elem) =>
  elem.house ? (elem = elem.house) : null
);
const schools = [...new Set(schoolsTmp)].filter((item) => item !== null);
// schools.unshift("Any school");

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
  inputName.setAttribute("type", "text");
  inputName.setAttribute("id", "input__name");
  inputName.setAttribute("placeholder", "Hermione");
  selectSchool.setAttribute("type", "text");
  selectSchool.setAttribute("id", "input__school");
  // optSchool_1.setAttribute("disabled", "disabled");
  optSchool_1.setAttribute("selected", "selected");
  optSchool_1.textContent = "Choose one";
  header.append(headerContainer);
  headerContainer.append(h1);
  headerContainer.append(h2);
  headerContainer.append(headForm);
  headForm.append(labelName);
  headForm.append(labelSchool);
  labelName.append(inputName);
  labelSchool.append(selectSchool);
  selectSchool.append(optSchool_1);
  //options
  schools.forEach((elem) => {
    const option = document.createElement("option");
    selectSchool.append(option);
    option.textContent = elem;
    option.setAttribute("value", elem);
    // localStorage.getItem("selectSchool") == option
    //   ? option.setAttribute("selected", "selected")
    //   : null;
  });
  //inputName
  inputName.addEventListener("change", () => {
    selectSchool.value == "Choose one"
      ? inputName.value
        ? (dataFiltred = data.filter((elem) =>
            elem.name.toLowerCase().includes(inputName.value.toLowerCase())
          ))
        : (dataFiltred = data)
      : inputName.value
      ? (dataFiltred = data.filter(
          (elem) =>
            elem.name.toLowerCase().includes(inputName.value.toLowerCase()) &&
            elem.house == selectSchool.value
        ))
      : null;
    localStorage.setItem("dataFiltred", JSON.stringify(dataFiltred));
    localStorage.setItem("inputName", inputName.value);
    location.reload();
  });
  //selectSchool
  selectSchool.addEventListener("change", () => {
    selectSchool.value == "Choose one"
      ? inputName.value
        ? (dataFiltred = data.filter((elem) =>
            elem.name.toLowerCase().includes(inputName.value.toLowerCase())
          ))
        : (dataFiltred = data)
      : inputName.value
      ? (dataFiltred = data.filter(
          (elem) =>
            elem.name.toLowerCase().includes(inputName.value.toLowerCase()) &&
            elem.house == selectSchool.value
        ))
      : null;
    localStorage.setItem("dataFiltred", JSON.stringify(dataFiltred));
    localStorage.setItem("inputName", inputName.value);
    localStorage.setItem("selectSchool", selectSchool.value);
    location.reload();
  });
}

//main
function createMain() {
  mainWrapper.classList.add("main__wrapper");
  main.append(mainWrapper);
  dataFiltred.forEach(createCard);
}
//card
function createCard(unit) {
  let id = "w_" + count;
  unit.id = id;
  count++;
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
    localStorage.setItem("dataFiltred", JSON.stringify(dataFiltred));
    location.reload();
  });
  card.append(like);
  const likeImg = document.createElement("img");
  likeImg.classList.add("card__like_img");
  like.append(likeImg);
  unit.isLiked
    ? likeImg.setAttribute("src", "../images/Heart_red.svg")
    : likeImg.setAttribute("src", "../images/Heart_white.svg");
  likeImg.setAttribute("id", { id });
  likeImg.setAttribute("alt", "heart");
  likeImg.setAttribute("width", "24");
  likeImg.setAttribute("height", "23");
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card__title");
  cardTitle.textContent = unit.name;
  card.append(cardTitle);
  const cardActor = document.createElement("p");
  cardActor.classList.add("unit_stats");
  cardActor.textContent = "Actor: " + unit.actor;
  card.append(cardActor);
  const cardGender = document.createElement("p");
  cardGender.classList.add("unit_stats");
  cardGender.textContent = "Gender: " + unit.gender;
  card.append(cardGender);
  const cardHouse = document.createElement("p");
  cardHouse.classList.add("unit_stats");
  unit.house
    ? (cardHouse.textContent = "House: " + unit.house)
    : (cardHouse.textContent = "House :");
  card.append(cardHouse);
  const cardWard = document.createElement("p");
  cardWard.classList.add("unit_stats");
  cardWard.textContent = "Wand core: " + unit.wand.core;
  card.append(cardWard);
  const cardAlive = document.createElement("p");
  cardAlive.classList.add("unit_stats");
  unit.alive
    ? (cardAlive.textContent = "Alive: yes")
    : (cardAlive.textContent = "Alive: no");
  card.append(cardAlive);
}

createHeader();
createMain();
headForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
