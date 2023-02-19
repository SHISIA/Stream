//elements
let similar = document.getElementById("similarMovies");
let title = document.getElementById("title");
let playButton = document.getElementById("playButton");
let summary = document.getElementById("description");
let backButton = document.getElementById("backButton");
// const searchButton = document.getElementById("searchButton"); 
// const search = document.getElementById("search");
const release_date = document.getElementById("release_date");


// used term variables and search terms(parameters)
let encryptedParams = new URLSearchParams(window.location.search).get("param");
let filmId = decryptParams(encryptedParams).name;
let paramMediaType = decryptParams(encryptedParams).type;

  // encrypt params
  function encryptParams(params) {
    const key = "c7974249b02fhiukjn7";
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
    return encodeURIComponent(encrypted);
  };

  // decryption algorithm
function decryptParams(encryptedParams) {
    const key = "c7974249b02fhiukjn7";
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}


backButton.onclick = ()=> {
    window.history.back();
  }

//   movie item play button clicked to  view trailer
  function openSelectedMedia(value,mediaType){
    const encryptedParams = {
        id:value,
        type:mediaType
    };
    const encryptedValue = encryptParams(encryptedParams);
    window.location=`/html/Player.html?param=${encryptedValue}`;
}

playButton.onclick = ()=>{
    openSelectedMedia(filmId,paramMediaType);
}



// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500";
let api_key = "api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let url = "https://api.themoviedb.org/3/movie/" + filmId + "?" + api_key + "&language=en-US&page=1&include_adult=false&query=";
let urlTv = "https://api.themoviedb.org/3/tv/" + filmId + "?" + api_key + "&language=en-US&page=1&include_adult=false&query=";

async function loadResults() {
    try {
        let response;
        if (paramMediaType == "tv") {
            response = await fetch(`${urlTv}`);
            let data = await response.json();
            document.body.style.backgroundImage = `url(${imagePath}${data.poster_path})`;
            console.log(paramMediaType, " ", data)
            title.innerText = `${data.name}`;
            summary.innerText = `${data.overview}`;
            release_date.innerHTML =
                `
            <div style="display:flex; word-spacing:">
            <p style="color:red; font-size:15px">Release Date:&nbsp;&nbsp;&nbsp;</p>
            <p style="color:white; font-size:15px"> 
            ${data.first_air_date}
            </p>
            </div>
            `;
        } else if (paramMediaType == "movie") {
            response = await fetch(`${url}`);
            let data = await response.json();
            console.log("data prijng ", data);
            document.body.style.backgroundImage = `url(${imagePath}${data.poster_path})`;
            console.log(paramMediaType, " ", data)
            title.innerText = `${data.title}`;
            summary.innerText = `${data.overview}`;
            release_date.innerHTML =
                `
           <div style="display:flex; word-spacing:">
           <p style="color:red; font-size:15px">Release Date:&nbsp;&nbsp;&nbsp;</p>
           <p style="color:white; font-size:15px"> 
           ${data.release_date}
           </p>
           </div>
           `;
        }

    } catch (error) {
        console.log(error);
    }
}

window.onload = loadResults();

