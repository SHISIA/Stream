const movieFrame = document.getElementById("movieFrame");
const movieName = document.getElementById("movieName");
const similarMovies = document.getElementById("othersHolder");
const similarMovies2 = document.getElementById("othersHolder_2");
// const similarMovies3 = document.getElementById("othersHolder_3");
// const similarMovies4 = document.getElementById("othersHolder_4");
// const similarMovies5 = document.getElementById("othersHolder_5");
const avatar = document.getElementById("avatar");

//html url link params
let encryptedParams = new URLSearchParams(window.location.search).get("param");
let movie_Id = decryptParams(encryptedParams).id;
let mediaType = decryptParams(encryptedParams).type;


// movie links
let trailerLink = `https://api.themoviedb.org/3/movie/${movie_Id}/videos?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US`;
let searchLink = `https://api.themoviedb.org/3/movie/${movie_Id}?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US&include_adult=false`;

// tv show links
let imagePath = "https://image.tmdb.org/t/p/w500";
let tvTrailerLink = `https://api.themoviedb.org/3/tv/${movie_Id}/videos?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US`;
let tvSearchLink = `https://api.themoviedb.org/3/tv/${movie_Id}?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US&include_adult=false`;

// let linkHeader = "https://www.youtube.com/watch?v=";
let linkHeader = "https://www.youtube.com/embed/";
// variables and components declared

// for movie search info : for latest movies to populate space below trailer
let api_key = "api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let urlMovie = "https://api.themoviedb.org/3/movie/now_playing?" + api_key + "&language=en-US&include_adult=false";

let urlTv = "https://api.themoviedb.org/3/tv/top_rated?" + api_key + "&language=en-US&page=1&include_adult=false&query=";


// decryption algorithm
function decryptParams(encryptedParams) {
    const key = "c7974249b02fhiukjn7";
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

//preview selected film item
function openSelectedMedia(value, mediaType) {
    const encryptedParams = {
        name: value,
        type: mediaType
    };
    const encryptedValue = encryptParams(encryptedParams);
    window.location = `/html/Overview.html?param=${encryptedValue}`;
}

// encrypt params
function encryptParams(params) {
    const key = "c7974249b02fhiukjn7";
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
    return encodeURIComponent(encrypted);
}

// function to load trailer
async function loadTrailer() {
    let myObject;
    if (mediaType === "movie") {
        myObject = await fetch(`${trailerLink}`);
        updateInfo();

    } else {
        myObject = await fetch(`${tvTrailerLink}`);
        updateInfoTV();

    }
    let response = await myObject.json();
    checkVideoType(response);
    for (let index = 0; index <= 19; index++) {
        loadSimilarMovies(similarMovies,index,"&page=1");
    }
    for (let index = 0; index <=19; index++) {
        loadSimilarMovies(similarMovies,index,'&page=3');
    }
    for (let index = 0; index <=19; index++) {
        loadSimilarMovies(similarMovies2,index,'&page=2');
    }
    for (let index = 0; index <=19; index++) {
        loadSimilarMovies(similarMovies2,index,'&page=4');
    }
}

// checks for video type , if trailer or Teaser
function checkVideoType(response) {
    for (let result = 0; result < response.results.length; result++) {
        if (response.results[result].type.toLowerCase().match("trailer")) {
            setAndPlayVideo(`${linkHeader}${response.results[result].key}`);
        }
    }
}

// set movie information 
async function updateInfo() {
    let myObject = await fetch(`${searchLink}`);
    let response = await myObject.json();
    console.log("info  ", response);
    movieName.innerText = `${response.title}`;
    avatar.src = `${imagePath + response.poster_path}`;

}
// set tv show information
async function updateInfoTV() {
    let myObject = await fetch(`${tvSearchLink}`);
    let response = await myObject.json();
    console.log("info  ", response);
    movieName.innerText = `${response.name}`;
    avatar.src = `${imagePath + response.poster_path}`;

}


// set trailer iframe with embedded youtube video
function setAndPlayVideo(videoLink) {
    movieFrame.src = videoLink;
    movieFrame.onload = function () {
        movieFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    };
}



async function loadSimilarMovies(element,movieIndex,page) {
    let myObject;
    let response;
    let movieTitle;
    if (mediaType === "movie") {
        myObject = await fetch(urlMovie+page);
        response = await myObject.json();
        movieTitle = response.results[movieIndex].title;
    } else {
        myObject = await fetch(urlTv+page);
        response = await myObject.json();
        movieTitle = response.results[movieIndex].name;
    }
    console.log("similar id ", response);

        element.innerHTML +=
        `
        <div style=
        "
        display:flex;
        padding:8p
        height:110px;
        ">
            <div style=" 
            margin-right:2%;
            ">
            
            <img src="${imagePath}${response.results[movieIndex].poster_path}"
            style="
            width:100px;
            height:110px;
            cursor:pointer;
            border:.5px solid grey;
            margin-bottom:15%;
            "
            onclick="openSelectedMedia('${response.results[movieIndex].id}','${mediaType}')"
            >
            </div>
            <div style=
            " 
            text-align:left; 
            overflow:hidden;
            "
            >
            <p style=
            "
            margin-top:2%;
            margin-bottom:11%;
            font-size:20px;
            color:red;
            ">${movieTitle}</p>
            <p style=
            "
            font-size:10px;
            margin-top:-8%;
            color:white;
            width:90%;
            ">
                ${response.results[movieIndex].overview}
            </p>
            </div>
        </div>
    `

}



window.onload = loadTrailer();



