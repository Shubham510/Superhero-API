const access_token = '3801319236608706';
const url = 'https://superheroapi.com/api.php/'+access_token+'/';
var favHeroes = JSON.parse(localStorage.getItem('favouriteHeroes'));
const whiteHeart = 'images/white-heart.jpg';
const redHeart = 'images/red-heart.jpg';
const heroesDiv = document.getElementById('heroes-list');

displayFavourites();

function displayFavourites(){
    if (favHeroes.length === 0){
        return;
    }
    else{
        heroesDiv.innerHTML = '';
        favHeroes.forEach(id => {
            if(id){
                searchHero(id);
            }
        });
    }
}

async function searchHero(id){

    let response = await fetch(url+id);
    if(response.ok){
        // await needed to stop the function call before response
        addResultCardToDOM(await response.json());
    }
    else{
        alert("HTTP Error: "+ response.status);
    }
}

function addResultCardToDOM(data){
    console.log(data);
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.id = data.id;

    resultCard.innerHTML = `
        <div class="hero-img">
            <img src="${data.image.url}">
        </div>
        <div class="hero-name">${data.name}</div>
        <div class="fav-btns" id="${data.id}">
            <img class="fav-btn" src="${redHeart}" width="25">
        </div>`

    heroesDiv.appendChild(resultCard);
}


function handleClickListener(e){
    if(e.target.className === 'fav-btn'){
        changeFavStatus(e.target.parentNode.id);
    }
    else if(e.target.className === 'hero-img' || e.target.className === 'hero-name'){
        console.log(e);
    }
}

function changeFavStatus(id){
    var heroCard = document.getElementById(id);
    var favHeroes = JSON.parse(localStorage.getItem('favouriteHeroes'));
    var favStatus;
    if(favHeroes.indexOf(id) !== -1){
        favHeroes = favHeroes.filter(hero => hero!=id);
        favStatus = false;
        document.getElementById(id).remove();
    }
    else{
        favHeroes.push(id);
        favStatus = true;
    }
    localStorage.setItem('favouriteHeroes',JSON.stringify(favHeroes));
    heroCard.lastElementChild.lastElementChild.src = favStatus ? redHeart : whiteHeart;
    
}

function initializeSuperheroApp(){
    document.addEventListener("click", handleClickListener);
}

initializeSuperheroApp();