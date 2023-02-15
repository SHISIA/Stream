let categoryParent = document.getElementById("categoryHolder");
let category = document.getElementById("category");
let categoryTitle = document.getElementById("categoryTitle");
let backButton = document.getElementById("backButton");


function decryptParams(encryptedParams) {
    const key = "8L1pD4twi4YJZoWQz8FvNq";
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

// gets search keyword from the browser's top link from the search area
let encryptedParams = new URLSearchParams(window.location.search).get("param");

// decrypt html parameters
const paramTitle = decryptParams(encryptedParams).type;


// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let api_key = "api_key=f3fa058a0294c6f7b1d786efd12e5aa0";

let trendingMovie = "https://api.themoviedb.org/3/trending/movie/day?"+api_key;
let trendingAll = "https://api.themoviedb.org/3/trending/all/day?"+api_key;
let trendingTVShows = "https://api.themoviedb.org/3/trending/tv/day?"+api_key;
let latestTV = "https://api.themoviedb.org/3/tv/latest?"+api_key;
let latestMovie = "https://api.themoviedb.org/3/movie/latest?"+api_key;
let popularMovies = "https://api.themoviedb.org/3/movie/popular?"+api_key;
let popularTV = "https://api.themoviedb.org/3/tv/popular?"+api_key;
let upcoming = "https://api.themoviedb.org/3/movie/upcoming?"+api_key;


// loads the results for the clicked on home tag
async function loadSelectedCategory(element,url,movie_id,type){
    try {
        let response = await fetch(`${url}`)
        let data = await response.json();
        console.log("data",data);
            let filmType = type.toString(); 
            switch(filmType){
                case "tv":
                  tvLoad(element,data,movie_id,movie_id);
                  break;
                case "movie":
                  movieLoad(element,data,movie_id);
                  break; 
                default:
                    movieLoad(element,data,movie_id);
                    break;
            }

    } catch (error) {
        console.log("");
    }
}

// encrypt params
function encryptParams(params) {
    const key = "c7974249b02fhiukjn7";
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
    return encodeURIComponent(encrypted);
  }

//   back button: to previous page
  backButton.onclick = ()=> {
    window.history.back();
  }

// function to load when movie item is clicked

function openSelectedMedia(value,mediaType){
    const encryptedParams = {
        name:value,
        type:mediaType
    };
    const encryptedValue = encryptParams(encryptedParams);
    window.location=`/html/Overview.html?param=${encryptedValue}`;
}

// Movie result template : kindly look at tvLoad function comments 
function movieLoad(element,data,movie_id){
    let capializedTitle = paramTitle.charAt(0).toUpperCase() + paramTitle.substring(1);
    let mediaType="movie";
    categoryTitle.innerText=capializedTitle;
    document.body.style.backgroundImage = `url(${imagePath}${data.results[0].poster_path})`;
    element.innerHTML+=
    `
    <div style="
        width:50%;
        margin-bottom:20px;
        ">
        <img src="${imagePath}${data.results[movie_id].poster_path}" 
            style=
            "width:130px;
            height:180px;
            border-radius:6% 6% 0% 0%;
            cursor:pointer;
            "
            onclick="openSelectedMedia('${data.results[movie_id].id}','${mediaType}')"
        >
        <div style=
            "
            background-color:#1C162B;
            width:130px;
            margin-top:-20px;
            height:80px;
            border-radius:0 0 10px 10px;
            ">
            <p
            style=
            "
            margin:3%;
            margin-top:13%;
            color:red;
            overflow:hidden; 
            "
            >${data.results[movie_id].title}</p>
            <p style=
            "
            font-size:12px;
            color:grey;
            margin:5%;
            margin-top:8%;
            margin-bottom:0%;
            ">${data.results[movie_id].release_date}</p>
        </div>
    </div>
    `
}



// tv results template : the api responds with different json query methods for movies and tv so this called for different templates : same for movies just above
function tvLoad(element,data,movie_id){
    let capializedTitle = paramTitle.charAt(0).toUpperCase() + paramTitle.substring(1);
    let mediaType="tv";
    if(capializedTitle.toLowerCase()==="tvshows"){
        capializedTitle="TV Shows"
    }
    categoryTitle.innerText=capializedTitle;
    document.body.style.backgroundImage = `url(${imagePath}${data.results[0].poster_path})`;
    element.innerHTML+=
    `
    <div style="
        width:50%;
        margin-bottom:20px;
        ">
        <img src="${imagePath}${data.results[movie_id].poster_path}" 
            style=
            "width:130px;
            height:180px;
            border-radius:6% 6% 0% 0%;
            cursor:pointer;
            "
            onclick="openSelectedMedia('${data.results[movie_id].id}','${mediaType}')"
        >
        <div style=
            "
            background-color:#1C162B;
            width:130px;
            margin-top:-20px;
            height:80px;
            border-radius:0 0 10px 10px;
            ">
            <p
            style=
            "
            margin:3%;
            margin-top:13%;
            color:red;
            overflow:hidden; 
            "
            >${data.results[movie_id].name}</p>
            <p style=
            "
            font-size:12px;
            color:grey;
            margin:5%;
            margin-top:8%;
            margin-bottom:0%;
            ">${data.results[movie_id].first_air_date}</p>
        </div>
    </div>
    `
}

function pageOne(link,type){
for(let i=0;i<=19;i++){
        loadSelectedCategory(category,link,i,type)
    }
}

function loadPage(){
    console.log("title param",paramTitle);
    switch(paramTitle){
        case "movies":
            pageOne(trendingMovie,"movie");
            console.log(paramTitle)
            break;
        case "tvshows":
            pageOne(trendingTVShows,"tv");
            console.log(paramTitle)
            break;
            
        case "popular":
            pageOne(popularTV,"tv");
            pageOne(popularMovies,"movie");
            console.log(paramTitle)
            break;
        case "trending":
            pageOne(trendingMovie,"movie");
            pageOne(trendingTVShows,"tv")
            console.log(paramTitle)
            break; 
        case "upcoming":
            pageOne(upcoming,"movie");
            console.log(paramTitle)
            break;
        default:
            pageOne(trendingAll); 
            console.log(paramTitle)
            break;
    }
}

window.onload = loadPage();