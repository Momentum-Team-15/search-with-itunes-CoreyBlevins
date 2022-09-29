let submitButton = document.querySelector('#submitButton');
let searchInput = document.querySelector('#searchField');
let form = document.querySelector('#form');
let resultsAudio = document.getElementById('audio');
let results = document.getElementById('results');

form.addEventListener("submit", event => {
    event.preventDefault();

    searchRequest = searchInput.value;
    url = `https://itunes.apple.com/search?term=${searchRequest}&entity=song&limit=30`;

    fetch(url, {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (musicData) {
            results.innerText = '';
            console.log(musicData.results);
            buildGrid(musicData.results);
            if (musicData.results.length === 0){
                buildTryAgain();
            }
        })
})

function buildGrid(showResults) {
    for (let info of showResults) {
        let resultsDiv = document.createElement('div');
        let resultsPic = document.createElement('img');
        let wordsBox = document.createElement('div');
        let artistNameDisplay = document.createElement('p');
        let resultsName = document.createElement('h5');
        let songNameDisplay = document.createElement('p');
        let resultsSong = document.createElement('h5');
        let buttonBox = document.createElement('div');
        let audioButton = document.createElement('button');
        let pauseButton = document.createElement('button');

        resultsPic.src = `${info.artworkUrl100}`;
        artistNameDisplay.innerText = `Artist name:`
        resultsName.innerText = `${info.artistName}`;
        songNameDisplay.innerText = `Song title:`
        resultsSong.innerText = `${info.trackName}`;
        audioButton.innerText = `play preview`;
        pauseButton.innerText = `pause preview`;

        resultsDiv.classList.add('resultBox');
        wordsBox.classList.add('wordsBox');
        resultsPic.classList.add('resultImage');
        resultsName.classList.add('resultName');
        resultsSong.classList.add('resultTrack');
        buttonBox.classList.add('buttonBox');
        audioButton.classList.add('resultPreview');
        pauseButton.classList.add('previewPause');

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
        resultsDiv.appendChild(resultsPic);
        resultsDiv.appendChild(wordsBox);
        wordsBox.appendChild(artistNameDisplay);
        wordsBox.appendChild(resultsName);
        wordsBox.appendChild(songNameDisplay);
        wordsBox.appendChild(resultsSong);
        resultsDiv.appendChild(buttonBox);
        buttonBox.appendChild(audioButton);
        buttonBox.appendChild(pauseButton);
        results.appendChild(resultsDiv);
    }
}
function buildTryAgain() {
    let tryAgainDiv = document.createElement('div');
    let tryAgainText = document.createElement('h3');

    tryAgainDiv.classList.add('tryAgainDiv');

    tryAgainText.innerText = `Sorry, no results. Try again.`;

    tryAgainDiv.appendChild(tryAgainText);
    results.appendChild(tryAgainDiv);

}