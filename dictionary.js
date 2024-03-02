// dictionary.js

// Function to fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.dictionary;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to search the dictionary
async function searchDictionary() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (searchInput === "") {
    return;
  }

  const dictionaryData = await fetchData();

  const results = Object.entries(dictionaryData)
    .filter(
      ([word]) =>
        word.toLowerCase().includes(searchInput) ||
        dictionaryData[word].toLowerCase().includes(searchInput)
    )
    .map(
      ([arabic, english]) =>
        `<div class="result-item"><strong>${arabic}</strong>: ${english}</div>`
    );

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    resultsContainer.innerHTML = results.join("");
  }
}

// Initial data load on page load
document.addEventListener("DOMContentLoaded", async () => {
  await searchDictionary();
});
