const endpoint = "";
let selectedSong;

window.addEventListener("load", initApp);

function initApp() {
    document.querySelector("form-create").addEventListener("submit", createSong);
    document.querySelector("form-update").addEventListener("submit", updateSong);
}   

async function updateSongsGrid() {
    const song = await readsongs();
    displaySongs(songs);
} 

async function readSongs() {
    const response = await fetch(`${endpoint}/songs`);
    const data = await response.json();
    return data;
}

function displaySongs(list) {
    document.querySelector("#songs-grid").innerHTML = "";

    for (const song of list) {
        document.querySelector("#songs-grid").insertAdjacentElement(
            "beforeend",
            /*html*/ `
            <article>
            <img src="${song.image}">
            <h2>${song.name}</h2>
            <p>${song.title}</p>
            <a href="songto:${song.artist}">${song.artist}</a>
            <div class="btns">
            <button class="btn-update-song">Update</button>
            <button class="btn-delete-song">Delete</button>
            </div>
            </article>
            `
        );
        document
            .querySelector("#songs-grid article: last-child .btn-delete-song")
            .addEventListener("click", () => deleteSong(song));
        document
            .querySelector("#songs-grid article:last-child .btn-update-song")
            .addEventListener("click", () => selectSong(song));
    }

}

async function createSong(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const title = event.target.title.value;
    const mail = event.target.artist.value;
    const image = event.target.image.value;

    const newSong = { name, title, artist, image };
    const songAsJson = JSON.stringify(newSong);
    const response = await fetch(`${endpoint}/songs`, {
        method: "POST",
        body: songAsJson,
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        updateSongsGrid();
        scrollToTop();
    }
}

function selectSong(song) {
    selectedSong = song;
    const form = document.querySelector("#form-update");
    form.name.value = song.name;
    form.title.value = song.title;
    form.artist.value = song.artist;
    form.image.value = song.image;
    form.scrollIntoView({ behavior: "smooth" });
}

async function updateSong(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const title = event.target.title.value;
    const artist = event.target.artist.value;
    const image = event.target.image.value;

    const songToUpdate = { name, title, artist, image };
    const songAsJson = JSON.stringify(songToUpdate);
    const response = await fetch(`${endpoint}/songs/${selectedsong.id}.json`, {
        method: "PUT",
        body: songAsJson
    });
    if (response.ok) {
        updateSongsGrid();
        scrollToTop();
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}