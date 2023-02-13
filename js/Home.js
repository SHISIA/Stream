// declaring buttons and tags
const menuButton = document.getElementById("menuButton");
const searchButton = document.getElementById("searchButton");
const moviesTag = document.getElementById("moviesTag");
const tvShowsTag = document.getElementById("tvShowsTag");
const actorsTag = document.getElementById("actorsTag");
const popularTag = document.getElementById("popularTag");
const trendingTag = document.getElementById("trendingTag");
const comingSoonTag = document.getElementById("comingSoonTag");
const cover = document.getElementById("cover");

// variables
let name , releaseDate,ratings , fullImage, trailer, backdropImage, popularity,genre;


// content Divs that will hold movies
const previewDiv = document.getElementById("previewDiv");
const comingSoonDiv = document.getElementById("comingSoonDiv");
const trendingDiv = document.getElementById("trendingDiv");

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let trending = "https://api.themoviedb.org/3/trending/all/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let pageInitial = "&page=";
let trendingShows = "https://api.themoviedb.org/3/trending/tv/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";

// logic, functions and classes

// movie entity
class Movie{
    constructor(name, releaseDate,ratings,fullImage,trailer,backdropImage,popularity,genre) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.ratings=ratings;
        this.fullImage=fullImage;
        this.trailer=trailer;
        this.backdropImage=backdropImage;
        this.popularity=popularity;
        this.genre=genre;
      }
    //   responsible for the top preview
      loadPreview(){

      }
    // Shows more details about the movie
      showDetails(){

      }

    //   plays the movie trailer
    playTrailer(){

    }
}

// Genre entity
class Genre extends Movie{
    constructor(type){
        this.type = type;
    }
}


//set up cover movie from trending
async function setCover() {
    let imagePath = "https://image.tmdb.org/t/p/w500";
  let response = await fetch(`${trending}`)
  let data = await response.json();
  cover.src = `${imagePath}${data.results[9].poster_path}`;
//   description.innerText=`${myText.results[9].overview}`;
//   title.innerText = `${myText.results[9].original_title}`;
}

window.onload = setCover();