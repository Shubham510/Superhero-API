const access_token = '3801319236608706';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';
const favFalse = '../assets/images/white_star.png';
const favTrue = '../assets/images/red_star.png';




function handleKeyupListener(e){
    
}




function initializeSuperheroApp(){
    document.addEventListener("keyup", handleKeyupListener);
    document.addEventListener("click", handleClickListener);
}

initializeSuperheroApp();