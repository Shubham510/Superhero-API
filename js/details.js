const access_token = '3801319236608706';
const url = 'https://superheroapi.com/api.php/'+access_token+'/';
var favHeroes = JSON.parse(localStorage.getItem('favouriteHeroes'));
const whiteHeart = 'images/white-heart.jpg';
const redHeart = 'images/red-heart.jpg';
const heroDiv = document.getElementById('hero-details');
var heroId;

displayDetails();

async function displayDetails(){
    getId();
    renderDetails(await searchHero(heroId));
}

function getId(){
    const url = location.search;
    heroId = url.substring(url.indexOf('=')+1);
}

async function searchHero(id){

    let response = await fetch(url+id);
    if(response.ok){
        return (await response.json());
    }
    else{
        alert("HTTP Error: ", response.status);
    }
}

function renderDetails(data){
    document.title = "Details | " + data.name;
    document.getElementById('name').innerHTML = `<h1>${data.name}</h1>`;
    document.getElementById('hero-details').dataset.id = data.id;
    document.getElementById('image').firstElementChild.src = data.image.url;

    var favStatus = (favHeroes.indexOf(data.id) !== -1);
    document.getElementById('fav').firstElementChild.src = favStatus ? redHeart : whiteHeart;

    addPowerStats(data.powerstats);

    document.getElementById('appearance').innerHTML = convertToParas(data.appearance);
    
    document.getElementById('biography').innerHTML = convertToParas(data.biography);
    
    document.getElementById('occupation').innerHTML = convertToParas(data.work);
    
    document.getElementById('connections').innerHTML = convertToParas(data.connections);
}

function addPowerStats(data){
    var combat = document.getElementById('combat');
    combat.innerHTML= data.combat;
    combat.style = `width: ${data.combat}%;`;

    var combat = document.getElementById('durability');
    combat.innerHTML= data.durability;
    combat.style = `width: ${data.durability}%;`;

    var combat = document.getElementById('intelligence');
    combat.innerHTML= data.intelligence;
    combat.style = `width: ${data.intelligence}%;`;

    var combat = document.getElementById('power');
    combat.innerHTML= data.power;
    combat.style = `width: ${data.power}%;`;

    var combat = document.getElementById('speed');
    combat.innerHTML= data.speed;
    combat.style = `width: ${data.speed}%;`;

    var combat = document.getElementById('strength');
    combat.innerHTML= data.strength;
    combat.style = `width: ${data.strength}%;`;
}

function convertToParas(data){
    var str='';
    for (var key in data){
        str += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ data[key]+ '</p>';
    }
    return str;
}

function handleClickListener(e){
    if(e.target.id === 'fav-icon'){
        changeFavStatus(heroId);
    }
}

function changeFavStatus(id){
    var favIcon = document.getElementById('fav-icon');
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
    favIcon.src = favStatus ? redHeart : whiteHeart;
    
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
    document.addEventListener("click", handleClickListener);
}

initializeSuperheroApp();