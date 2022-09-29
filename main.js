const submitButton = document.querySelector('#submitButton');
let searchInput = document.querySelector('#searchField');
let form = document.querySelector('#form');
let resultsAudio = document.getElementById('audio');
let results = document.getElementById('results');


function buildGrid(showResults) {
    for (let info of showResults) {
        let resultsDiv = document.createElement('div');
        let resultsPic = document.createElement('img');
        let wordsBox = document.createElement('div');
        let artistNameDisplay= document.createElement('p');
        let resultsName = document.createElement('h5');
        let songNameDisplay= document.createElement('p');
        let resultsSong = document.createElement('h5');
        let audioButton = document.createElement('button');

        resultsPic.src = `${info.artworkUrl100}`;
        artistNameDisplay.innerText = `Artist name:`
        resultsName.innerText = `${info.artistName}`;
        songNameDisplay.innerText = `Song title:`
        resultsSong.innerText = `${info.trackName}`;
        audioButton.innerText = `play preview`;

        resultsDiv.classList.add('resultBox');
        wordsBox.classList.add('wordsBox');
        resultsPic.classList.add('resultImage');
        resultsName.classList.add('resultName');
        resultsSong.classList.add('resultTrack');
        audioButton.classList.add('resultPrev');
    
    audioButton.addEventListener('click', event => {
        resultsAudio.src = "";
        resultsAudio.src = `${info.previewUrl}`;
        resultsAudio.volume = 0.1;
    })

    resultsDiv.appendChild(resultsPic);
    resultsDiv.appendChild(wordsBox);
    wordsBox.appendChild(artistNameDisplay);
    wordsBox.appendChild(resultsName);
    wordsBox.appendChild(songNameDisplay);
    wordsBox.appendChild(resultsSong);
    resultsDiv.appendChild(audioButton);
    results.appendChild(resultsDiv);
}
}

form.addEventListener("submit", event => {
    event.preventDefault();

    searchRequest = searchInput.value
    url = `https://itunes.apple.com/search?term=${searchRequest}&entity=song&limit=20`;

    fetch(url, {
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (musicData) {
            results.innerText = '';
            console.log(musicData.results)
            buildGrid(musicData.results);
        })
})
