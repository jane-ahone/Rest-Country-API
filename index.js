let paginationControls = document.querySelector("main"); // Ensure this exists in your HTML
var itemsPerPage = 15;
var currentPage = 1;
var numberOfPages;
let countriesData = []; // Declare globally for use in functions

const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Parse the JSON data
  } catch (error) {
    console.log("There's been an error:", error.message);
    return [];
  }
};

// Function to render countries
const renderCountries = (data) => {
  const countryDiv = document.querySelector(".countries-data");
  countryDiv.innerHTML = ""; // Clear previous content

  data.forEach((country) => {
    const newContainer = document.createElement("div");
    newContainer.classList.add("info-container");

    newContainer.addEventListener("click", () => {
      window.location.href = `country.html?name=${country.name.common}`;
    });

    const newFlagDiv = document.createElement("div");
    newFlagDiv.classList.add("flag-div");
    const newFlag = document.createElement("img");
    newFlag.src = country.flags?.png || country.flags?.svg;
    newFlag.alt = `Flag of ${country.name.common}`;
    newFlag.classList.add("country-flag");
    newFlagDiv.appendChild(newFlag);

    const newDiv = document.createElement("div");
    newDiv.classList.add("country-card");

    const newName = document.createElement("h3");
    newName.textContent = country.name.common;
    newName.classList.add("country-name");

    const newPop = document.createElement("p");
    newPop.innerHTML = `<span class="country-title">Population:</span> ${country.population.toLocaleString()}`;
    newPop.classList.add("country-population");

    const newRegion = document.createElement("p");
    newRegion.innerHTML = `<span class="country-title">Region:</span> ${country.region}`;
    newRegion.classList.add("country-region");

    const newCapital = document.createElement("p");
    newCapital.innerHTML = `<span class="country-title">Capital:</span> ${
      country.capital ? country.capital[0] : "N/A"
    }`;
    newCapital.classList.add("country-capital");

    newDiv.append(newName, newPop, newRegion, newCapital);
    newContainer.append(newFlagDiv, newDiv);
    countryDiv.appendChild(newContainer);
  });
};

// Fetch and Initialize Data

const renderPaginatedData = () => {
  const searchValue = document
    .querySelector(".search-bar input")
    .value.toLowerCase();
  const regionValue = document.querySelector("#region-filter").value;

  const filteredData = countriesData.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchValue);
    const matchesRegion = regionValue === "" || country.region === regionValue;
    return matchesSearch && matchesRegion;
  });

  console.log(searchValue, regionValue);
  console.log(filteredData);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(paginatedData, currentPage, itemsPerPage);

  numberOfPages = Math.ceil(filteredData.length / itemsPerPage);
  console.log(filteredData);
  renderCountries(paginatedData);
  renderPaginationControls(numberOfPages);
};

const renderPaginationControls = (numberOfPages) => {
  console.log(numberOfPages);
  // Clear existing pagination controls
  const existingPagination = document.querySelector(".pagination-controls");
  if (existingPagination) existingPagination.remove();

  // Create new pagination controls
  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("pagination-controls");

  for (let index = 1; index <= numberOfPages; index++) {
    const page = document.createElement("span");
    page.classList.add("page-btn");
    page.textContent = index; // Set the text to the current page number

    // Highlight the current page
    if (index === currentPage) {
      page.classList.add("active");
    }

    // Add click event listener
    page.addEventListener("click", (e) => {
      currentPage = parseInt(e.target.innerText); // Update current page
      renderPaginatedData(); // Re-render data for the new page
      renderPaginationData(numberOfPages); // Re-render pagination controls
    });

    paginationDiv.appendChild(page); // Append to the pagination container
  }

  paginationControls.appendChild(paginationDiv);
};

// Event Listeners
document
  .querySelector("#search-icon")
  .addEventListener("click", renderPaginatedData);
document
  .querySelector("#region-filter")
  .addEventListener("change", renderPaginatedData);

(async () => {
  countriesData = await fetchCountries();

  // Pagination
  numberOfPages = Math.ceil(countriesData.length / itemsPerPage);

  renderPaginatedData();
  renderPaginationControls(numberOfPages);
})();
