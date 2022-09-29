let form = document.getElementById('form');
let searchInput = document.getElementById('searchField');
let submitButton = document.getElementById('submitButton');
let resultsAudio = document.getElementById('audio');
let resultField = document.getElementById('results');

form.addEventListener("submit", event => {
    event.preventDefault();

    searchRequest = searchInput.value;
    url = `https://itunes.apple.com/search?term=${searchRequest}&entity=song&limit=30`;

    fetch(url, {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (songData) {
            resultField.innerText = '';
            console.log(songData.results);
            buildGrid(songData.results);
            if (songData.results.length === 0) {
                buildTryAgain();
            }
        })
})

function buildGrid(showResults) {
    for (let info of showResults) {
        let resultsDiv = document.createElement('div');
        let resultsImage = document.createElement('img');
        let wordBox = document.createElement('div');
        let artistNameDisplay = document.createElement('p');
        let resultsArtist = document.createElement('h5');
        let songNameDisplay = document.createElement('p');
        let resultsSong = document.createElement('h5');
        let buttonBox = document.createElement('div');
        let audioButton = document.createElement('button');
        let pauseButton = document.createElement('button');

        resultsImage.src = `${info.artworkUrl100}`;
        artistNameDisplay.innerText = `Artist name:`
        resultsArtist.innerText = `${info.artistName}`;
        songNameDisplay.innerText = `Song title:`
        resultsSong.innerText = `${info.trackName}`;
        audioButton.innerText = `play preview`;
        pauseButton.innerText = `pause preview`;

        resultsDiv.classList.add('resultBox');
        wordBox.classList.add('wordBox');
        resultsImage.classList.add('resultImage');
        resultsArtist.classList.add('resultArtist');
        resultsSong.classList.add('resultSong');
        buttonBox.classList.add('buttonBox');
        audioButton.classList.add('audioPlay');
        pauseButton.classList.add('audioPause');

        audioButton.addEventListener('click', event => {
            resultsAudio.src = "";
            resultsAudio.src = `${info.previewUrl}`;
            resultsAudio.volume = 0.1;
        })
        pauseButton.addEventListener('click', event => {
            for (let i = 0; i < 30; i++) {
                resultsAudio.pause();
            }
        })
        resultsDiv.appendChild(resultsImage);
        resultsDiv.appendChild(wordBox);
        wordBox.appendChild(artistNameDisplay);
        wordBox.appendChild(resultsArtist);
        wordBox.appendChild(songNameDisplay);
        wordBox.appendChild(resultsSong);
        resultsDiv.appendChild(buttonBox);
        buttonBox.appendChild(audioButton);
        buttonBox.appendChild(pauseButton);
        resultField.appendChild(resultsDiv);
    }
}
function buildTryAgain() {
    let tryAgainDiv = document.createElement('div');
    let tryAgainText = document.createElement('h3');

    tryAgainDiv.classList.add('tryAgainDiv');

    tryAgainText.innerText = `Sorry, no results. Try again.`;

    tryAgainDiv.appendChild(tryAgainText);
    resultField.appendChild(tryAgainDiv);

}