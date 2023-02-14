let categoryParent = document.getElementById("categoryHolder");
let category = document.getElementById("category");

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let pageInitial = "&page=";
let trendingShows = "https://api.themoviedb.org/3/trending/tv/day?api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
 

async function loadSelectedCategory(element,url,movie_id){
    let response = await fetch(`${url}`)
    let data = await response.json();
    console.log("data ",data);
    element.innerHTML+=
    `
    <div style="
    width:50%;
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

function loadPage(){
    for(let i=0;i<=19;i++){
        loadSelectedCategory(category,trending,i)
    }
}
window.onload = loadPage();