// modal
const BASE_URL = "https://restcountries.com/v2/";
const DATA = { countries: [], neighbors: [] };

// view
function createNewCard(oneCountry, isNeighbor) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "country";
  if (!isNeighbor) {
    cardContainer.id = oneCountry.name;
  }
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

function updateCountries() {
  const countriesContainer = document.querySelector(".countries");
  countriesContainer.innerHTML = "";
  const countriesContainerTitle = document.querySelector(".countries-title");
  if (DATA.countries.length > 0) {
    countriesContainerTitle.className = "countries-title show";
    DATA.countries.forEach((each) => {
      const newCard = createNewCard(each, false);
      countriesContainer.append(newCard);
    });
  } else {
    countriesContainerTitle.className = "countries-title";
  }
}

function updateNeighbors() {
  const neighborsContainer = document.querySelector(".neighbors");
  neighborsContainer.innerHTML = "";
  const neighborsContainerTitle = document.querySelector(".neighbors-title");
  if (DATA.neighbors.length > 0) {
    neighborsContainerTitle.className = "neighbors-title show";
    DATA.neighbors.forEach((each) => {
      const newNeighbors = createNewCard(each, true);
      neighborsContainer.append(newNeighbors);
    });
  } else {
    neighborsContainerTitle.className = "neighbors-title";
  }
}

// controller
const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".input");

const cardClickBtn = document.querySelector(".countries");

function clickSearch() {
  const searchVal = searchInput.value;
  searchInput.value = "";
  fetch(`${BASE_URL}name/${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
      DATA.countries = data;
      DATA.neighbors = [];
      updateCountries();
      updateNeighbors();
    });
}

function clickCard(event) {
  const eventParent = event.target.closest(".country");
  if (eventParent) {
    const clickedCountry = eventParent.id;
    const [filteredCountry] = DATA.countries.filter((each) => {
      return each.name === clickedCountry;
    });
    if (filteredCountry.borders) {
      const clickedNeighbors = filteredCountry.borders;
      let formatNeighbors = "";
      clickedNeighbors.forEach((each) => {
        formatNeighbors += `${each},`;
      });
      fetch(`${BASE_URL}alpha?codes=${formatNeighbors}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          DATA.neighbors = data;
          updateNeighbors();
        });
    } else {
      DATA.neighbors = [];
      updateNeighbors();
    }
  }
}
searchBtn.addEventListener("click", clickSearch);

cardClickBtn.addEventListener("click", clickCard);
