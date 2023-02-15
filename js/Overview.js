let similar = document.getElementById("similarMovies");
let title= document.getElementById("title");
let playButton= document.getElementById("playButton");
let summary= document.getElementById("description");
let back= document.getElementById("backButton");
let search= document.getElementById("searchButton");
let release_date= document.getElementById("release_date");

function decryptParams(encryptedParams) {
    const key = "c7974249b02fhiukjn7";
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

// api prerequisites
let imagePath = "https://image.tmdb.org/t/p/w500"; 
let api_key = "api_key=f3fa058a0294c6f7b1d786efd12e5aa0";
let url = "https://api.themoviedb.org/3/search/movie?"+api_key+"&language=en-US&page=1&include_adult=false&query=";
let urlTv = "https://api.themoviedb.org/3/search/tv?"+api_key+"&language=en-US&page=1&include_adult=false&query=";
let encryptedParams = new URLSearchParams(window.location.search).get("param");
let paramContent = decryptParams(encryptedParams).name;
let paramMediaType = decryptParams(encryptedParams).type;

console.log("data ",paramContent , "data2 ",paramMediaType);

async function loadResults(){
    try {
        let response;
        if(paramMediaType=="tv"){
            response = await fetch(`${urlTv}+${paramContent}`);
            let data = await response.json();
            document.body.style.backgroundImage = `url(${imagePath}${data.results[0].poster_path})`;
            console.log(paramMediaType," ",data)
            title.innerText=`${data.results[0].name}`;
            summary.innerText=`${data.results[0].overview}`;
            release_date.innerHTML=
            `
            <div style="display:flex; word-spacing:">
            <p style="color:red; font-size:15px">Release Date:&nbsp;&nbsp;&nbsp;</p>
            <p style="color:white; font-size:15px"> 
            ${data.results[0].first_air_date}
            </p>
            </div>
            `;
        }else if(paramMediaType=="movie"){
           response = await fetch(`${url}+${paramContent}`) ;
           let data = await response.json();
           document.body.style.backgroundImage = `url(${imagePath}${data.results[0].poster_path})`;
           console.log(paramMediaType," ",data)
           title.innerText=`${data.results[0].title}`;
           summary.innerText=`${data.results[0].overview}`;
           release_date.innerHTML=
           `
           <div style="display:flex; word-spacing:">
           <p style="color:red; font-size:15px">Release Date:&nbsp;&nbsp;&nbsp;</p>
           <p style="color:white; font-size:15px"> 
           ${data.results[0].release_date}
           </p>
           </div>
           `;
        }

    }catch(error){
        console.log(error);
    }
}

window.onload = loadResults();

