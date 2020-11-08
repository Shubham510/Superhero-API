const access_token = '3801319236608706';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';
const whiteHeart = 'images/white-heart.jpg';
const redHeart = 'images/red-heart.jpg';
const resultsDiv = document.getElementById('results');
var timeout;

// check local storage for existing object and initialize one if not present.
function checkLocalStorage(){
    if (localStorage.getItem('favouriteHeroes')==null){
        localStorage.setItem('favouriteHeroes', JSON.stringify(Array()));
    }
}

checkLocalStorage();

function handleKeyupListener(e){
    //clear timeout variable if it already has a value
    clearTimeout(timeout);

    // start the search when the user stops typing or there is a difference of 500ms between two keystrokes
    timeout = setTimeout(function(){
        searchHero(e);
    },500);
}

async function searchHero(e){
    var input = e.target.value;
    if(input.length <3){
        console.log(input);
        resultsDiv.innerHTML = 'Enter more characters'
        return;
    }
    // Calling Superhero API
    let response = await fetch(url+input);
    if(response.ok){
        // await needed to stop the function call before response
        renderResults(await response.json());
    }
    else{
        alert("HTTP Error: "+ response.status);
    }
}

function renderResults(searchResult){
    //check for error or no result
    result=searchResult;
    console.log(searchResult.results);
    if(searchResult.response=='error' || searchResult.results.length === 0){
        resultsDiv.innerHTML = searchResult.error;
    }
    else{
        resultsDiv.innerHTML='';
        searchResult.results.forEach((element) => {
            addResultCardToDOM(element);
        });
    }
}

function addResultCardToDOM(data){
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.id = data.id;
    var isFav = false;

    //check if it is a favourite hero
    if((JSON.parse(localStorage.getItem('favouriteHeroes'))).indexOf(data.id) !== -1){
        isFav = true;
    }

    resultCard.innerHTML = `
        <div class="hero-img">
            <img src="${data.image.url}">
        </div>
        <div class="hero-name">${data.name}</div>
        <div class="fav-btns" id="${data.id}">
            <img class="fav-btn" src="${isFav ? redHeart:whiteHeart}" width="25">
        </div>`

    resultsDiv.appendChild(resultCard);
}

function handleClickListener(e){
    if(e.target.className === 'fav-btn'){
        changeFavStatus(e.target.parentNode.id);
    }
    else if(e.target.className === 'hero-img' || e.target.className === 'hero-name'){
        var id = e.target.parentNode.id;
        window.open('./details.html'+'?id='+id, "_self");
    }
}

function changeFavStatus(id){
    var heroCard = document.getElementById(id);
    var favHeroes = JSON.parse(localStorage.getItem('favouriteHeroes'));
    var favStatus;
    if(favHeroes.indexOf(id) !== -1){
        favHeroes = favHeroes.filter(hero => hero!=id);
        favStatus = false;
        notify('failure', 'Superhero removed from favourites');
    }
    else{
        favHeroes.push(id);
        favStatus = true;
        notify('success','Superhero added to favourites');
    }
    localStorage.setItem('favouriteHeroes',JSON.stringify(favHeroes));
    heroCard.lastElementChild.lastElementChild.src = favStatus ? redHeart : whiteHeart;
}

function notify(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}

function initializeSuperheroApp(){
    document.addEventListener("keyup", handleKeyupListener);
    document.addEventListener("click", handleClickListener);
}

initializeSuperheroApp();