

(function() {
   
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners
eventListeners();

function eventListeners(){
	document.querySelector('#formulario').addEventListener('submit',agregarTweet);

	listaTweets.addEventListener( 'click' , borrarTweet);

	//Contenido Cargado
	//document.addEventListener('DOMContentLoaded',localStorageListo);
}

function agregarTweet(e){
	e.preventDefault();

	const tweet = document.getElementById('tweet').value;
	//Crear botón eliminar
	const botonBorrar = document.createElement('a');
	botonBorrar.classList = 'borrar-tweet';
	botonBorrar.innerText = 'X';


	const li = document.createElement('li');
	li.innerText = tweet;
	li.appendChild(botonBorrar);
	listaTweets.appendChild(li);


	addLocalStorage(tweet);
	//console.log(tweet);
}

function borrarTweet(e){
	e.preventDefault();

	if( e.target.className === 'borrar-tweet' ){
		e.target.parentElement.remove();
	}
	let array = e.target.parentElement.innerHTML.split('<');
	let tweet = array[0];
	//console.log(tweet);

	removeLocalStorageValue(tweet);
	
}

function removeLocalStorageValue(target) {
	let tweets, tweetBorrado;

	tweetBorrado = target;
	
	tweets = getLocalStorage();

	tweets.forEach( function(target,index){

		if( tweetBorrado == tweets[index] ){
			tweets.splice(index,1);

		}

	});

	localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

function addLocalStorage(tweet){
	let tweets = [];
	
	tweets = getLocalStorage();
	
	tweets.push(tweet);

	localStorage.setItem( 'tweets' , JSON.stringify(tweets));

}

function getLocalStorage(){
	let tweets;

	if(localStorage.getItem('tweets') === null){
		tweets = [];
	} else {
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}

	return tweets;
}

//Mostrar datos de localStorage en la lista
function localStorageListo(){
	let tweets;

	tweets = getLocalStorage();

	tweets.forEach( function(tweet){
		//Crear botón eliminar
		const botonBorrar = document.createElement('a');
		botonBorrar.classList = 'borrar-tweet';
		botonBorrar.innerText = 'X';


		const li = document.createElement('li');
		li.innerText = tweet;
		li.appendChild(botonBorrar);
		listaTweets.appendChild(li);
	});
}

})();

