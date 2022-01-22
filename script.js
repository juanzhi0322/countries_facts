// modal
const BASE_URL = "https://restcountries.com/v2/";
const DATA = { countries: [], neighbors: [] };

// view
function createNewCard(oneCountry) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "country";
  cardContainer.innerHTML = `
  <img class="country__img" src="${oneCountry.flag}" />
  <div class="country__data">
    <h3 class="country__name">${oneCountry.name}</h3>
    <h4 class="country__region">${oneCountry.region}</h4>
    <p class="country__row"><span>👫</span>${oneCountry.population}</p>
    <p class="country__row"><span>🗣️</span>${oneCountry.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${oneCountry.currencies[0].name}</p>
  </div>
  `;
  return cardContainer;
}
function updateView() {
  const countriesContainer = document.querySelector(".countries");
  countriesContainer.innerHTML = "";
  DATA.countries.forEach((each) => {
    const newCard = createNewCard(each);
    countriesContainer.append(newCard);
  });
}

// controller
const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".input");
function clickSearch() {
  const searchVal = searchInput.value;
  searchInput.value = "";
  fetch(`${BASE_URL}name/${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
      DATA.countries = data;
      updateView();
    });
}
searchBtn.addEventListener("click", clickSearch);
