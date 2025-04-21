//global vars
let allEpisodes = []; //so I can access in other functions

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
            src="https://picsum.photos/350/450"
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
  episodeCode.textContent = formatSE(episode); //here innerHTML was breaking

  const episodeImage = document.createElement("img");
  episodeImage.classList.add("episodeImage");
  // episodeImage.src = "https://picsum.photos/200/300"; placeholder img for the time being
  // if image is missing for some reason, placehodlder so the content looks consistent
  episodeImage.src = episode.image?.medium || "https://picsum.photos/300/450";

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
  fetchOnce();
  // allEpisodes = getAllEpisodes(); //edited to use for filter - replaced by fetchOnce
  fetchAllShows();
  makePageForEpisodes(allEpisodes);
}

///////////////////////////////
// 200
const findButton = document.querySelector("#findButton");

// Search functionality
const findEpisode = () => {
  //to get access to allEpisodes
  // setup(); tried using to access allEpisodes, but it didnt work so I made a made it a global var
  // grab user text
  const userSearchTerm = document.querySelector("#searchInput").value;

  // filter shown based on title including the search term
  //taken from allEpisodes
  const filteredEpisodes = allEpisodes.filter((episode) => {
    //this was surprisingly frustrating. toLowerCase on both props covers the check for the case insensitive search
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
//search and clear buttons and a filter instead task-200

const useClearButton = document.querySelector("#clearButton");

useClearButton.addEventListener("click", () => {
  document.querySelector("#searchInput").value = "";
  //add hidden class to counterDiv
  counterDiv.classList.add("hidden");
  makePageForEpisodes(allEpisodes);
  showCountToUser(allEpisodes);
});

//live search
// Live search functionality
const liveSearchInput = document.querySelector("#liveSearchInput");

const liveSearch = () => {
  // grab user input
  const userSearchTerm = liveSearchInput.value.toLowerCase();

  // filter episodes by title or summary (case-insensitive)
  const filteredEpisodes = allEpisodes.filter((episode) => {
    const title = episode.name.toLowerCase();
    const summary = episode.summary?.toLowerCase() || "";
    return title.includes(userSearchTerm) || summary.includes(userSearchTerm);
  });

  // show the count to user
  showCountToUser(filteredEpisodes);

  // reload episodes view
  makePageForEpisodes(filteredEpisodes);

  // toggle counter visibility
  if (userSearchTerm === "") {
    counterDiv.classList.add("hidden");
  } else {
    counterDiv.classList.remove("hidden");
  }
};

// event listener for live input
liveSearchInput.addEventListener("input", liveSearch);

///////////////////////
// LVL 300

// coursework example is commented out below for my reference

// const state = {
//   films: [],
// searchTerm: "",

// const endpoint =
// "https://programming.codeyourfuture.io/dummy-apis/films.json";

//no need to put in state becuae of the global array at the top  (allEpisodes)

// const endpoint = "https://api.tvmaze.com/shows/82/episodes";

// courswork example
// const fetchFilms = async () => {
//   const response = await fetch(endpoint);
//   return await response.json();
// };

//my fetch based on teh coursework
// const fetchEpisodes = async () => {
//   const response = await fetch(endpoint);
//   return await response.json();
// };

//coursework example
// fetchFilms().then((films) => {
//   state.films = films;
//   render(); <---- I am using makePageForEpisodes instead of render
// });

//mine based on the coursework example
// function fetchOnce() {
//   //show loading to user
//   document.querySelector(".waiting").classList.remove("hidden");

//placed response here  so I can check response status
// const response = fetch(endpoint);

// fetchEpisodes().then((episodesFromAPI) => {
//below is my attempt on displaying an error to the user
// if (episodesFromAPI.status !== 200) { this check did not work, stuck at loading
// if (!episodesFromAPI) { this is stuck at loading again
// if (!Array.isArray(episodesFromAPI) || episodesFromAPI.length === 0) { here also stuck on the loading screen

//this is how i wanted to check for the error
// if (!episodesFromAPI) {
//display error to user
// alert("Oops! Something went wrong. Please try again later.");
// } else {

// populate the declared at the top empty array with episodes and show
//   allEpisodes = episodesFromAPI;
//   makePageForEpisodes(episodesFromAPI);
// });

// show the count to user
// hide loading for the user
//   document.querySelector(".waiting").classList.add("hidden");
// }

// here's the fixed so the error message works and deosn't get stuck on loading

const endpoint = "https://api.tvmaze.com/shows/82/episodes";

// implementation with correct error message
const fetchEpisodes = async () => {
  try {
    const response = await fetch(endpoint);

    // check if 200
    if (!response.ok) {
      throw new Error("Fetching episodes failed.");
    }

    // if 200 continue
    const episodesFromAPI = await response.json();

    // if episodesFromAPI is not an array
    if (!Array.isArray(episodesFromAPI)) {
      throw new Error("Episodes not found.");
    }
    // if is an array continue
    return episodesFromAPI;

    // //solution including catch block to log error to fix the forever loading
  } catch (error) {
    // console.error("Error fetching episodes:", error); to lor error properly
    //message shown to the user in case of an error
    alert("Oops! Something went wrong :( Please try again.");
    // in case of an error we return null
    return null;
  }
};

// fetchOnce
function fetchOnce() {
  // show loading to user
  document.querySelector(".waiting").classList.remove("hidden");

  // grab episodes
  fetchEpisodes()
    .then((episodesFromAPI) => {
      // if we have an error
      if (!episodesFromAPI) {
        alert("Oops! Something went wrong :( Please try again.");
      } else {
        // continue to populate the declared at the top empty array with episodes and show
        allEpisodes = episodesFromAPI;
        makePageForEpisodes(episodesFromAPI);
      }

      // hide loading messge
      document.querySelector(".waiting").classList.add("hidden");
    })
    .catch((error) => {
      // if error happens we display a message to the user
      // console.error("Error:", error); tto log error properly
      alert("Oops! Something went wrong :( Please try again.");

      // hide loading if we have an error
      document.querySelector(".waiting").classList.add("hidden");
    });
}

///////////////lvl 400
const select = document.querySelector("#select");

let dropdownShowsArray = [];
// episodes can beaccessed by id later
let dropdownShowEpisodes = {};

const endpointAllShows = "https://api.tvmaze.com/shows";

// fetch all shows from the API and add them to the dropdown
async function fetchAllShows() {
  const response = await fetch(endpointAllShows);

  // check if response is successful
  const showsFromAPI = await response.json();

  // place the shows in dropdownShowsArray
  dropdownShowsArray = showsFromAPI;

  // sort shows alphabetically and case-insensitive requirement
  // sample solution
  // function insensitive(s1, s2) {
  //   var s1lower = s1.toLowerCase();
  //   var s2lower = s2.toLowerCase();
  //   return s1lower > s2lower ? 1 : (s1lower < s2lower ? -1 : 0);
  // }
  //repurposed
  // Define the function that will compare two show names
  const sortShows = (s1, s2) => {
    const showTitleA = s1.toLowerCase();
    const showTitleB = s2.toLowerCase();
    return showTitleA > showTitleB ? 1 : showTitleA < showTitleB ? -1 : 0;
  };

  // sort alprabetically show name = title
  dropdownShowsArray.sort((a, b) => sortShows(a.name, b.name));
  //a more elegant solution found is
  // dropdownShowsArray = showsFromAPI.sort((a, b) =>
  //   a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  // );

  // add all shows to dropdown
  addShowsToDropdown(dropdownShowsArray);
}

// add shows to dropdown
function addShowsToDropdown(shows) {
  //repurposing code from earlier
  // const episodeDescription = document.createElement("p");
  // episodeDescription.classList.add("episodeDescription");
  // episodeDescription.innerHTML = episode.summary;
  // episodeCard.appendChild(episodeName);

  // add optionschildren to dropdown looping pver each show
  shows.forEach((show) => {
    const option = document.createElement("option");
    option.innerHTML = show.name;
    //here id needs to be added otherwise there is an error and does not display
    option.value = show.id;
    select.appendChild(option);
  });
}

// add event listener to dropdown wih all shows
select.addEventListener("change", function (event) {
  // gget id  of the show
  const showId = event.target.value;

  // check if a show is selected
  if (showId) {
    // fgrab and display selection
    fetchEpisodesForShow(showId).then(function (episodes) {
      // show in allEpisodes array
      allEpisodes = episodes;

      // display the episodes
      makePageForEpisodes(episodes);
    });
  }
});

// grab episodes for a selected show this is causing an
// issue of multiple fetches and stopped working after my attempts to fix
// async function fetchEpisodesForShow(showId) {
//   // requirement to only fetch once check if inside object dropdownShowEpisodes
//   if (dropdownShowEpisodes[showId]) {
//     return dropdownShowEpisodes[showId];
//   } else {
//     const endpointId = `https://api.tvmaze.com/shows/${showId}/episodes`;

//     const response = await fetch(endpointId);
//     const episodes = await response.json();
//     dropdownShowEpisodes[showId] = episodes;
//   }
//   return episodes;
// }

// so the above is split ito 2
// / function to fetch episodes per show once and store them
async function fetchEpisodesForShow(showId) {
  const endpointId = `https://api.tvmaze.com/shows/${showId}/episodes`;

  // fetch
  const response = await fetch(endpointId);
  const episodes = await response.json();

  // store the episodes in dropdownShow
  dropdownShowEpisodes[showId] = episodes;

  // return the episodes
  return episodes;
}

// function to get episodes for a show by id, using the cache if available
async function getEpisodesForShowById(showId) {
  // check if episodes for this show are already in the cache
  if (dropdownShowEpisodes[showId]) {
    return dropdownShowEpisodes[showId];
  } else {
    // if not in cache, fetch them
    return await fetchEpisodesForShow(showId);
  }
}

window.onload = setup;
