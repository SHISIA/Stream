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

close.addEventListener("click", function() {
  myModal.style.display = "none";
});

menuClose.addEventListener("click", function() {
    menuModal.style.display = "none";
    menuButton.style.display = "block";

  });

  // Add an event listener to the button
menuButton.addEventListener("click", function() {
    menuModal.style.display = "block";
    menuButton.style.display = "none"
    menuModal.style.marginTop="15%";
  });

// Add an event listener to the button
searchButton.addEventListener("click", function() {
  myModal.style.display = "block";
});

//Add an event listener to the search field. Just for styling purposes
searchField.addEventListener("", function() {
  searchField.style.borderColor= "transparent";
})

//searching movie via searchbox :: Gets the field value and sends it encrypted 
// to results view page
search.addEventListener("click", function() {
  if(!searchField.value==null || !searchField.value==""){
    const params = {
      term: searchField.value
  };
  const encryptedParams = encryptParams(params)
  window.location=`/html/SearchResults.html?param=${encryptedParams}`;
  }
})


// variables
// let name , releaseDate,ratings , fullImage, trailer, backdropImage, popularity,genre;
let comingSoonUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=f3fa058a0294c6f7b1d786efd12e5aa0&language=en-US&page=1&include_adult=false";


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

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let pageInitial = "&page=";
let trendingShows = "https://api.themoviedb.org/3/trending/tv/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";

//set up cover movie from trending
async function setCover() {
  let response = await fetch(`${trending}`)
  let data = await response.json();
  cover.src = `${imagePath}${data.results[1].poster_path}`;
  cover.style.cursor="pointer";
  cover.setAttribute("class", data.results[1].id);
}

// cover.onclick=openSelectedMedia(data.results[1].id,"movie")

cover.onclick = ()=>{
  openSelectedMedia(cover.className,"movie")
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
   trendingTag.onclick = () =>{
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

   // function to load when movie item is clicked
function openSelectedMedia(value,mediaType){
  const encryptedParams = {
      name:value,
      type:mediaType
  };
  const encryptedValue = encryptParams(encryptedParams);
  window.location=`/html/Overview.html?param=${encryptedValue}`;
}



async function loadSpecificCategory(parentElement,url,movie_id){
    let response = await fetch(`${url}`)
    let data = await response.json();
    let mediaType;
    console.log("data ",data);
      mediaType="movie";
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
            cursor:pointer;
            "
            onclick=openSelectedMedia('${data.results[movie_id].id}','${mediaType}');
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
