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



// Get the close button and add an event listener
var close = document.getElementsByClassName("close")[0];
close.addEventListener("click", function() {
  myModal.style.display = "none";
});

// Add an event listener to the button
searchButton.addEventListener("click", function() {
  myModal.style.display = "block";
});

//Add an event listener to the search field. Just for styling purposes
searchField.addEventListener("", function() {
  searchField.style.borderColor= "transparent";
})


// variables
// let name , releaseDate,ratings , fullImage, trailer, backdropImage, popularity,genre;
let comingSoonUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US&page=1&include_adult=false";


// encrypt params
function encryptParams(params) {
    const key = "8L1pD4twi4YJZoWQz8FvNq";
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
    return encodeURIComponent(encrypted);
  }
  

// content Divs that will hold movies
const previewDiv = document.getElementById("previewDiv");
const comingSoonDiv = document.getElementById("comingSoonDiv");
const trendingDiv = document.getElementById("trendingDiv");

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let pageInitial = "&page=";
let trendingShows = "https://api.themoviedb.org/3/trending/tv/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";

// logic, functions and classes

// movie entity
// class Movie{
//     // constructor(name, releaseDate,ratings,fullImage,trailer,backdropImage,popularity,genre) {
//     //     this.name = name;
//     //     this.releaseDate = releaseDate;
//     //     this.ratings=ratings;
//     //     this.fullImage=fullImage;
//     //     this.trailer=trailer;
//     //     this.backdropImage=backdropImage;
//     //     this.popularity=popularity;
//     //     this.genre=genre;
//     //   }
//     //   responsible for the top preview

//     constructor(name){
//         this.name=name;
//     }

//       set name(value){
//         this.name=value
//       }
//     // Shows more details about the movie
//       showDetails(){

//       }

//       get name(){
//         return this.name;
//       }

//     //   plays the movie trailer
//     playTrailer(){

//     }
// }


//set up cover movie from trending
async function setCover() {
  let response = await fetch(`${trending}`)
  let data = await response.json();
  cover.src = `${imagePath}${data.results[1].poster_path}`;
//   description.innerText=`${myText.results[9].overview}`;
//   title.innerText = `${myText.results[9].original_title}`;
}


// tag event listeners to load movies specified by those tags
   moviesTag.onclick=() =>{
   const params = {
        type: "movies",
    };
      
    const encryptedParams = encryptParams(params);
    window.location=`/html/Category.html?param=${encryptedParams}`;
   }
   tvShowsTag.onclick=() =>{
    const params = {
        type: "tvshows",
    };
    const encryptedParams = encryptParams(params)
    window.location=`/html/Category.html?param=${encryptedParams}`;
   }
  //  actorsTag.onclick=() =>{
  //   window.location="/html/Category.html?param=people";

  //  }
   popularTag.onclick=() =>{
    const params = {
        type: "popular",
    };
    const encryptedParams = encryptParams(params)
    window.location=`/html/Category.html?param=${encryptedParams}`;

   }
   trendingTag.onclick=() =>{
    const params = {
        type: "trending",
    };
    const encryptedParams = encryptParams(params)
    window.location=`/html/Category.html?param=${encryptedParams}`;

   }
   upComingTag.onclick=() =>{
    const params = {
        type: "upcoming",
    };
    const encryptedParams = encryptParams(params)
    window.location=`/html/Category.html?param=${encryptedParams}`;

   }


async function loadSpecificCategory(parentElement,url,movie_id){
    let response = await fetch(`${url}`)
    let data = await response.json();
    console.log("data ",data);
    parentElement.innerHTML+=
    `
    <div style=
    "
    display:box;
    margin-left:5%;
    ">
        <img src="${imagePath}${data.results[movie_id].poster_path}" 
            style=
            "width:130px;
            height:180px;
            border-radius:6% 6% 0% 0%;
            "
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
            >${data.results[movie_id].title}</p>
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


function loadCategories(){
    for(let i=0;i<=9;i++){
        loadSpecificCategory(comingSoonDiv,comingSoonUrl,i);
        loadSpecificCategory(trendingDiv,trending,i);
    }

}

document.addEventListener("DOMContentLoaded", function() {
  // Your function code here
  setCover();
  loadCategories();
});


// window.onload = setCover();
// window.onload = loadCategories()
