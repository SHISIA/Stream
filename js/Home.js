// declaring buttons and tags
const menuButton = document.getElementById("menuButton");
const searchButton = document.getElementById("searchButton");
const moviesTag = document.getElementById("moviesTag");
const tvShowsTag = document.getElementById("tvShowsTag");
// const actorsTag = document.getElementById("actorsTag");
const popularTag = document.getElementById("popularTag");
const trendingTag = document.getElementById("trendingTag");
const upComingTag = document.getElementById("comingSoonTag");
const cover = document.getElementById("cover");
const myModal = document.getElementById("myModal");
const searchField = document.getElementById("searchField");
const search = document.getElementById("search");
const menuModal = document.getElementById("menuModal");
const moreBtnTrending = document.getElementById("moreBtnTrending");
const moreBtn = document.getElementById("moreBtn");


// Get the close button and add an event listener
var close = document.getElementsByClassName("close")[0];
var menuClose = document.getElementsByClassName("close")[1];

close.addEventListener("click", function () {
  myModal.style.display = "none";
});

menuClose.addEventListener("click", function () {
  menuModal.style.display = "none";
  menuButton.style.display = "block";
});

// Add an event listener to the button
menuButton.addEventListener("click", function () {
  menuModal.style.display = "block";
  menuButton.style.display = "none"
  menuModal.style.marginTop = "15%";
});

// Add an event listener to the button
searchButton.addEventListener("click", function () {
  myModal.style.display = "block";
});

//Add an event listener to the search field. Just for styling purposes
searchField.addEventListener("", function () {
  searchField.style.borderColor = "transparent";
})

//searching movie via searchbox :: Gets the field value and sends it encrypted 
// to results view page
search.addEventListener("click", function () {
  if (!searchField.value == null || !searchField.value == "") {
    const params = {
      term: searchField.value
    };
    const encryptedParams = encryptParams(params)
    window.location = `/html/SearchResults.html?param=${encryptedParams}`;
  }
})


// variables
// let name , releaseDate,ratings , fullImage, trailer, backdropImage, popularity,genre;
let comingSoonUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US&include_adult=false";


// encrypt params
function encryptParams(params) {
  const key = "c7974249b02fhiukjn7";
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
  return encodeURIComponent(encrypted);
}


// content Divs that will hold movies
const previewDiv = document.getElementById("previewDiv");
const comingSoonDiv = document.getElementById("comingSoonDiv");
const trendingDiv = document.getElementById("trendingDiv");
const trendingDivTwo = document.getElementById("trendingDiv2");
const trendingDivThree = document.getElementById("trendingDiv3");
const comingSoonDivTwo = document.getElementById("comingSoonDiv2");
const comingSoonDivThree = document.getElementById("comingSoonDiv3");
const topMovie = document.getElementById("topMovie");

//Hover elements preview elements
const desktopPreview = document.getElementById("hoverInfoDiv");
const prevTitle = document.getElementById("prevTitle");
const desktopPreviewCover = document.getElementById("desktopPreviewCover");
const prevProgress = document.getElementById("prevProgress");
const releaseDate = document.getElementById("releaseDate");
const prevRatingValue = document.getElementById("prevRatingValue");
const genre = document.getElementById("genre");
const description = document.getElementById("description");
const duration = document.getElementById("duration");
//end of Hove elements for movie preview

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500";
let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let pageInitial = "&page=";
let trendingShows = "https://api.themoviedb.org/3/trending/tv/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";

//set up cover movie from trending
async function setCover() {
  let response = await fetch(`${trending}`);
  let data = await response.json();
  cover.src = `${imagePath}${data.results[1].poster_path}`;
  cover.style.cursor = "pointer";
  cover.setAttribute("class", data.results[1].id);
  topMovie.style.cursor = "pointer";
  topMovie.setAttribute("class", data.results[1].id);
  topMovie.src = `${imagePath}${data.results[7].backdrop_path}`;

}

// cover.onclick=openSelectedMedia(data.results[1].id,"movie")

cover.onclick = () => {
  openSelectedMedia(cover.className, "movie")
}

// tag event listeners to load movies specified by those tags
moviesTag.onclick = () => {
  const params = {
    type: "movies",
  };

  const encryptedParams = encryptParams(params);
  window.location = `/html/Category.html?param=${encryptedParams}`;
}

tvShowsTag.onclick = () => {
  const params = {
    type: "tvshows",
  };
  const encryptedParams = encryptParams(params)
  window.location = `/html/Category.html?param=${encryptedParams}`;
}
//  actorsTag.onclick=() =>{
//   window.location="/html/Category.html?param=people";

//  }
popularTag.onclick = () => {
  const params = {
    type: "popular",
  };
  const encryptedParams = encryptParams(params)
  window.location = `/html/Category.html?param=${encryptedParams}`;

}
trendingTag.onclick = () => {
  const params = {
    type: "trending",
  };
  const encryptedParams = encryptParams(params)
  window.location = `/html/Category.html?param=${encryptedParams}`;

}
upComingTag.onclick = () => {
  const params = {
    type: "upcoming",
  };
  const encryptedParams = encryptParams(params)
  window.location = `/html/Category.html?param=${encryptedParams}`;

}

// function to load when movie item is clicked
function openSelectedMedia(value, mediaType) {
  const encryptedParams = {
    name: value,
    type: mediaType
  };
  const encryptedValue = encryptParams(encryptedParams);
  window.location = `/html/Overview.html?param=${encryptedValue}`;
}



async function loadSpecificCategory(parentElement, url, movie_id) {
  let response = await fetch(`${url}`);
  let data = await response.json();
  let mediaType;
  let poster = imagePath + data.results[movie_id].poster_path;
  let id = data.results[movie_id].id;
  let title = data.results[movie_id].title;
  let vote_average = data.results[movie_id].vote_average;
  let overview = data.results[movie_id].overview;
  let release_date = data.results[movie_id].release_date;
  let original_language = data.results[movie_id].original_language;
  if (url.includes("movie")) {
    mediaType = "movie"
  } else {
    mediaType = "tv"
    console.log(data)

  }
  parentElement.innerHTML +=
    `
    <div style=
    "
    display:box;
    margin-left:5%;
    ">
        <img onmouseleave="hidePreview()" onmouseover="hoverAndPreview('${poster}','${title}','${vote_average}','${overview}','${release_date}','${mediaType}',
        '${original_language}')"
             src="${poster}" 
            style=
            "width:130px;
            height:180px;
            border-radius:6% 6% 0% 0%;
            cursor:pointer;
            "
            onclick="openSelectedMedia('${id}','${mediaType}')"
        >
        <div style=
        "
        background-color:#1C162B;
        width:130px;
        margin-top:-20px;
        height:60px;
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
            >${title}</p>
            <p style=
            "
            font-size:12px;
            color:grey;
            margin:5%;
            margin-top:15%;
            margin-bottom:0%;
            ">${data.results[movie_id].release_date}</p>
        </div>
    </div>
    `
}

function hidePreview() {
  desktopPreview.style.display = "none";
}

// loads the preview template with movie data when a movie item is loaded
async function hoverAndPreview(poster, title, vote_average, overview, release_date, media_type, original_language) {
  desktopPreview.style.display = "flex";
  desktopPreview.style.cursor = "pointer";
  desktopPreviewCover.src = poster;
  prevTitle.innerText = title;
  prevRatingValue.innerText = vote_average;
  description.innerText = overview;
  releaseDate.textContent = release_date;
  duration.textContent = media_type;
  genre.textContent = original_language.toUpperCase();
}

// loads the set cateogries and specified results page as declared by the API
function loadCategories() {
  for (let i = 0; i <= 9; i++) {
    // comingSoon Category
    loadSpecificCategory(comingSoonDiv, comingSoonUrl + pageInitial + "1", i);
    loadSpecificCategory(comingSoonDivTwo, comingSoonUrl + pageInitial + "2", i);
    loadSpecificCategory(comingSoonDivThree, comingSoonUrl + pageInitial + "3", i);
    // trending category
    loadSpecificCategory(trendingDiv, trending + pageInitial + "1", i);
    loadSpecificCategory(trendingDivTwo, trending + pageInitial + "2", i);
    loadSpecificCategory(trendingDivThree, trending + pageInitial + "3", i);
  }

}

// works just like window.onload function;
document.addEventListener("DOMContentLoaded", function () {
  desktopPreview.style.display = "none";
  setCover();
  loadCategories();
});


// window.onload = setCover();
// window.onload = loadCategories()
