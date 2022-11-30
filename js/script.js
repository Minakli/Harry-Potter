const header = document.querySelector("header");
const main = document.querySelector("main");
const headForm = document.createElement("form");
//Отрисовка header
function createHeader() {
  const headerContainer = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const labelName = document.createElement("label");
  const labelSchool = document.createElement("label");
  const inputName = document.createElement("input");
  const selectSchool = document.createElement("select");
  const decorLine = document.createElement("div");
  const optSchool_1 = document.createElement("option");
  const optSchool_2 = document.createElement("option");
  const optSchool_3 = document.createElement("option");
  const optSchool_4 = document.createElement("option");
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
  optSchool_1.setAttribute("disabled", "disabled");
  optSchool_1.setAttribute("selected", "selected");
  optSchool_1.textContent = "Choose one";
  optSchool_2.textContent = "sect";
  optSchool_3.textContent = "sect";
  optSchool_4.textContent = "sect";
  decorLine.classList.add("header__decorline");
  header.append(headerContainer);
  headerContainer.append(h1);
  headerContainer.append(h2);
  headerContainer.append(headForm);
  header.append(decorLine);
  headForm.append(labelName);
  headForm.append(labelSchool);
  labelName.append(inputName);
  labelSchool.append(selectSchool);
  selectSchool.append(optSchool_1);
  selectSchool.append(optSchool_2);
  selectSchool.append(optSchool_3);
  selectSchool.append(optSchool_4);
}

//Отрисовка main

createHeader();
headForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
