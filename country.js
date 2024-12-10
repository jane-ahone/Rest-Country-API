// Parse the query string to get the country name
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("name");

async function fetchCountryDetails(name) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) {
      throw new Error("Country not found!");
    }
    const countryData = await response.json();
    displayCountryDetails(countryData[0]); // Use the first match
  } catch (error) {
    console.error("Error:", error);
  }
}

if (countryName) {
  fetchCountryDetails(countryName);
}

function displayCountryDetails(country) {
  const countryDetails = document.querySelector(".country-details");
  const newContainer = document.createElement("div");
  newContainer.classList.add("info-container");

  const newFlagDiv = document.createElement("div");
  newFlagDiv.classList.add("flag-div");
  const newFlag = document.createElement("img");
  newFlag.src = country.flags?.png || country.flags?.svg;
  newFlag.alt = `Flag of ${country.name.common}`;
  newFlag.classList.add("country-flag");
  newFlagDiv.appendChild(newFlag);

  const newDiv = document.createElement("div");
  newDiv.classList.add("country-card");

  const newName = document.createElement("h1");
  newName.textContent = country.name.common;
  newName.classList.add("country-name");

  const nativeName = document.createElement("p");
  nativeName.innerHTML = `<span class="country-title">Native Name:</span> ${
    Object.values(country.name.nativeName)[0].common
  }`;
  nativeName.classList.add("country-native-name");

  const newPop = document.createElement("p");
  newPop.innerHTML = `<span class="country-title">Population:</span> ${country.population.toLocaleString()}`;
  newPop.classList.add("country-population");

  const newSubRegion = document.createElement("p");
  if (country.subregion) {
    newSubRegion.innerHTML = `<span class="country-title">Sub-Region:</span> ${country.subregion}`;
    newSubRegion.classList.add("country-subregion");
  }

  const newRegion = document.createElement("p");
  newRegion.innerHTML = `<span class="country-title">Region:</span> ${country.region}`;
  newRegion.classList.add("country-region");

  const newCapital = document.createElement("p");
  newCapital.innerHTML = `<span class="country-title">Capital:</span> ${
    country.capital ? country.capital[0] : "N/A"
  }`;
  newCapital.classList.add("country-capital");

  const topLevel = document.createElement("p");
  topLevel.innerHTML = `<span class="country-title">Top Level Domain:</span> ${country.tld}`; //may need to change to a loop
  topLevel.classList.add("country-tld");

  const currency = document.createElement("p");
  currency.innerHTML = `<span class="country-title">Currency:</span> ${
    Object.values(country.currencies)[0].name
  }`; //may need to change to a loop
  currency.classList.add("country-currency");

  const languages = document.createElement("p");
  languages.innerHTML = `<span class="country-title">Languages: </span> <span> ${Object.values(
    country.languages
  )}</span>`; //may need to change to a loop
  languages.classList.add("country-languages");

  const border = document.createElement("p");

  {
    country.borders
      ? (border.innerHTML = `<span class="country-title">Border Countries:</span> <span>  ${country.borders
          .map((border) => {
            return `<a href="./country.html?name=${border}"><button class="border-btn">${border}</button></a>`;
          })
          .join("")} </span>`) // Join without any separator to avoid commas
      : null;
  }

  border.classList.add("country-border");

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("desc-container");

  newDiv.append(
    nativeName,
    topLevel,
    newPop,
    currency,
    newRegion,
    languages,
    country.subregion ? newSubRegion : "",
    newCapital
  );
  descriptionContainer.append(newName, newDiv, country.borders ? border : "");
  newContainer.append(newFlagDiv, descriptionContainer);
  countryDetails.appendChild(newContainer);
}
