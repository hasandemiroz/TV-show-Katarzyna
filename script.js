// helpers
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
  episodeImage.src = "https://picsum.photos/200/300";

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
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
