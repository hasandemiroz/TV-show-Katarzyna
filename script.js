//global vars
let allEpisodes = []; //so i can access in other functions
const searchBox = document.querySelector("#searchBox");
//to hide counterDiv by default
const counterDiv = document.querySelector(".counterDiv");

// 100
// // helpers
const formatSE = (episode) => {
  // if (episodeSeason < 10 || episodeNumber < 10) no need pad is auto {
  const seasonStr = episode.season.toString().padStart(2, "0"); // Fixed: episodeSeason -> episode.season
  const episodeStr = episode.number.toString().padStart(2, "0"); // Fixed: episodeNumber -> episode.number
  return `S${seasonStr}E${episodeStr}`;
};

//create HTML structure of a card
`<div class="tvShowCard">
          <h5 class="episodeName">fff</h5>
          <p class="episodeCode">fff</p>
          <img
            class="episodeImage"
            src="https://picsum.photos/200/300"
            alt="tv show image"
          />
          <p class="episodeDescription"></p>
        </div`;

`episodeCard = {
          name: 
          season: 
          number: 
          summary:
        }
          create episodeCode using se and num;`;

const generateCard = (episode) => {
  const episodeCard = document.createElement("div");
  episodeCard.classList.add("tvShowCard");

  const episodeName = document.createElement("h5");
  episodeName.classList.add("episodeName");
  episodeName.innerHTML = episode.name;

  //format episode code
  const episodeCode = document.createElement("p");
  // const episodeSeason = document.createElement("p");
  // const episodeNumber = document.createElement("p");
  episodeCode.classList.add("episodeCode");
  episodeCode.textContent = formatSE(episode); // Set the formatted episode code to textContent

  const episodeImage = document.createElement("img");
  episodeImage.classList.add("episodeImage");
  if (episode.image && episode.image.medium) {
    episodeImage.src = episode.image.medium;
  } else {
    episodeImage.src = "https://via.placeholder.com/210x295?text=No+Image";
  }
  episodeImage.alt = episode.name + " image";

  const episodeDescription = document.createElement("p");
  episodeDescription.classList.add("episodeDescription");
  episodeDescription.innerHTML = episode.summary;

  //appends all to card
  episodeCard.appendChild(episodeName);
  episodeCard.appendChild(episodeCode);
  episodeCard.appendChild(episodeImage);
  episodeCard.appendChild(episodeDescription);

  return episodeCard;
};

function makePageForEpisodes(episodeList) {
  const tvShowsContainer = document.querySelector(".tvShowsContainer");

  //clear old content
  tvShowsContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeCard = generateCard(episode);
    //add cards
    tvShowsContainer.appendChild(episodeCard);
  });
}

//do not change getAllEpisodes function
function setup() {
  allEpisodes = getAllEpisodes(); //edited to use for filter
  makePageForEpisodes(allEpisodes);
}

///////////////////////////////
// 200
const findButton = document.querySelector("#findButton");

// Search functionality
const findEpisode = () => {
  //to get access to allEpisodes
  // setup(); to access allEpisodes, but it didnt wokr so I made a global on top
  // grab user text
  const userSearchTerm = document.querySelector("#searchInput").value;

  // filter shown based on title including the search term
  //taken from allEpisodes
  const filteredEpisodes = allEpisodes.filter((episode) => {
    //this was surprisingly frustrating
    return episode.name.toLowerCase().includes(userSearchTerm.toLowerCase());
  });

  // show the count to user
  showCountToUser(filteredEpisodes);

  // reload to see
  makePageForEpisodes(filteredEpisodes);

  // clear user input
  userSearchTerm.value = "";
};

// helper - display counts to user
const showCountToUser = (filteredEpisodes) => {
  const howManyMatch = document.querySelector("#howManyMatch");
  const howManyInTotal = document.querySelector("#howManyInTotal");

  // Display the number of matches and total episodes
  howManyMatch.innerHTML = filteredEpisodes.length;
  howManyInTotal.innerHTML = allEpisodes.length;

  //adjacentHTML was not woking for me so instead removing hidden by default class
  //children to append to searchBox, using adjacentHTML instead of placing in vars to append child
  // searchBox.insertAdjacentHTML(
  //   "beforeend",
  //   `
  //   <p id="resultCounter">Showing</p>
  //   <p id="howManyMatch">${filteredEpisodes.length}</p>
  //   <p>/</p>
  //   <p id="howManyInTotal">${allEpisodes.length}</p>
  // `

  //remove hidden class from counterHidden
  counterDiv.classList.remove("hidden");
};

// event listener for button
findButton.addEventListener("click", findEpisode);

//////////////////////////////////////////////////////////
//live search - tried impementing but it was not working after maaany attempts and
// I have a search and clear buttons and a filter instead task-200

const useClearButton = document.querySelector("#clearButton");

useClearButton.addEventListener("click", () => {
  document.querySelector("#searchInput").value = "";
  //add hidden class to counterDiv
  counterDiv.classList.add("hidden");
  makePageForEpisodes(allEpisodes);
  showCountToUser(allEpisodes);
});

window.onload = setup;
