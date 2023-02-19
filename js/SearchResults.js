//htmls UI elements
const searchButton = document.getElementById("searchButton");
const backButton = document.getElementById("backButton");
const results = document.getElementById("results");
const searchTitle = document.getElementById("searchTitle");

//links 
let api_key = "api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let imagePath = "https://image.tmdb.org/t/p/w500"; 

//decrypt term
function decryptParams(encryptedParams) {
    const key = "c7974249b02fhiukjn7";
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

//searchTerm from link
// const term = window.location.href.replace();

// gets search keyword from the browser's top link input area
let encryptedParams = new URLSearchParams(window.location.search).get("param");

// decrypt html parameters
const term = decryptParams(encryptedParams).term;

//load search results
async function resultLoad(element,movie_id,mediaType){
    let searchLink = "https://api.themoviedb.org/3/search/"+mediaType+"?"+api_key+"&language=en-US&page=1&include_adult=false&query="+term;
    let  object = await fetch(`${searchLink}`);
    let data = await object.json();
    console.log("jnjke ",data);
    let name;
    let release_date ;
    let capializedTitle = term.charAt(0).toUpperCase() + term.substring(1);
    searchTitle.innerText = capializedTitle;
    //sets page background image
    document.body.style.backgroundImage = `url(${imagePath}${data.results[0].poster_path})`;
    if(mediaType=="movie"){
        name=data.results[movie_id].title;
        release_date=data.results[movie_id].release_date;
    }else{
        name=data.results[movie_id].name;
        release_date=data.results[movie_id].first_air_date;
    }
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
            >${name}</p>
            <p style=
            "
            font-size:12px;
            color:grey;
            margin:5%;
            margin-top:8%;
            margin-bottom:0%;
            ">${release_date}</p>
        </div>
    </div>
    `
}

// encrypt params
function encryptParams(params) {
    const key = "c7974249b02fhiukjn7";
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), key).toString();
    return encodeURIComponent(encrypted);
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

function loadPage(){
    for(let i=0;i<19;i++){
        resultLoad(results,i,"movie");
    }
    for(let i=0;i<19;i++){
        resultLoad(results,i,"tv");
    }
}

window.onload = loadPage();

