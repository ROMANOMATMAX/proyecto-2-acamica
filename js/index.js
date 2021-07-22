let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";

//Esta es una funcion asincrona que nos trae las imagenes neceserias para la seccion trending
/*******Refactorizacion Trending *****************/
function queryToGifTrending(limit) {
    let offset = limit -12; 
    console.log(`soy el nuevo offset: ${offset}`);
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=12&offset=${offset}`;
    fetch(url)
    .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
    .then(({pagination, data}) => {
        console.log(data);
        data.map(drawGifTrending)
        if (!window.matchMedia("(max-width: 767px)").matches) {
        carrusel(offset);
        }
        document.getElementById("right-slider").addEventListener("click", moveToRight);
        document.getElementById("left-slider").addEventListener("click", moveToleft);
    })
    .catch(err => {
        console.log(err);
    })
}


(function() {
    let limit = 12;
    localStorage.setItem("limit", limit)
    queryToGifTrending(limit);
}());


/**Esta funcion dibuja uno a uno los gif en una etiqueta imagen que luego se introduce en un div y luego se meta al contenedor, ademas le da la funcionalidad del hover*/
function drawGifTrending(gif) { //map te recorre de a uno los elementos del array de objetos data
    //En teoria tenemos en html unicamente un contenedor para todos estos gif crearemos un div y dentro de ese div un img cuyo src sera un div
    let imageContainer = document.createElement("div");//A los elementos nuevos que creemos dinamicamente asignarle una clase para poder darles estilo
    imageContainer.className = "imageContainer";
    img = document.createElement("img");
    // console.log(typeof(gif.user.username));
    img.src = gif.images.original.url;//asignamos la url gipho como fuente de imagen
    img.title = gif.title + "&" + gif.username;//el titulo del gif tmb necesita ser renderizados. Tener en cuenta y nada menor que el title es un atributo real de un elemento img y estará dentro de la etiquera
    let ampersandPosition = findAmpersandPosition(img.title);
    console.log(extractTitle(img.title, ampersandPosition));
    console.log(extractUser(img.title, ampersandPosition));
    img.user = gif.username;//el usuario al cual perteneces el gif tmb necesita ser renderizados
    img.id = gif.id; //tomamos el id esto permite el acceso a cualquier imagen de forma independiente
    img.className = "small"//Dijimos que a cualquier elemento nuevo le crearemos una clase para poder darle estilo en css
    imageContainer.append(img);
    document.getElementById("trendingContainer").appendChild(imageContainer);
    //antes yo creaba el efecto hover y botones por separado para cade gif con eventos mouseenter y mouseleave pero aca puedo creerle esos eventos a todos los gif sin necesidad de tanto código
    hoverAndBtns(img);
}

function hoverAndBtns(img) {
    console.log(img);
    if(!window.matchMedia("(max-width: 767px)").matches) {
        document.getElementById(`${img.id}`).parentNode.addEventListener("mouseenter", openScreen);
        document.getElementById(`${img.id}`).parentNode.addEventListener("mouseleave", closeScreen);
    }else {
        document.getElementById(`${img.id}`).addEventListener("click", expandGifMobile);
    }
}

function openScreen() {
    console.log("good morning!");
    //en este caso como el evento se esta colocando a la imagen .this hace referencia a ella
    currentId = this.firstChild.id; //tomo el atributo id de la imagen
    currentUrl = this.firstChild.src; //tomo el atributo src de la imagen
    currentUser = this.firstChild.username; //tomo el atributo user de la imagen
    currentTitle = this.firstChild.title; //tomo el atributo title de la imagen
    console.log(currentTitle);
    this.style.background = "rgba(87, 46, 229, 0.5)"; //Al div contenedor le aplico un background
    this.firstChild.style.opacity = "0.3"; //a la imagen le doy un opacity de 0.3 para que sea vea el background del contenedor

    /****Instrucciones necesarias para la funcion download*******/
    let download = document.createElement("a");
    download.setAttribute("href", "javascript:void(0)");//significa que por mas que es un link al asignarle undefined a hreg no va a ningun lado
    download.className ="downloadIcon";//es un elemento y le damos una clase para poder darle estilo en css
    download.addEventListener("click", downloadGif)//todas las variables declaradas antes tienen acceso aquí 
    this.append(download);
    /***Instrucciones necesarioas para la funcion expandir ***********/
    let expand = document.createElement("a");
    expand.setAttribute("href", "javascript:void(0)");
    expand.className = "fullScreen";
    expand.addEventListener("click", expandGif)
    this.append(expand);
    /****instrucción necessary for favorite action *******/
    let favorite;
    if(false){//esta situacion solo ocurre cuando hacemos click en linlFavorite
        favorite = document.createElement("a");
        favorite.setAttribute("href", "javascript:void(0)");
        favorite.id = "favoriteIcon";
        //Ojo aquí debemos decidir que imagen mostrar como background del link dependiendo de si el gif esta guardado o no
        favorite.className = "trashIcon";
        favorite.addEventListener("click", deleteGifFromFavorite);
    }else {//si no se muestra favorito podemos darle click para likear un gif
        favorite = document.createElement("a");
        favorite.setAttribute("href", "javascript:void(0)");
        favorite.id = "favoriteIcon";
        isOnFavorite = searchFavorite();
        if(isOnFavorite != -1) {//en este caso estaría dentro de favoritos y la acción a ejecutar sería borrar el gif
            console.log("estas entrando al div y este gif esta liked debes desactivar la clase heartIcon y poner fav-active");
            favorite.classList.toggle = "heartIcon";
            favorite.className = "heartIconActive";
        }
        else {//en este caso no estaría dentro de favoritos y la acción a ejecutar sería añadir el gif
            console.log("estas entrando al div y este gif no esta liked debes activar la clase heartIcon");
            favorite.className = "heartIcon";
        }
        favorite.addEventListener("click", saveGifAsFavorite)
    }
    this.append(favorite);

    let title = document.createElement("p");
    title.className = "titleOpenScreen";
    let user = document.createElement("p");
    user.className = "userOpenScreen";
    let ampersandPosition = findAmpersandPosition(currentTitle);
    let titleContent = extractTitle(currentTitle, ampersandPosition);
    let userContent = extractUser(currentTitle, ampersandPosition);
    if(titleContent === "") {
        title.innerText = "unknown";
    }else {
        title.innerText = titleContent;
    }
    if(userContent ==="") {
        user.innerText = "unknown";
    }else {
        user.innerText = userContent;
    }

    this.append(user, title);
    
}

function closeScreen() {
    console.log("good night!!");
    this.style.background = "none";
    this.firstChild.style.opacity = "1";
    const iconsToDelete = this.getElementsByTagName("a");
    let iterationNum1 = iconsToDelete.length;
    for(let i= 0; i<iterationNum1; i++) {
        this.removeChild(iconsToDelete[0]) ;
    }
    const textsToDelete = this.getElementsByTagName("p");
    let iterationNum2 = textsToDelete.length;
    for(let i= 0; i<iterationNum2; i++) {
        this.removeChild(textsToDelete[0]) ;
    }
}


/**Download function */
function downloadGif() {
    fetch(currentUrl)
    .then((response) => response.blob())
    .then((blob) => {
        const urlToDownload = window.URL.createObjectURL(new Blob([blob]));
        console.log(urlToDownload);
        //Debemos crear un elemento <a> para poder asociarle el link y ademas simularle un click
        let usefulLink = document.createElement("a");
        usefulLink.href = urlToDownload;
        usefulLink.setAttribute("download", "download.gif");
        //si no simulo el click nunca se ejecutaria
        usefulLink.click();
        
    })
}

//para mostrar la pantalla sin contenido, tener cuidado que debo crear una sola vez los elementos

function saveGifAsFavorite() {
    console.log(this.parentNode.parentNode);
    if(this.parentNode.parentNode.id != "myGifosContainer") {
        let object = JSON.parse(localStorage.getItem("favoritos"));;//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchFavorite();//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);
        if(isOnFavoriteLocal != -1) {
            console.log("este gif ya esta en favs debo removerlo");
            let gifId = object[isOnFavoriteLocal].id; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
            let offset = +localStorage.getItem("offset");
            //solo hacer esto si tenemos mas de 12 elementoooos ojooooo
            if((offset+12)<object.length) {
                let nextGifId = object[offset+12].id;
                console.log(object[isOnFavoriteLocal]);
                showOneFavoriteGif(nextGifId);
            }
            let showWithoutContent = false;
            if((isOnFavoriteLocal === 0)&&(object.length === 1)){//significa que era el ultimo elemento en favoritos
                console.log("el que acabas de borrar era el ultimo elemento ahora debes mostrar sin contenido");
                showWithoutContent = true;
            }
            object.splice(isOnFavoriteLocal, 1);//lo remuevo 
            console.log(object[isOnFavoriteLocal]);
            localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
            document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
            document.getElementById("favoriteIcon").className ="heartIcon";
            if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                unShowOneFavoriteGif(gifId);//No importa de donde venga el id siempre que se envia como parametro será sin favSection
                if(showWithoutContent === true) {
                    console.log(withoutContentWasShown);
                    if(withoutContentWasShown === true) {//Ya se crearon los elementos necesarios solo necesito volver a mostrarlos
                        nowThereIsntContent();
                    }else {//Aun no se crearon los elementos necesarios asi que necesito hacerlo
                        favWithoutContent();
                        withoutContentWasShown = true;
                    }
                    showWithoutContent = false;
                }
                // let offset = +localStorage.getItem("offset");
                // if(offset === 0) {
                //     let oneMoreBringAmount = +localStorage.getItem("oneMoreBringAmount");
                //     oneMoreBringAmount++;
                //     localStorage.setItem("oneMoreBringAmount", oneMoreBringAmount);
                //     let nextPosition = 12 - oneMoreBringAmount;    
                //     console.log(nextPosition);
                //     console.log(object[nextPosition].id);
                //     bringOneMoreFavorite(object[nextPosition].id);    
                // }else {
                //     let oneMoreBringAmount = +localStorage.getItem("oneMoreBringAmount");
                //     oneMoreBringAmount++;
                //     localStorage.setItem("oneMoreBringAmount", oneMoreBringAmount);
                //     let nextPosition = offset+12-oneMoreBringAmount;
                //     console.log(nextPosition);
                //     console.log(object[nextPosition].id);
                //     bringOneMoreFavorite(object[nextPosition].id);    
                // }
            }
        }
        else {
                if(withoutContentWasShown === true) {
                    nowThereIsContent();
                    console.log("paso por donde queria");
                    // withoutContentWasShown = false;  
                }   
                let gif = {
                url: currentUrl,
                id: currentId,
                user: currentUser,
                title: currentTitle
                }
                console.log(gif);
            if(!object) {
                console.log("Este gif ni ningun otro gif esta en fav debo crear un espacio en la localStorage y agregarlo");
                object = [];
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object))  
                document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
                document.getElementById("favoriteIcon").className ="heartIconActive";  
                if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                    showOneFavoriteGif(object[object.length-1].id);
                }
            }
            else {
                console.log("este gif no esta en favs debo agregarlo");
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object)) 
                document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
                document.getElementById("favoriteIcon").className ="heartIconActive";  
                if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                    showOneFavoriteGif(object[object.length-1].id);
                }
            }
        }
    }else {
        let object = JSON.parse(localStorage.getItem("misGifos"));;//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchMyGif();//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);
        let gifId = object[isOnFavoriteLocal]; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
        let offsetMyGifos = +localStorage.getItem("offsetMyGifos");
        if((offsetMyGifos+12)<object.length) {
            let nextGifId = object[offsetMyGifos+12];
            console.log(object[isOnFavoriteLocal]);
            showOneOwnGif(nextGifId);
        }
        let showWithoutContent = false;
        if((isOnFavoriteLocal === 0)&&(object.length === 1)){//significa que era el ultimo elemento en favoritos
            console.log("el que acabas de borrar era el ultimo elemento ahora debes mostrar sin contenido");
            showWithoutContent = true;
        }
        object.splice(isOnFavoriteLocal, 1);//lo remuevo 
        localStorage.setItem("misGifos", JSON.stringify(object))//refresco local storage
        // document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
        // document.getElementById("favoriteIcon").className ="heartIcon";
        unShowOneOfMyGifos(gifId);
        if(showWithoutContent === true) {
            console.log(withoutContentMyGiphosWasShown);
            if(withoutContentMyGiphosWasShown === true) {//Ya se crearon los elementos necesarios solo necesito volver a mostrarlos
                nowThereIsntContentMyGiphos();
            }else {//Aun no se crearon los elementos necesarios asi que necesito hacerlo
                myGiphosWithoutContent();
                withoutContentMyGiphosWasShown = true;
            }
            showWithoutContent = false;
        }
   
    }
}

function bringOneMoreOfMyGif(gifId) {
    showOneOwnGif(gifId);
}

function bringOneMoreFavorite(gifId) {
    showOneFavoriteGif(gifId);
}

function searchMyGif() {
    let object = JSON.parse(localStorage.getItem("misGifos"));
    let gifFound = -1;
    if(object!= null) {
        for(let i=0; i<object.length; i++) {
            if(object[i] === currentId) {
                gifFound = i;
                console.log(gifFound);
                return gifFound;
            }
        }
        console.log(gifFound);
        return gifFound;
    }

}

function searchMyGifInMyGiphos(gifId) {
    let newId = gifId.substring(13, gifId.length);
    let object = JSON.parse(localStorage.getItem("misGifos"));
    let gifFound = -1;
    console.log(newId);
    if(object!= null) {
        for(let i=0; i<object.length; i++) {
            if(object[i] === newId) {
                gifFound = i;
                console.log(gifFound);
                return gifFound;
            }
        }
        console.log(gifFound);
        return gifFound;
    }

}

function searchFavorite () {
    let object = JSON.parse(localStorage.getItem("favoritos"));//tomamos el array donde tenemos todos los favoritos
    //Aca los id de los objetos no tienen la
    let gifFound = -1;
    console.log(document.getElementById(currentId).parentNode.parentNode);
    console.log(currentId);
    if(document.getElementById(currentId).parentNode.parentNode.id != "favoriteContainer") {
        console.log("buscando coincidencia con search o trending");
        if(object != null){//Si hay con que comparar ejecutamos el if
            for(let i=0; i<object.length; i++) {
                if(object[i].id === currentId) {//esta accion esta bien pero si el elemento en el cual me posiciono no es de favorite
                    gifFound = i;
                }
            }  
        }
        console.log(gifFound);
        return gifFound;    
    }else {
        console.log("buscando coincidencia con favorites");
        if(object != null){//Si hay con que comparar ejecutamos el if
            for(let i=0; i<object.length; i++) {
                let objectIdModified = "favSection" + object[i].id;
                if(objectIdModified === currentId) {//En esta accion el currentId tiene favSection delante
                    gifFound = i;
                }
            }  
            console.log(gifFound);
            return gifFound;  
        }
    }
}

//la primera vez que llamemos a carrusel lo llamaremos con 0 y 3 (por que nos interesa que arranquen dibujados los 3 primeros)
//la segunda vez arrancaremos con 12 y 15
//la tercera vez arrancamos con 24 y 27
//asi sucesivamente (la cantidad anterior +12)
function carrusel (lowerLimit) {
    let allGifs = document.querySelectorAll(".imageContainer");
    let gifs = [];
    for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
        if(gif.parentNode.id ==="trendingContainer") {
            gifs.push(gif);
        }
    }
    console.log(gifs);
    for (let gif of gifs ) {
        gif.style.display = "none"
    }
    let amountOfTrendingGifs = 3;
    for(let i = 0; i<amountOfTrendingGifs; i++) {
        gifs[lowerLimit+i].style.display = "initial"
    }
}


/***************Funcionalidad botones del slider *************/

document.getElementById("right-slider").addEventListener("click", moveToRight);
document.getElementById("left-slider").addEventListener("click", moveToleft);


function moveToRight (e) {
    e.preventDefault();
    console.log(e.target);
    let allGifs = document.querySelectorAll(".imageContainer");//Ojo que tanto los de favoritos como los de trending comparte esta clase, esto te va a traer todo
    let gifs = [];
    for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
        if(gif.parentNode.id ==="trendingContainer") {//filtro de acuerdo a la seccion, en este caso solo me interesaba trending
            gifs.push(gif); //si pertenece a trending a ese elemento lo pusheo al array
        }
    }
    console.log(gifs);
    let positions = [];
    for (let i = 0; i<gifs.length; i++) {
        if(gifs[i].style.display === "initial") { //cada vez que hago click y ya tengo filtrados solo los gif de la seccion pregunto cual de ellos esta en estado initial 
            positions.push(i);
        }
    }
    console.log(positions);
    for (let gif of gifs ) {
        gif.style.display = "none"//Esto me hace volaaar los gif de favoritos si se encuentra abierto
    }
    let amountOfTrendingGifs = 3;
    for(let i = 0; i<amountOfTrendingGifs; i++) {
        let numberToCompare = +localStorage.getItem("limit");
        console.log(numberToCompare);
        if(lookingForTheEndElement(positions, numberToCompare)){//si ejecuta este if significa que debe consultar por 12 mas
            console.log("necesito consultar 12 gif trending adicionales");
            document.getElementById("right-slider").removeEventListener("click", moveToRight);
            queryToGifTrending(limitGenerator())
            break;
        }
        else {
            console.log("sigue trabajando con los trending ya disponibles");
            gifs[positions[i]+3].style.display = "initial"
        }
    }
}

function moveToleft () {
    let allGifs = document.querySelectorAll(".imageContainer");//Ojo que tanto los de favoritos como los de trending comparte esta clase, esto te va a traer todo
    let gifs = [];
    for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
        if(gif.parentNode.id ==="trendingContainer") {
            gifs.push(gif);
        }
    }
    console.log(gifs);
    let positions = [];
    for (let i = 0; i<gifs.length; i++) {
        if(gifs[i].style.display === "initial") {
            positions.push(i);
        }
    }
    console.log(positions);
    for (let gif of gifs ) {
        gif.style.display = "none"
    }
    let amountOfTrendingGifs = 3;
    for(let i = 0; i<amountOfTrendingGifs; i++) {
        // let numberToCompare = +localStorage.getItem("limit");
        // console.log(numberToCompare);
        if(lookingForTheStartElement(positions)){//si ejecuta este if significa que debe consultar por 12 mas
            console.log("necesito consultar 12 gif trending adicionales");
            document.getElementById("left-slider").removeEventListener("click", moveToleft);
            queryToGifTrending(limitGenerator())
            break;
        }
        else {
            console.log("sigue trabajando con los trending ya disponibles");
            gifs[positions[i]-3].style.display = "initial"
        }
    }
}

function lookingForTheEndElement(position, numberToCompare) {
    for(let i = 0; i<position.length; i++) {
        if(position[i] === numberToCompare -1){
            return true;    
        }
    }
    return false;
}

function lookingForTheStartElement(position, numberToCompare) {
    for(let i = 0; i<position.length; i++) {
        if(position[i] === 0){
            return true;    
        }
    }
    return false;
}

function limitGenerator() {
    let limit = +localStorage.getItem("limit");
    console.log(typeof(limit))
    limit += 12;
    localStorage.setItem("limit", limit);
    return limit;
}

/********A MODO NOCTURNO**************/
let menuHamburguesa = document.getElementById("menu-hamburguesa");
var btnNocturneMode = document.getElementById("boton-menu");
let modoNocturnoOn = "true"; 
document.getElementById("a_modoNocturno").addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if (window.matchMedia("(max-width: 767px)").matches) {
        if(menuHamburguesa.getAttribute("src") === "./assets/close.svg") {
            console.log("a nocturno");
            modoNocturnoOn = "false";
            console.log(modoNocturnoOn);
            localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
            // leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
            // rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
            menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");  
            putAllIconAndImageNoc();
            document.getElementById("expandGif").style.background = "#37383C";
            document.getElementById("a_modoNocturno").textContent = "Modo Diurno";
        }
        else {
            console.log("a diurno");
            modoNocturnoOn = "true";
            console.log(modoNocturnoOn);
            localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
            // leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
            // rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
            menuHamburguesa.setAttribute("src", "./assets/close.svg");
            putAllIconAndImageDiurno();
            document.getElementById("expandGif").style.background = "#FFF";
            document.getElementById("a_modoNocturno").textContent = "Modo Nocturno";
        }
    }else {
        if(document.getElementById("a_modoNocturno").textContent === "Modo Nocturno") {
            console.log("a nocturno");
            modoNocturnoOn = "false";
            console.log(modoNocturnoOn);
            localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
            // leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
            // rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
            menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");  
            putAllIconAndImageNoc();
            document.getElementById("expandGif").style.background = "#37383C";
            document.getElementById("a_modoNocturno").textContent = "Modo Diurno";
        }
        else {
            console.log("a diurno");
            modoNocturnoOn = "true";
            console.log(modoNocturnoOn);
            localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
            // leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
            // rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
            menuHamburguesa.setAttribute("src", "./assets/close.svg");
            putAllIconAndImageDiurno();
            document.getElementById("expandGif").style.background = "#FFF";
            document.getElementById("a_modoNocturno").textContent = "Modo Nocturno";
        }
    }
});

function putAllIconAndImageNoc() {
    document.getElementById("camara").setAttribute("src", "./assets/captura/camara_luz_noct.svg");
    document.getElementById("film").setAttribute("src", "./assets/captura/pelicula_noct.svg")
    document.getElementById("fb-icon").setAttribute("src", "./assets/icon_facebook_noc.svg")
    document.getElementById("tw-icon").setAttribute("src", "./assets/icon_twitter_noc.svg")
    document.getElementById("ig-icon").setAttribute("src", "./assets/icon_instagram_noc.svg")
    document.getElementById("left-slider-expand").setAttribute("src", "./assets/button-slider-left-md-noct.svg")
    document.getElementById("right-slider-expand").setAttribute("src", "./assets/button-slider-right-md-noct.svg")
    document.getElementById("left-slider").setAttribute("src", "./assets/button-slider-left-md-noct.svg")
    document.getElementById("right-slider").setAttribute("src", "./assets/button-slider-right-md-noct.svg")
}

function putAllIconAndImageDiurno() {
    document.getElementById("camara").setAttribute("src", "./assets/captura/camara_luz.svg");
    document.getElementById("film").setAttribute("src", "./assets/captura/pelicula.svg")
    document.getElementById("fb-icon").setAttribute("src", "./assets/icon_facebook.svg")
    document.getElementById("tw-icon").setAttribute("src", "./assets/icon-twitter.svg") 
    document.getElementById("ig-icon").setAttribute("src", "./assets/icon_instagram.svg")
    document.getElementById("left-slider-expand").setAttribute("src", "./assets/button-slider-left.svg")
    document.getElementById("right-slider-expand").setAttribute("src", "./assets/Button-Slider-right.svg")
    document.getElementById("left-slider").setAttribute("src", "./assets/button-slider-left.svg")
    document.getElementById("right-slider").setAttribute("src", "./assets/Button-Slider-right.svg")
}

btnNocturneMode.addEventListener("change", validacionCheckbox); 

function validacionCheckbox () {
    var checked = btnNocturneMode.checked;
    if(checked)
    {
        if(menuHamburguesa.getAttribute("src") === "./assets/burger.svg") {
            menuHamburguesa.setAttribute("src", "./assets/close.svg");
        }
        else {
            menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");
        }
    }
    else {
        if(menuHamburguesa.getAttribute("src") === "./assets/close.svg") {
            menuHamburguesa.setAttribute("src", "./assets/burger.svg");
        }
        else {
            console.log("puse el hamburguer nocturno");
            menuHamburguesa.setAttribute("src", "./assets/burger-modo-noct.svg");
        }
    }
}


/********Show Favorites **********/
document.getElementById("a_favoritos").addEventListener("click", showFavorite);

let withoutContentWasShown = false; 

function showFavorite() {
    //Todavia no entiendo para que cierra el nav
    console.log("clickeaste en favoritos");
    document.getElementById("favoriteContainer").innerHTML ="";
    withoutContentWasShown = false;
    document.getElementById("favorites").style.display = "initial";//mostramos esa sección que hasta ahora estaba oculta
    document.getElementById("trending").style.display = "initial";
    document.getElementById("search").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("myGifos").style.display = "none";
    document.getElementById("myGifos").style.display = "none";
    document.getElementById("createYourGif").style.display = "none";
    //me falt agregar aca algunas cosas que hay que ocultar pero que todavia no esten creadas
    let favoriteAmount = 0;
    let limit = 12;
    
    var favs = JSON.parse(localStorage.getItem('favoritos'));
    let offset = 0;
    let oneMoreBringAmount = 0;
    localStorage.setItem("offset", offset);
    localStorage.setItem("oneMoreBringAmount", oneMoreBringAmount);
    if(!favs) {//si no existe favoritos en local favs sera null y negado será true y se tratara en este if
        //aca va la funcion favSinContenido(), ejecutada por que ni existe todavia el elemento el localStorage
        favWithoutContent();
        withoutContentWasShown = true; 
    }
    else {
        favoriteAmount = favs.length;    
        if(favoriteAmount === 0) {
            console.log("no habia ningun favorito guachin");
            //aca va una funcion
            //aca va la funcion favSinContenido(), ejecutada por que si existe favoritos en localStorage pero actualmente esta vacio
            favWithoutContent();
            withoutContentWasShown = true; //esta puede significar que ya se mostró
        }
        else {
            // if(withoutContentWasShown === true) {
            //     nowThereIsContent();
            //     // withoutContentWasShown = false;
            // }
            //dependiendo la cantidad de favoritos habra o no verMas btn
            favoriteAmount > limit ? document.getElementById("verMasBtnFavs").style.display = "initial" : document.getElementById("verMasBtnFavs").style.display = "none"
            document.getElementById("verMasBtnFavs").addEventListener("click", bringNewFavorites);// a definir showMoreFavs
    
    
            showFavorites()
    
            // function showFavorites() {
            //     document.getElementById("favoriteContainer").innerHTML ="";
            //     for(let i=0; i< favoritos.length; i++) {//solo recorro el objeto que ya traje de ahi
            //             showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            //         }
            // }
        }
    }
}


function favWithoutContent() {
    let img = document.createElement("img");
    img.setAttribute("src", "./assets/icon-fav-sin-contenido.svg");
    img.className = "favSinContenido";
    img.id = "favSinContenidoImg";
    let paragraph = document.createElement("p");
    paragraph.id = "favSinContenidoParagraph"
    paragraph.innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"
    document.getElementById("favoriteContainer").append(img, paragraph);
    document.getElementById("verMasBtnFavs").style.display = "none";
}

function nowThereIsContent(){
    // debugger;
    document.getElementById("favSinContenidoImg").style.display = "none";
    document.getElementById("favSinContenidoParagraph").style.display = "none";
}

function nowThereIsntContent(){
    // debugger;
    document.getElementById("favSinContenidoImg").style.display = "initial";
    document.getElementById("favSinContenidoParagraph").style.display = "initial";
}


function showOneFavoriteGif(gifId) {
    let urlOneGif = "https://api.giphy.com/v1/gifs"
    +"?api_key="
    +APIKEY
    +"&ids="
    +gifId

    fetch(urlOneGif)
        .then(response => response.json())
        .then(({data}) => data.map(drawFavGif))

        function drawFavGif(gif) {
            let imageContainer = document.createElement("div");
            imageContainer.className ="imageContainer";

            let image = document.createElement("img");
            image.src = gif.images.original.url;
            image.title = gif.title+"&"+gif.username;
            image.user = gif.username;
            image.id = "favSection"+gif.id;
            image.className = "small";

            imageContainer.append(image);
            document.getElementById("favoriteContainer").appendChild(imageContainer);
            hoverAndBtns(image);
        }
}

function unShowOneFavoriteGif(gifId) {//este gifId esta normal sin favSection
    let gifIdModified = "favSection" + gifId;    
    let img = document.getElementById(gifIdModified);
    img.parentNode.remove();
}

function unShowOneOfMyGifos(gifId) {//este gifId esta normal sin favSection
    let img = document.getElementById(gifId);
    img.parentNode.remove();
}

// function showMoreFavs() {
//     console.log("La opción mostrar 12 favoritos mas se ejecuto exitosamente");
// }

function showFavorites() {
    var favoritos = JSON.parse(localStorage.getItem('favoritos'));
    let offset = +localStorage.getItem("offset");//inicia en 0 y incrementa 12 cdo uno presiona ver mas
    // let oneMoreBringAmount = +localStorage.getItem("oneMoreBringAmount")
    let amountOfFavsGif = 12;
    if( offset === 0) {
        console.log("Es la primera a vez que se rendizará favoritos limpiaremos la pantalla");
        document.getElementById("favoriteContainer").innerHTML ="";
        if(favoritos.length < 12) {
            console.log("tiene menos de 12 elementos en favoritos los rendizaremos por completo");
            for(let i=0; i< favoritos.length; i++) {//solo recorro el objeto que ya traje de ahi
                showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
        else {
            console.log("tiene mas de 12 elementos en favoritos rendizaremos 12 y despues vemos como sigue");
            for(let i=0; i< amountOfFavsGif; i++) {//solo recorro el objeto que ya traje de ahi
                showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
    }
    else {
        console.log("Si ingreso aqui es por que presiono el boton ver mas");
        if((favoritos.length - offset)<12) {
            for(let i=offset; i< favoritos.length; i++) {//solo recorro el objeto que ya traje de ahi
                showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
            console.log("deshabilitamos el btn");
            document.getElementById("verMasBtnFavs").style.display = "none";
        }
        else {
            for(let i=offset; i< offset+12; i++) {//solo recorro el objeto que ya traje de ahi
                showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
    }
}

// document.getElementById("verMasBtnFavs").addEventListener("click", bringNewFavorites);

function increaseOffsetFavs() {
    let offset = +localStorage.getItem("offset");
    offset+=12;
    localStorage.setItem("offset", offset);
}

function bringNewFavorites() {
    increaseOffsetFavs();
    showFavorites();
}

function imprimirIdDeFavorito() {
    let allFavoriteGifs = JSON.parse(localStorage.getItem("favoritos"));
    for (let gif of allFavoriteGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
        console.log(gif.id);
    }
}



/*****Graficar mis gifos ************/

document.getElementById("a_misGifos").addEventListener("click", showMyGifos);

let withoutContentMyGiphosWasShown = false;

function showMyGifos() {
    //Todavia no entiendo para que cierra el nav
    console.log("clickeaste en mis Gifos");
    document.getElementById("myGifosContainer").innerHTML ="";
    withoutContentMyGiphosWasShown = false;
    document.getElementById("myGifos").style.display = "initial";
    document.getElementById("trending").style.display = "initial";
    document.getElementById("favorites").style.display = "none";//mostramos esa sección que hasta ahora estaba oculta
    document.getElementById("search").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("createYourGif").style.display = "none";
    //me falt agregar aca algunas cosas que hay que ocultar pero que todavia no esten creadas
    let myGifosAmount = 0;
    let limit = 12;
    
    var myGifos = JSON.parse(localStorage.getItem('misGifos'));
    let offsetMyGifos = 0;
    let oneMoreBringAmountOfMyGifs = 0;
    localStorage.setItem("offsetMyGifos", offsetMyGifos);
    localStorage.setItem("oneMoreBringAmountOfMyGifs", oneMoreBringAmountOfMyGifs);
    if(!myGifos) {//si no existe favoritos en local favs sera null y negado será true y se tratara en este if
        //aca va la funcion favSinContenido(), ejecutada por que ni existe todavia el elemento el localStorage
        console.log("entre a donde queria");
        myGiphosWithoutContent();
        withoutContentMyGiphosWasShown = true;
    }
    else {
        myGifosAmount = myGifos.length;    
        if(myGifosAmount === 0) {
            console.log("no habia ningun gif en myGifos guachin");
            //aca va una funcion
            //aca va la funcion favSinContenido(), ejecutada por que si existe favoritos en localStorage pero actualmente esta vacio
            myGiphosWithoutContent();
            withoutContentMyGiphosWasShown = true;
        }
        else {
            // if(withoutContentMyGiphosWasShown === true) {
            //     nowThereIsContentMyGiphos();
            //     withoutContentMyGiphosWasShown = false;
            // }
            //dependiendo la cantidad de favoritos habra o no verMas btn
            myGifosAmount > limit ? document.getElementById("verMasBtnMyGifos").style.display = "block" : document.getElementById("verMasBtnMyGifos").style.display = "none"
            document.getElementById("verMasBtnMyGifos").addEventListener("click", bringNewMyGifos)// a definir showMoreFavs
    
    
            showMyOwnGifos()
    
            // function showFavorites() {
            //     document.getElementById("favoriteContainer").innerHTML ="";
            //     for(let i=0; i< favoritos.length; i++) {//solo recorro el objeto que ya traje de ahi
            //             showOneFavoriteGif(favoritos[i].id)//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            //         }
            // }
        }
    }
}

function myGiphosWithoutContent() {//Ojo con la duplicacion de elementos
    let img = document.createElement("img");
    img.setAttribute("src", "./assets/icon-mis-gifos-sin-contenido.svg");
    img.className = "misGifosSinContenido";
    img.id = "misGifosSinContenidoImg";
    let paragraph = document.createElement("p");
    paragraph.id = "misGifosSinContenidoParagraph";
    paragraph.innerText = "¡Anímate a crear tu primer GIFO!";
    document.getElementById("myGifosContainer").append(img, paragraph);
    document.getElementById("verMasBtnMyGifos").style.display = "none";
}

function nowThereIsContentMyGiphos() {
    document.getElementById("misGifosSinContenidoImg").style.display = "none";
    document.getElementById("misGifosSinContenidoParagraph").style.display = "none";
}

function nowThereIsntContentMyGiphos() {
    document.getElementById("misGifosSinContenidoImg").style.display = "initial";
    document.getElementById("misGifosSinContenidoParagraph").style.display = "initial";
}

function showMyOwnGifos() {
    var myGifos = JSON.parse(localStorage.getItem('misGifos'));
    let offsetMyGifos = +localStorage.getItem("offsetMyGifos");//inicia en 0 y incrementa 12 cdo uno presiona ver mas
    // let oneMoreBringAmountOfMyGifs = localStorage.getItem("oneMoreBringAmountOfMyGifs");
    let amountOfFavsGif = 12;
    if( offsetMyGifos === 0) {
        console.log("Es la primera a vez que se rendizará misGifos limpiaremos la pantalla");
        document.getElementById("myGifosContainer").innerHTML ="";
        if(myGifos.length < 12) {
            console.log("tiene menos de 12 elementos en myGifos los rendizaremos por completo");
            for(let i=0; i< myGifos.length; i++) {//solo recorro el objeto que ya traje de ahi
                showOneOwnGif(myGifos[i])//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
        else {
            console.log("tiene mas de 12 elementos en favoritos rendizaremos 12 y despues vemos como sigue");
            for(let i=0; i< amountOfFavsGif; i++) {//solo recorro el objeto que ya traje de ahi
                showOneOwnGif(myGifos[i])//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
    }
    else {
        console.log("Si ingreso aqui es por que presiono el boton ver mas");
        if((myGifos.length - offsetMyGifos)<12) {
            for(let i=offsetMyGifos; i< myGifos.length; i++) {//solo recorro el objeto que ya traje de ahi
                showOneOwnGif(myGifos[i])//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
            console.log("dejamos de mostrar el boton ver mas");
            document.getElementById("verMasBtnMyGifos").style.display = "none";
        }
        else {
            for(let i=offsetMyGifos; i< offsetMyGifos+12; i++) {//solo recorro el objeto que ya traje de ahi
                showOneOwnGif(myGifos[i])//vamos pasando el id elemento a elemento a showOneFavoriteGif 
            }
        }
    }
}

function showOneOwnGif(gifId) {
    let urlOneGif = "https://api.giphy.com/v1/gifs"
    +"?api_key="
    +APIKEY
    +"&ids="
    +gifId

    fetch(urlOneGif)
        .then(response => response.json())
        .then(({data}) => data.map(drawMyGif))

        function drawMyGif(gif) {
            let imageContainer = document.createElement("div");
            imageContainer.className ="imageContainer";

            let image = document.createElement("img");
            image.src = gif.images.original.url;
            image.title = gif.title+"&"+gif.username;
            image.user = gif.username;
            image.id = gif.id;
            image.className = "small";

            imageContainer.append(image);
            document.getElementById("myGifosContainer").appendChild(imageContainer);
            hoverAndBtns(image);
        }
}

function increaseOffsetMyGifos() {
    let offsetMyGifos = +localStorage.getItem("offsetMyGifos");
    offsetMyGifos+=12;
    localStorage.setItem("offsetMyGifos", offsetMyGifos);
}

function bringNewMyGifos() {
    increaseOffsetMyGifos();
    showMyOwnGifos();
}

/*****Crear mi propio gifo *********/
document.getElementById("linkyourGif").addEventListener("click", showCreateYourGifSection);//este es un evento del boton +

function showCreateYourGifSection() {
    document.getElementById("favoriteContainer").innerHTML="";
    document.getElementById("favorites").style.display="none";//escondemos la seccion favorites
    document.getElementById("search").style.display = "none";//escondemos la seccion search
    document.getElementById("searchResults").style.display= "none";//escondemos la seccion searchResults
    document.getElementById("trending").style.display= "none";//escondemos la seccion searchResults
    document.getElementById("myGifos").style.display = "none";
    document.getElementById("textsYourOwnGif").style.display = "initial";
    document.getElementById("startProcess").style.display = "initial";
    document.getElementById("step1").setAttribute("src", "./assets/captura/paso_1.svg")
    document.getElementById("step2").setAttribute("src", "./assets/captura/paso_2.svg")
    document.getElementById("step3").setAttribute("src", "./assets/captura/paso_3.svg")
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("startRecording").style.display = "none";
    document.getElementById("endRecording").style.display = "none";
    document.getElementById("uploadYourGif").style.display = "none";
    document.getElementById("giveYourPermission").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("loadingImage").style.display = "none";
    clearInterval(contar);
    document.getElementById("createYourGif").style.display="initial";//Mostramos la seccion createYourGif
}

//activar camara al presionar comenzar
document.getElementById("startProcess").addEventListener("click", startRecordingProcess)

function startRecordingProcess() {
    document.getElementById("videoContainer").style.background = "none";
    document.getElementById("uploadText").style.display = "none";
    document.getElementById("video").style.opacity = "1";
    document.getElementById("startProcess").style.display = "none";
    document.getElementById("videoContainer").style.display = "initial";
    document.getElementById("step1").setAttribute("src", "./assets/captura/paso_1_active.svg")
    document.getElementById("textsYourOwnGif").style.display ="none";
    document.getElementById("giveYourPermission").style.display ="initial";
    startVideo();
}

const constraintObj = {
    audio: false,
        video: {
            height: {max: 480}
        }
}

function startVideo() {
    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(mediaStreamObj){
        let video = document.getElementById("video");
        video.srcObject = mediaStreamObj;
        video.onloadedmetadata = function (e) {
            video.play();
        }
        document.getElementById("startRecording").style.display = "block";
        document.getElementById("giveYourPermission").style.display = "none"
        document.getElementById("step1").setAttribute("src", "./assets/captura/paso_1.svg")
        document.getElementById("step2").setAttribute("src", "./assets/captura/paso_2_active.svg")
        // let mediaRecorder = new MediaRecorder(mediaStreamObj)
        // let chunks = [];
        document.getElementById("startRecording").addEventListener("click", startRecordingFunction);
        document.getElementById("endRecording").addEventListener("click", stopRecordingFunction);
    })
    .catch (
        function(err) {
            console.log(err.name, err.message);
        }
    )
}






function gettingCameraElement(callback) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(camera) {callback(camera);})
      .catch(function(error) {
        alert("Hubo un problema al acceder a la cámara");
        console.error(error);
      });
  }
  
//   document.getElementById("iniciarCaptura").addEventListener("click", aGrabar)
  
  function startRecordingFunction() {
    console.log("iniciate a grabar");
    document.getElementById("startRecording").style.display = "none";
    document.getElementById("endRecording").style.display = "block";
    document.getElementById("timer").style.display = "initial";
    document.getElementById("minutes").style.display = "initial";
    document.getElementById("dobleDot").style.display = "initial";
    document.getElementById("seconds").style.display = "initial";
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("startRecordingAgain").style.display = "none";
    gettingCameraElement(function(camera) {
      recorder = RecordRTC(camera, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
        console.log("started")
      }
    });
  
    recorder.startRecording();
    recorder.camera = camera;
  });
  
  contador()
//   document.getElementById("iniciarCaptura").style.display = "none";
//   document.getElementById("finalizarCaptura").style.display = "block";
//   document.getElementById("cronometro").style.display = "initial";
//   document.getElementById("repetirCaptura").style.display = "none";
  };


let contar = "";

function contador() {
  let tiempo = 0;
  contar = setInterval( function(){
    tiempo++;
    document.getElementById("seconds").innerHTML = acomodar(tiempo%60); //1%60 == 1
    document.getElementById("minutes").innerHTML = acomodar(parseInt(tiempo/60));//1/60 parseInt == 0
  }, 1000);

  function acomodar(numero) { 
    console.log(numero);
    numero = "00" + numero;
    console.log(numero.slice(-2));
    return numero.slice(-2)
  }
}


//   document.getElementById("finalizarCaptura").addEventListener("click", finalizarCaptura)

function stopRecordingFunction() {
  clearInterval(contar)
  recorder.stopRecording();
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => stream.getTracks().forEach(track => track.stop()))
      .catch(function(error) {
        alert("Hubo un problema al acceder a la cámara");
        console.error(error);
      });
//   navigator.getUserMedia({audio: false, video: true},
//     function stopVideoOnly(stream) {
//         console.log("entramos a apagar camara");
//         stream.getTracks().forEach(function(track) {
//             if (track.readyState == 'live' && track.kind === 'video') {
//                 console.log("entramos a la parte final de apagar camara");
//                 track.stop();
//             }
//         });
//     },
//     function(error){
//         console.log('getUserMedia() error', error);
//     });
  document.getElementById("endRecording").style.display = "none";
  document.getElementById("uploadYourGif").style.display = "block";
  document.getElementById("minutes").style.display = "none";
  document.getElementById("seconds").style.display = "none";
  document.getElementById("dobleDot").style.display = "none";
  document.getElementById("startRecordingAgain").style.display = "initial";
}

document.getElementById("uploadYourGif").addEventListener("click", subirGif) 

function subirGif() {
  video.pause()

  document.getElementById("startRecordingAgain").style.display = "none";
  document.getElementById("videoContainer").style.background = "rgba(87, 46, 229, 0.8)";
  document.getElementById("uploadText").innerText = "Estamos subiendo tu GIFO";
  document.getElementById("uploadText").style.display = "initial";
  document.getElementById("loadingImage").setAttribute("src", "./assets/ok.svg");
  document.getElementById("loadingImage").style.display = "initial";
  document.getElementById("video").style.opacity = "0.5";
  document.getElementById("uploadYourGif").style.display = "none";
  document.getElementById("step2").setAttribute("src", "./assets/captura/paso_2.svg")
  document.getElementById("step3").setAttribute("src", "./assets/captura/paso_3_active.svg")
  document.getElementById("loadingImage").style.display = "initial";


  blobGrabado = recorder.getBlob()
  console.log(blobGrabado);//en mi codigo tengo este dato igual igualitoooo
  archivo = new FormData();//esto nos ayuda a generar pares clave valor de manera facil
  archivo.append("file", recorder.getBlob(), "gifParaSubir.gif");//pasa como valor de la clave file el valor del blob 

  let urlSubir = "https://upload.giphy.com/v1/gifs"//define la url para apuntar al endpoint que nos permite subir nuestro propio gif
  +"?api_key="
  +APIKEY

  fetch(urlSubir, {
    method: "POST", //Modifica el metodo por defecto del fetch que es get pasandole el tipo de metodo POST y el body necesario para el mismo
    body: archivo,
  })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(({ data }) => guardarGifSubidoYLimpiar(data))
}

function guardarGifSubidoYLimpiar(data) {
  console.log(data.url);
  console.log(data.id);
  console.log(data);
  let misGifosString = localStorage.getItem("misGifos")
  let misGifos;
  if(!misGifosString) {
    misGifos = [];
    misGifos.push(data.id);
    localStorage.setItem("misGifos", JSON.stringify(misGifos));
  }
  else {
    misGifos = JSON.parse(misGifosString);
    misGifos.push(data.id);
    localStorage.setItem("misGifos", JSON.stringify(misGifos));
  }
//   localStorage.getItem("gifSubido"+data.id) ? null : localStorage.setItem("gifSubido"+data.id, data.id)
  document.getElementById("uploadText").innerText = "GIFO subido con éxito";
  document.getElementById("loadingImage").setAttribute("src", "./assets/ok.svg");
 
  recorder.reset();
  recorder.destroy();
  recorder = null;

//   document.getElementById("contenedorVideo").addEventListener("mouseenter", mostrarIconosSubida) 
//   document.getElementById("descargarGifSubido").addEventListener("click", descargarGifSubido) 
//   document.getElementById("enlazarGifSubido").addEventListener("click", enlazarGifSubido) 

//   document.getElementById("cerrarCaptura").style.display = "block";
//   document.getElementById("cerrarCaptura").addEventListener("click", cerrarVideo)  

  function mostrarIconosSubida() {
    document.getElementById("iconosSubida").style.display = "initial";
  }

  function descargarGifSubido() {
    invokeSaveAsDialog(blobGrabado, "MiGifo.gif");
  }

  function enlazarGifSubido() {
    alert(`El enlace al GIFO subido es el siguiente: http://www.giphy.com/gifs/${data.id}`)
  }
}



 document.getElementById("startRecordingAgain").addEventListener("click", repeatYourGif)

 function repeatYourGif() {
    document.getElementById("uploadYourGif").style.display = "none";
    document.getElementById("minutes").style.display = "initial";
    document.getElementById("dobleDot").style.display = "initial";
    document.getElementById("seconds").style.display = "initial";
    startRecordingFunction();
 }




// function showOneFavoriteGif(gifId) {
//     let urlOneGif = "https://api.giphy.com/v1/gifs"
//     +"?api_key="
//     +APIKEY
//     +"&ids="
//     +gifId

//     fetch(urlOneGif)
//         .then(response => response.json())
//         .then(({data}) => data.map(drawFavGif))

//         function drawFavGif(gif) {
//             let imageContainer = document.createElement("div");
//             imageContainer.className ="imageContainer";

//             let image = document.createElement("img");
//             image.src = gif.images.original.url;
//             image.title = gif.title;
//             image.user = gif.username;
//             image.id = gif.id;
//             image.className = "small";

//             imageContainer.append(image);
//             document.getElementById("favoriteContainer").appendChild(imageContainer);
//             hoverAndBtns(image);
//         }
// }


/*********Sugerencias, busquedas y resultados de busquedas *************/

// document.getElementById("searchBar").addEventListener("keydown", cleanListAfterClick)

// function cleanListAfterClick(e) {
//     if(e.keyCode === 13) {
//         console.log("presionaste enter");
//         let liElements = document.getElementsByClassName("suggestionItem");
//         for (let i= 0; i<liElements.length; i++){
//             liElements[i].remove();
//         }
//         document.getElementById("searchSuggestions").innerHTML = "";
//         document.getElementById("searchSuggestions").style.display ="none";
//     }
// }

document.getElementById("searchIcon").addEventListener("click", findSearchedValue)

function findSearchedValue (e) {
    console.log("la cruz tmb activo el evento");
    e.preventDefault();
    let toSearch = document.getElementById("searchBar").value;
    localStorage.setItem("toSearch", toSearch);//guardamos en localStorage la busqueda que realiza el usuario por si necesita consultar de nuevo
    searchFunction(toSearch, 12)
    localStorage.setItem("limit", 12)//siempre que hagamos una nueva busqueda reestablecemos limit a 12
    document.getElementById("searchSuggestions").innerHTML = "";
    document.getElementById("searchSuggestions").style.display ="none";
    //este dato ayuda a llevar un registro para hacer un offset adecuado
}


function searchFunction (toSearch, limit) {
    console.log(toSearch);
    let offset = limit -12;//si al ppio el limit es 12 el offset es 0 para la sgte entrada el offset es 12 por que limit es 24
    document.getElementById("searchResults").style.display = "initial";//estaba en none
    console.log(document.getElementById("searchTitle"));
    document.getElementById("searchTitle").textContent = toSearch;
    if(limit === 12) {// solo si es la primera vez que se entra aqui en una nueva busqueda limpiar el container
        let searchContainer = document.getElementById("searchContainer");
        searchContainer.innerHTML = "";
    }
    let searchUrl = "https://api.giphy.com/v1/gifs/search?"
    + "api_key="+APIKEY
    +"&q="+toSearch
    +"&lang=es"+"&limit="+limit
    +"&offset=" + offset

    fetch(searchUrl)
        .then(result => {
            if (result.status === 200) {
                return result.json();
            }
            else {
                alert("server error");
            }
        })
        .then( ({pagination, data}) =>  { //recupero solo algunas propiedades del result.json()
            console.log(pagination);
            console.log(data);
            if(data.length === 0) {
                noResult();
            }
            else {
                data.map(drawGifSearched);
                let showMore = false;
                if(pagination.total_count > limit) {
                    showMore = true;
                }
                showMore ? document.getElementById("verMasBtn").style.display="initial" : document.getElementById("verMasBtn").style.display="none"
            }
        })


}

function noResult() {

    let image = document.createElement("img");
    image.src = "assets/icon-busqueda-sin-resultado.svg";
    image.className = "smallNoresult";
    //dar una clase dar estilo
    let text = document.createElement("p");
    text.innerText = "Intenta con otra busqueda";
    text.className = "searchAgain";
    //dar clase para estilo 
    document.getElementById("searchContainer").append(image, text);
    document.getElementById("verMasBtn").style.display = "none";
}

function drawGifSearched (gif) {
    let imageContainer = document.createElement("div");//creamos el contenedor de la imagen
    imageContainer.className = "imageContainer";
    let img = document.createElement("img"); //creamos una imagen
    //img es un objeto sobre al cual deben pertenecer todas las propiedades del objeto
    img.title = gif.title+"&"+gif.username;
    img.user = gif.username;
    img.src = gif.images.original.url;
    img.id = gif.id; //esto hara diferente cada imagen
    //se le asigna una clase
    img.className = "small";
    imageContainer.append(img);
    document.getElementById("searchContainer").appendChild(imageContainer);
    hoverAndBtns(img);
}


/************ Ver mas button ******************/
document.getElementById("verMasBtn").addEventListener("click", setOffset);

function setOffset(e) {
    let limit = +localStorage.getItem("limit");
    limit = limit + 12;
    //guardamos este incremento en local storage
    localStorage.setItem("limit", limit);
    e.preventDefault();
    //recuperemos lo que el usuario estaba guardando
    let busqueda = localStorage.getItem("toSearch");
    searchFunction(busqueda, limit);
}


/****************Sugerencias de busquedaaaa ***************/

document.getElementById("searchBar").addEventListener("keyup", suggestionFunction);

function suggestionFunction(e) {
    if(e.keyCode != 13) {
        if(document.getElementById("searchBar").value != ""){
            let toSearch = document.getElementById("searchBar").value;
            document.getElementById("searchSuggestions").innerHTML = "";//limpiamos las suggestions
            document.getElementById("searchSuggestions").style.display = "initial";

            // let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&limit=5&q=${a_buscar}`;
            // let suggestionUrl = "https://api.giphy.com/v1/tags/related/"
            // + toSearch
            let suggestionUrl = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&limit=5&q=${toSearch}`

            fetch(suggestionUrl)
            .then(response => response.json())
            .then(({data}) => data.map(drawSuggestions))
        } else {
            document.getElementById("searchSuggestions").innerHTML = "";
            document.getElementById("searchSuggestions").style.display ="none";
        }
    }else {
        document.getElementById("searchSuggestions").innerHTML = "";
        document.getElementById("searchSuggestions").style.display ="none";
    }
}
    
function drawSuggestions(sug) {
    let suggestionsLimit = 5;
    if(document.getElementById("searchSuggestions").childElementCount < suggestionsLimit) {
        let suggestionItem = document.createElement("li");
        suggestionItem.className = "suggestionItem";
        suggestionItem.addEventListener("click", searchForSuggestion)
        //le ponemos una clase
        //se le creaa un evento que todavia no se para que es   
        let itemContent = document.createTextNode(sug.name);
        suggestionItem.append(itemContent);
        document.getElementById("searchSuggestions").append(suggestionItem);
    }
}

function searchForSuggestion() {
    let toSearch = this.innerText;
    searchFunction(toSearch, 12);
    document.getElementById("searchSuggestions").innerHTML = "";
    document.getElementById("searchSuggestions").style.display ="none";
}

document.getElementById('searchBar').addEventListener('input', (e) => {
    document.getElementById("searchSuggestions").innerHTML = "";
    document.getElementById("searchSuggestions").style.display ="none";
  })


  /*************Expandir la imagen **************/
  function expandGifMobile(e) { 
      document.getElementById("right-slider-expand").style.display="initial";
      document.getElementById("left-slider-expand").style.display="initial";
      document.getElementById("saveGif").style.display="initial";
      document.getElementById("closeGif").style.display="initial";
      document.getElementById("downloadGif").style.display="initial";
      if(document.getElementById("expandGif").getElementsByTagName("p").length != 0) {
          console.log("estoy entrando aqui por que ya cree un p");
          document.getElementById("expandedUser").style.gridColumn = "1/2";
      }
      console.log(e.target);
      console.log(e.target.parentNode.parentNode);
      rootOfGifsMobile = e.target.parentNode.parentNode.id;
      console.log(rootOfGifsMobile);
      if(rootOfGifsMobile === "myGifosContainer") {
        console.log("Entre aqui y deberia remover la clase");
        console.log(document.getElementById("saveGif").classList);
        console.log(document.getElementById("saveGif").classList[0]);
        document.getElementById("saveGif").classList.remove("heartIconExpanded");
        document.getElementById("saveGif").classList.remove("saveGif");
        document.getElementById("saveGif").classList.add("trashGif");
        // debugger;
      }else {
        console.log("Entre aqui y deberia añadir la clase");
        document.getElementById("saveGif").classList.remove("trashGif");
        // debugger;
        document.getElementById("saveGif").classList.add("saveGif");  
      }
      console.log("Estas expandiendo tu gif");
      document.getElementById("expandGif").style.display = "grid";
      if(modoNocturnoOn === "true") {
        document.getElementById("expandGif").style.background = "white";
      }else {
        document.getElementById("expandGif").style.background = "#37383C";  
      }
      document.getElementById("closeGif").style.display = "initial";
      document.getElementById("downloadGif").style.display = "initial";
      console.log(e.target.title);
      let ampersandPosition = findAmpersandPosition(e.target.title);
      if(document.getElementById("expandGif").getElementsByTagName("p").length === 0) {
        let title = document.createElement("p");
        title.innerText = "";
        title.innerText = extractTitle(e.target.title, ampersandPosition);
        title.className = "expandedTitle";
        title.id = "expandedTitle";

        let user = document.createElement("p");
        user.innerText = "";
        user.innerText = extractUser(e.target.title, ampersandPosition);
        user.className = "expandedUser";
        user.id = "expandedUser";

        document.getElementById("btnsAndTextContainer").append(user, title);

        let expandedImage = document.createElement("img");
        expandedImage.src = e.target.src;
        expandedImage.className = "expandedImage";
        expandedImage.id = "expandedImage"+e.target.id;
        expandedImage.title = e.target.title;
        expandedGifContainer = document.getElementById("expandGif");
        expandedGifContainer.className = "expandedGifContainer";
        expandedGifContainer.append(expandedImage);
    }
    else {
        document.getElementById("expandedTitle").innerText = "";
        document.getElementById("expandedTitle").innerText = extractTitle(e.target.title, ampersandPosition);
        document.getElementById("expandedUser").innerText = "";
        document.getElementById("expandedUser").innerText = extractUser(e.target.title, ampersandPosition);
        console.log(expandedGifContainer.lastElementChild);
        let referenceToExpandedImage = expandedGifContainer.lastElementChild;
        referenceToExpandedImage.src = e.target.src;
        referenceToExpandedImage.id = "expandedImage"+e.target.id;
        referenceToExpandedImage.title = e.target.title;
    }

    if(rootOfGifsMobile != "myGifosContainer") {
        drawHeartBaseOnFavoriteList(e.target.id);
    }    
    document.getElementById("right-slider-expand").addEventListener("click", moveToRightExpand);
    document.getElementById("left-slider-expand").addEventListener("click", moveToLeftExpand);
    document.getElementById("saveGif").addEventListener("click",saveGifAsFavoriteExpandMobile)
    document.getElementById("closeGif").addEventListener("click", closeExpandSectionMobile)
    document.getElementById("downloadGif").addEventListener("click", downloadExpandedGif);
}
  function expandGif(e) {
    console.log(e.target.parentNode.parentNode); //Estp me va a decir de donde viene el expand para el slider
    rootOfGifs = e.target.parentNode.parentNode.id; //Esta variable tiene el origen de los gifs
    console.log(rootOfGifs);
    if(rootOfGifs === "myGifosContainer") {
        console.log("Entre aqui y deberia remover la clase");
        console.log(document.getElementById("saveGif").classList);
        console.log(document.getElementById("saveGif").classList[0]);
        document.getElementById("saveGif").classList.remove("saveGif");
        document.getElementById("saveGif").classList.add("trashGif");
        // debugger;
    }else {
        console.log("Entre aqui y deberia añadir la clase");
        document.getElementById("saveGif").classList.remove("trashGif");
        // debugger;
        document.getElementById("saveGif").classList.add("saveGif");  
    }
    //creamos los elementos necesarios a colocar dentro de este etapa 1) la imagen 2) el usuario 3) titulo
    console.log("Estas expandiendo tu gif");
    document.getElementById("expandGif").style.display = "grid";
    document.getElementById("closeGif").style.display = "initial";
    document.getElementById("downloadGif").style.display = "initial";
    // let expandedImage = document.createElement("img");
    // expandedImage.src = currentUrl;
    // expandedImage.className = "expandedImage";
    // expandedImage.id = "expandedImage"+currentId;
    // expandedImage.title = currentTitle;

    //currentTitle hace referencia al titulo modificado que generamos que contiene el usuario y el title
    //vamos a separar cada valor por separado
    let ampersandPosition = findAmpersandPosition(currentTitle);
    if(document.getElementById("expandGif").getElementsByTagName("p").length === 0) {
        let title = document.createElement("p");
        title.innerText = "";
        title.innerText = extractTitle(currentTitle, ampersandPosition);
        title.className = "expandedTitle";
        title.id = "expandedTitle";

        let user = document.createElement("p");
        user.innerText = "";
        user.innerText = extractUser(currentTitle, ampersandPosition);
        user.className = "expandedUser";
        user.id = "expandedUser";

        document.getElementById("btnsAndTextContainer").append(user, title);

        let expandedImage = document.createElement("img");
        expandedImage.src = currentUrl;
        expandedImage.className = "expandedImage";
        expandedImage.id = "expandedImage"+currentId;
        expandedImage.title = currentTitle;
        expandedGifContainer = document.getElementById("expandGif");
        expandedGifContainer.className = "expandedGifContainer";
        expandedGifContainer.append(expandedImage)

       
    }
    else {
        document.getElementById("expandedUser").style.gridColumn = "1/2";
        document.getElementById("expandedUser").style.textAlign = "";
        document.getElementById("saveGif").style.display = "initial";
        document.getElementById("downloadGif").style.display = "initial";
        document.getElementById("left-slider-expand").style.display = "initial";
        document.getElementById("right-slider-expand").style.display = "initial";

        document.getElementById("expandedTitle").innerText = "";
        document.getElementById("expandedTitle").innerText = extractTitle(currentTitle, ampersandPosition);
        document.getElementById("expandedUser").innerText = "";
        document.getElementById("expandedUser").innerText = extractUser(currentTitle, ampersandPosition);
        console.log(expandedGifContainer.lastElementChild);
        let referenceToExpandedImage = expandedGifContainer.lastElementChild;
        referenceToExpandedImage.src = currentUrl;
        referenceToExpandedImage.id = "expandedImage"+currentId;
        referenceToExpandedImage.title = currentTitle;
    }
    // let title = document.createElement("p");
    // title.innerText = "";
    // title.innerText = extractTitle(currentTitle, ampersandPosition);
    // title.className = "expandedTitle";
    // title.id = "expandedTitle";

    // let user = document.createElement("p");
    // user.innerText = "";
    // user.innerText = extractUser(currentTitle, ampersandPosition);
    // user.className = "expandedUser";
    // user.id = "expandedUser";


    // document.getElementById("btnsAndTextContainer").append(user, title);
    // if(document.getElementById("expandGif").getElementsByTagName("img").length === 2) {
    //     let expandedImage = document.createElement("img");
    //     expandedImage.src = currentUrl;
    //     expandedImage.className = "expandedImage";
    //     expandedImage.id = "expandedImage"+currentId;
    //     expandedImage.title = currentTitle;
    //     expandedGifContainer.append(expandedImage)
    // }
    // expandedGifContainer = document.getElementById("expandGif");
    // console.log(expandedGifContainer.getElementsByTagName("img").length);
    // console.log(expandedGifContainer.getElementsByTagName("img")[0]);
    // if(expandedGifContainer.getElementsByTagName("img").length === 3) {
    //     console.log("removeremos la imagen antes de redibujar");
    //     expandedGifContainer.getElementsByTagName("img")[2].remove();
    // }
    // expandedGifContainer.className = "expandedGifContainer";
    // expandedGifContainer.append(expandedImage)
    // document.getElementById("closeGif").style.display = "initial";
    // document.getElementById("downloadGif").style.display = "initial";
    // if(document.getElementById("favorites").style.display === "initial") {
    //     document.getElementById("saveGif").style.display = "none";
    //     document.getElementById("deleteGif").style.display = "initial";
    // }
    // else {
    //     document.getElementById("saveGif").style.display = "initial";
    //     document.getElementById("deleteGif").style.display = "none";
    // }
    // debugger;
    if(rootOfGifs != "myGifosContainer") {
        drawHeartBaseOnFavoriteList(currentId);//Podria pasar aqui tmb currentId
    }
    document.getElementById("right-slider-expand").addEventListener("click", moveToRightExpand);
    document.getElementById("left-slider-expand").addEventListener("click", moveToLeftExpand);
    document.getElementById("saveGif").addEventListener("click",saveGifAsFavoriteExpand)
    document.getElementById("closeGif").addEventListener("click", closeExpandSection)
    document.getElementById("downloadGif").addEventListener("click", downloadExpandedGif);
    //Aca adentro deberia crear los eventos click right y click left y tendremos acceso a de donde viene
}


/***Move to right function when the gif is expand ******/
function moveToRightExpand (e) {
    e.preventDefault();
    document.getElementById("expandedTitle").innerText = "";
    document.getElementById("expandedUser").innerText = "";
    console.log(e.target.parentNode.lastElementChild);
    let allGifs = document.querySelectorAll(".imageContainer");//Ojo que tanto los de favoritos como los de trending comparte esta clase, esto te va a traer todo
    let gifs = [];
    let gifsUrl = [];
    let gifsId = [];
    let gifsTitle = [];
    //Hay que captar de donde vino el expand
    if (!window.matchMedia("(max-width: 767px)").matches) {
        for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
            if(gif.parentNode.id === rootOfGifs) {//filtro de acuerdo a la seccion de donde vino el expand
                gifs.push(gif); //guardamos todos los gifs de esa seccion
            }
        }
        console.log(gifs);
        console.log(gifs[0].firstChild.src);
        //creo que debo almacenar todos los src de las imagenes en un array
        for(let i=0; i< gifs.length; i++) {
            gifsUrl.push(gifs[i].firstChild.src);
            gifsId.push(gifs[i].firstChild.id);
            gifsTitle.push(gifs[i].firstChild.title)
        }
        console.log(gifsUrl);
        //debo identificar en que posicion del array se encuentra el gif actualmente mostrado
        let currentPosition = searchPosition(gifsUrl, e.target.parentNode.lastElementChild.src);
        console.log(currentPosition);
        if(currentPosition === gifsUrl.length-1) {
            e.target.parentNode.lastElementChild.src = gifsUrl[0];  
            e.target.parentNode.lastElementChild.id = gifsId[0];
            e.target.parentNode.lastElementChild.title = gifsTitle[0];
            e.target.parentNode.lastElementChild.title = gifsTitle[0];
            drawHeartBaseOnFavoriteList(gifsId[0]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            // document.getElementById("expandedTitle").innerText = "";
            // document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else {
            e.target.parentNode.lastElementChild.src = gifsUrl[currentPosition+1];
            e.target.parentNode.lastElementChild.id = gifsId[currentPosition+1];
            e.target.parentNode.lastElementChild.title = gifsTitle[currentPosition+1];
            drawHeartBaseOnFavoriteList(gifsId[currentPosition+1]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            // document.getElementById("expandedTitle").innerText = "";
            // document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }
    }else {
        console.log(rootOfGifsMobile);
        for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
            if(gif.parentNode.id === rootOfGifsMobile) {//filtro de acuerdo a la seccion de donde vino el expand
                gifs.push(gif); //guardamos todos los gifs de esa seccion
            }
        }
        console.log(gifs);
        console.log(gifs[0].firstChild.src);
        //creo que debo almacenar todos los src de las imagenes en un array
        for(let i=0; i< gifs.length; i++) {
            gifsUrl.push(gifs[i].firstChild.src);
            gifsId.push(gifs[i].firstChild.id);
            gifsTitle.push(gifs[i].firstChild.title)
        }
        console.log(gifsUrl);
        //debo identificar en que posicion del array se encuentra el gif actualmente mostrado
        let currentPosition = searchPosition(gifsUrl, e.target.parentNode.lastElementChild.src);
        console.log(currentPosition);
        if(currentPosition === gifsUrl.length-1) {
            e.target.parentNode.lastElementChild.src = gifsUrl[0];  
            e.target.parentNode.lastElementChild.id = gifsId[0];
            e.target.parentNode.lastElementChild.title = gifsTitle[0];
            e.target.parentNode.lastElementChild.title = gifsTitle[0];
            drawHeartBaseOnFavoriteList(gifsId[0]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            // document.getElementById("expandedTitle").innerText = "";
            // document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else {
            e.target.parentNode.lastElementChild.src = gifsUrl[currentPosition+1];
            e.target.parentNode.lastElementChild.id = gifsId[currentPosition+1];
            e.target.parentNode.lastElementChild.title = gifsTitle[currentPosition+1];
            drawHeartBaseOnFavoriteList(gifsId[currentPosition+1]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            // document.getElementById("expandedTitle").innerText = "";
            // document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }
    }
}

function moveToLeftExpand (e) { //Esta funcion debe ser mas compleja, debemos tener un objeto que agarre titulo, user, id e imagen
    e.preventDefault();
    let allGifs = document.querySelectorAll(".imageContainer");//Ojo que tanto los de favoritos como los de trending comparte esta clase, esto te va a traer todo
    let gifs = [];
    let gifsUrl = [];
    let gifsId = [];
    let gifsTitle = [];
    //Hay que captar de donde vino el expand
    if (!window.matchMedia("(max-width: 767px)").matches) {
        for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
            if(gif.parentNode.id === rootOfGifs) {//filtro de acuerdo a la seccion, en este caso solo me interesaba trending
                gifs.push(gif); //si pertenece a trending a ese elemento lo pusheo al array
            }
        }
        console.log(gifs);
        console.log(gifs[0].nextSibling);
        console.log(gifs[0].firstChild.id);
        //creo que debo almacenar todos los src de las imagenes en un array
        for(let i=0; i< gifs.length; i++) {
            gifsUrl.push(gifs[i].firstChild.src);
            gifsId.push(gifs[i].firstChild.id);
            gifsTitle.push(gifs[i].firstChild.title)
        }
        console.log(gifsUrl);
        //debo identificar en que posicion del array se encuentra el gif actualmente mostrado
        let currentPosition = searchPosition(gifsUrl, e.target.parentNode.lastElementChild.src);
        if(currentPosition === 0) {
            e.target.parentNode.lastElementChild.src = gifsUrl[gifsUrl.length-1];  
            e.target.parentNode.lastElementChild.id = gifsId[gifsId.length-1]; 
            e.target.parentNode.lastElementChild.title = gifsTitle[gifsTitle.length-1];
            drawHeartBaseOnFavoriteList(gifsId[gifsUrl.length-1]);   
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = "";
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else {
            e.target.parentNode.lastElementChild.src = gifsUrl[currentPosition-1];
            e.target.parentNode.lastElementChild.id = gifsId[currentPosition-1];
            e.target.parentNode.lastElementChild.title = gifsTitle[currentPosition-1];
            drawHeartBaseOnFavoriteList(gifsId[currentPosition-1]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = "";
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }
    }else {
        for (let gif of allGifs ) {//Ojo todos los gif en la pagina tienen la clase imageContainer y para manipular solo trending se debe hacer este filtro
            if(gif.parentNode.id === rootOfGifsMobile) {//filtro de acuerdo a la seccion, en este caso solo me interesaba trending
                gifs.push(gif); //si pertenece a trending a ese elemento lo pusheo al array
            }
        }
        console.log(gifs);
        console.log(gifs[0].nextSibling);
        console.log(gifs[0].firstChild.id);
        //creo que debo almacenar todos los src de las imagenes en un array
        for(let i=0; i< gifs.length; i++) {
            gifsUrl.push(gifs[i].firstChild.src);
            gifsId.push(gifs[i].firstChild.id);
            gifsTitle.push(gifs[i].firstChild.title)
        }
        console.log(gifsUrl);
        //debo identificar en que posicion del array se encuentra el gif actualmente mostrado
        let currentPosition = searchPosition(gifsUrl, e.target.parentNode.lastElementChild.src);
        if(currentPosition === 0) {
            e.target.parentNode.lastElementChild.src = gifsUrl[gifsUrl.length-1];  
            e.target.parentNode.lastElementChild.id = gifsId[gifsId.length-1]; 
            e.target.parentNode.lastElementChild.title = gifsTitle[gifsTitle.length-1];
            drawHeartBaseOnFavoriteList(gifsId[gifsUrl.length-1]);   
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = "";
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else {
            e.target.parentNode.lastElementChild.src = gifsUrl[currentPosition-1];
            e.target.parentNode.lastElementChild.id = gifsId[currentPosition-1];
            e.target.parentNode.lastElementChild.title = gifsTitle[currentPosition-1];
            drawHeartBaseOnFavoriteList(gifsId[currentPosition-1]);  
            let titleAndUser = e.target.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = "";
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }
    }
}

function searchPosition(urlList, srcExpandedGif) {
    console.log(srcExpandedGif);
    for(let i= 0; i<urlList.length; i++) {
        if(srcExpandedGif === urlList[i]) {
            console.log("hubo una coincidencia");
            return i;
        }
    }
}



function saveGifAsFavoriteExpandMobile(e) {
    console.log(rootOfGifsMobile);
    if(rootOfGifsMobile !="myGifosContainer") {
        console.log(e.target.parentNode.parentNode);
        let expandSection = e.target.parentNode.parentNode;
        let idToConvert = expandSection.lastElementChild.id;
        let newId;
        console.log(idToConvert);
        console.log(typeof(idToConvert));
        if(idToConvert.includes('favSection')) {
            newId = idToConvert.substring(22, idToConvert.length);
        }
        else if(idToConvert.includes('expandedImage')) {
            newId = idToConvert.substring(13, idToConvert.length);//si viene con expandedImage que si o si necesito poner asi el id para crear un elemento nuevo lo eliminamos con esto
        } 
        else {
            newId = idToConvert;
        }
        console.log(newId);
        console.log(expandSection.lastElementChild.id);
        console.log("estas dando like con el gif expand");
        let object = JSON.parse(localStorage.getItem("favoritos"));//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchFavoriteExpand(expandSection.lastElementChild.id);//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);
        if(isOnFavoriteLocal != -1) {
            console.log("este gif ya esta en favs debo removerlo");
            let gifId = object[isOnFavoriteLocal].id; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
            if(rootOfGifsMobile === "favoriteContainer") {
                if((isOnFavoriteLocal === (object.length -1))&& (object.length>1)) {//si es el ultimo elemento, que muestro como siguiente el elemento 0 
                    nextGifIdOnLs = object[0].id;
                    let imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);
                    // drawHeartBaseOnFavoriteList(nextGifIdOnLs);
                    e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
                    e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
                    e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
                    let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
                    let ampersandPosition = findAmpersandPosition(titleAndUser);
                    document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
                    document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
                }else if (isOnFavoriteLocal === 0 && object.length ===1){//si es el primer elemento de un array de un solo elemento que muestre sin contenido
                    console.log("te quedaste sin gif en my giphos create uno guachin");
                    e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-fav-sin-contenido.svg");
                    document.getElementById("expandedUser").innerText = "";
                    document.getElementById("expandedUser").innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
                    document.getElementById("expandedTitle").innerText = "";
                    document.getElementById("expandedUser").style.gridColumn = "1/4";
                    document.getElementById("expandedUser").style.textAlign = "center";
                    document.getElementById("saveGif").style.display = "none";
                    document.getElementById("downloadGif").style.display = "none";
                    document.getElementById("left-slider-expand").style.display = "none";
                    document.getElementById("right-slider-expand").style.display = "none";
                } else if((isOnFavoriteLocal != (object.length -1))){
                    let nextGifIdOnLs = object[isOnFavoriteLocal+1].id;
                    console.log(nextGifIdOnLs);
                    // drawHeartBaseOnFavoriteList(nextGifIdOnLs);
                    let imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);;
                    // if(rootOfGifsMobile === "favoriteContainer") {
                    //     imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);
                    // }else {
                    //     imageToBeUsed = document.getElementById(nextGifIdOnLs);
                    // }
                    console.log(imageToBeUsed);
                    e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
                    e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
                    e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
                    let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
                    let ampersandPosition = findAmpersandPosition(titleAndUser);
                    document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
                    document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
                }
                object.splice(isOnFavoriteLocal, 1);//lo remuevo 
                localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
                document.getElementById("saveGif").classList.remove("saveGif");//estaba mostrando liked y ya no debería
                document.getElementById("saveGif").classList.add("heartIconExpanded");//mostramos sin like
            }else if(rootOfGifsMobile === "searchContainer" || rootOfGifsMobile === "trendingContainer") {
                object.splice(isOnFavoriteLocal, 1);//lo remuevo 
                localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
                document.getElementById("saveGif").classList.remove("heartIconExpanded");//estaba mostrando liked y ya no debería
                document.getElementById("saveGif").classList.add("saveGif");//mostramos sin like
            }
            // object.splice(isOnFavoriteLocal, 1);//lo remuevo 
            // localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
            // document.getElementById("saveGif").classList.remove("saveGif");//estaba mostrando liked y ya no debería
            // document.getElementById("saveGif").classList.add("heartIconExpanded");//mostramos sin like
            // document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
            // document.getElementById("favoriteIcon").className ="heartIcon";
            if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                unShowOneFavoriteGif(gifId);//No importa de donde venga el id siempre que se envia como parametro será sin favSection
            }
        }
        else {
                let gif = { //por aca esta el error me parece por que lo que pasa es que en el local se guardan siempre con el mismo id
                url: expandSection.lastElementChild.src,
                id: newId,
                user: "",
                title: ""
                }
                console.log(gif);
            if(!object) {
                console.log("Este gif ni ningun otro gif esta en fav debo crear un espacio en la localStorage y agregarlo");
                object = [];
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object))  
                document.getElementById("saveGif").classList.remove("saveGif");//Estaba sin like
                document.getElementById("saveGif").classList.add("heartIconExpanded");//mostramos con like
                // document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
                // document.getElementById("favoriteIcon").className ="heartIconActive";  
                if(document.getElementById("favorites").style.display === "initial"){//esta situacion creo que nunca se dará por que no se puede tener abierto al mismo tiempo favorite
                    showOneFavoriteGif(object[object.length-1].id);
                }
            }
            else {
                console.log("este gif no esta en favs debo agregarlo");
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object)) 
                document.getElementById("saveGif").classList.remove("saveGif");
                document.getElementById("saveGif").classList.add("heartIconExpanded");
                // document.getElementById("favoriteIcon").className ="heartIconActive";  
                // if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                //     showOneFavoriteGif(object[object.length-1].id);
                // }
            }
        }
    }else {
        console.log("vino de my giphos");
        console.log(e.target.parentNode.parentNode.lastElementChild);
        let gifId = e.target.parentNode.parentNode.lastElementChild.id;
        let object = JSON.parse(localStorage.getItem("misGifos"));;//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchMyGifInMyGiphos(gifId);//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);
        if((isOnFavoriteLocal === (object.length -1))&& (object.length>1)) {//si es el ultimo elemento, que muestro como siguiente el elemento 0 
            nextGifIdOnLs = object[0];
            let imageToBeUsed = document.getElementById(nextGifIdOnLs);
            e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
            e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
            e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
            let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else if (isOnFavoriteLocal === 0 && object.length ===1){//si es el primer elemento de un array de un solo elemento que muestre sin contenido
            console.log("te quedaste sin gif en my giphos create uno guachin");
            e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-mis-gifos-sin-contenido.svg");
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedUser").innerText = "¡Anímate a crear tu propio GIFO!";
            document.getElementById("expandedUser").style.gridColumn = "1/4";
            document.getElementById("expandedUser").style.textAlign = "center";
            document.getElementById("saveGif").style.display = "none";
            document.getElementById("downloadGif").style.display = "none";
            document.getElementById("left-slider-expand").style.display = "none";
            document.getElementById("right-slider-expand").style.display = "none";
        } else if((isOnFavoriteLocal != (object.length -1))){
            let nextGifIdOnLs = object[isOnFavoriteLocal+1];
            let imageToBeUsed = document.getElementById(nextGifIdOnLs);
            e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
            e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
            e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
            let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }
//         let gifIdOnLs = object[isOnFavoriteLocal]; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
//         // let offsetMyGifos = +localStorage.getItem("offsetMyGifos");
//         let nextGifIdOnLs = object[isOnFavoriteLocal+1];//con este id ya existe un elemento creado y es el de la seccion myGiphos
//         let imageToBeUsed = document.getElementById(nextGifIdOnLs);
//         console.log(imageToBeUsed);
// /** */
//         if(imageToBeUsed != null) {
//             e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
//             e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
//             e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
//             // drawHeartBaseOnFavoriteList(gifsId[0]);  
//             let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
//             let ampersandPosition = findAmpersandPosition(titleAndUser);
//             // document.getElementById("expandedTitle").innerText = "";
//             // document.getElementById("expandedUser").innerText = "";
//             document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
//             document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
//             /*** */
//             // showOneOwnGif(nextGifId);
//             // object.splice(isOnFavoriteLocal, 1);//lo remuevo 
//             // localStorage.setItem("misGifos", JSON.stringify(object))//refresco local storage
//             // // document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
//             // // document.getElementById("favoriteIcon").className ="heartIcon";
//             // unShowOneOfMyGifos(gifId);
//         }else {
//             console.log("te quedaste sin gif en my giphos create uno guachin");
//             menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");   
//             e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-mis-gifos-sin-contenido.svg");
//             document.getElementById("expandedUser").innerText = "";
//             document.getElementById("expandedUser").innerText = "¡Anímate a crear tu propio GIFO!";
//             document.getElementById("expandedUser").style.gridColumn = "1/4";
//             document.getElementById("expandedUser").style.textAlign = "center";
//             document.getElementById("saveGif").style.display = "none";
//             document.getElementById("downloadGif").style.display = "none";
//             document.getElementById("left-slider-expand").style.display = "none";
//             document.getElementById("right-slider-expand").style.display = "none";

//         }
        object.splice(isOnFavoriteLocal, 1);//lo remuevo 
        localStorage.setItem("misGifos", JSON.stringify(object))
    }
}


function saveGifAsFavoriteExpand(e) {
    console.log(rootOfGifs);
    if(rootOfGifs !="myGifosContainer") {
        console.log(e.target.parentNode.parentNode);
        let expandSection = e.target.parentNode.parentNode;
        let idToConvert = expandSection.lastElementChild.id;
        let newId;
        console.log(typeof(idToConvert));
        if(idToConvert.includes('expandedImage')) {
            newId = idToConvert.substring(13, idToConvert.length);//si viene con expandedImage que si o si necesito poner asi el id para crear un elemento nuevo lo eliminamos con esto
        } 
        else {
            newId = idToConvert;
        }
        console.log(newId);
        console.log(expandSection.lastElementChild.id);
        console.log("estas dando like con el gif expand");
        let object = JSON.parse(localStorage.getItem("favoritos"));//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchFavoriteExpand(expandSection.lastElementChild.id);//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);
        if(isOnFavoriteLocal != -1) {
            console.log("este gif ya esta en favs debo removerlo");
            let gifId = object[isOnFavoriteLocal].id; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
            if(rootOfGifs === "favoriteContainer") {
                if((isOnFavoriteLocal === (object.length -1))&& (object.length>1)) {//si es el ultimo elemento, que muestro como siguiente el elemento 0 
                    nextGifIdOnLs = object[0].id;
                    let imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);
                    // drawHeartBaseOnFavoriteList(nextGifIdOnLs);
                    e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImageNoContentDesk");
                    e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImage");
                    e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
                    e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
                    e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
                    let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
                    let ampersandPosition = findAmpersandPosition(titleAndUser);
                    document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
                    document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
                }else if (isOnFavoriteLocal === 0 && object.length ===1){//si es el primer elemento de un array de un solo elemento que muestre sin contenido
                    console.log("te quedaste sin gif en my giphos create uno guachin");
                    e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-fav-sin-contenido.svg");
                    e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImage");
                    e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImageNoContentDesk");
                    document.getElementById("expandedUser").innerText = "";
                    document.getElementById("expandedUser").innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
                    document.getElementById("expandedTitle").innerText = "";
                    document.getElementById("expandedUser").style.gridColumn = "1/4";
                    document.getElementById("expandedUser").style.textAlign = "center";
                    document.getElementById("saveGif").style.display = "none";
                    document.getElementById("downloadGif").style.display = "none";
                    document.getElementById("left-slider-expand").style.display = "none";
                    document.getElementById("right-slider-expand").style.display = "none";
                } else if((isOnFavoriteLocal != (object.length -1))){
                    let nextGifIdOnLs = object[isOnFavoriteLocal+1].id;
                    console.log(nextGifIdOnLs);
                    // drawHeartBaseOnFavoriteList(nextGifIdOnLs);
                    let imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);
                    e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImageNoContentDesk");
                    e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImage");
                    // if(rootOfGifsMobile === "favoriteContainer") {
                    //     imageToBeUsed = document.getElementById("favSection"+nextGifIdOnLs);
                    // }else {
                    //     imageToBeUsed = document.getElementById(nextGifIdOnLs);
                    // }
                    console.log(imageToBeUsed);
                    e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
                    e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
                    e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
                    let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
                    let ampersandPosition = findAmpersandPosition(titleAndUser);
                    document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
                    document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
                }
                object.splice(isOnFavoriteLocal, 1);//lo remuevo 
                localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
                document.getElementById("saveGif").classList.remove("saveGif");//estaba mostrando liked y ya no debería
                document.getElementById("saveGif").classList.add("heartIconExpanded");//mostramos sin like
            }else if(rootOfGifs === "searchContainer" || rootOfGifs === "trendingContainer") {
                object.splice(isOnFavoriteLocal, 1);//lo remuevo 
                localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
                document.getElementById("saveGif").classList.remove("heartIconExpanded");//estaba mostrando liked y ya no debería
                document.getElementById("saveGif").classList.add("saveGif");//mostramos sin like
            } 
            // object.splice(isOnFavoriteLocal, 1);//lo remuevo 
            // localStorage.setItem("favoritos", JSON.stringify(object))//refresco local storage
            // document.getElementById("saveGif").classList.remove("heartIconExpanded");//estaba mostrando liked y ya no debería
            // document.getElementById("saveGif").classList.add("saveGif");//mostramos sin like
            // document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
            // document.getElementById("favoriteIcon").className ="heartIcon";
            if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                unShowOneFavoriteGif(gifId);//No importa de donde venga el id siempre que se envia como parametro será sin favSection
            }
        }
        else {
                let gif = { //por aca esta el error me parece por que lo que pasa es que en el local se guardan siempre con el mismo id
                url: expandSection.lastElementChild.src,
                id: newId,
                user: "",
                title: ""
                }
                console.log(gif);
            if(!object) {
                console.log("Este gif ni ningun otro gif esta en fav debo crear un espacio en la localStorage y agregarlo");
                object = [];
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object))  
                document.getElementById("saveGif").classList.remove("saveGif");//Estaba sin like
                document.getElementById("saveGif").classList.add("heartIconExpanded");//mostramos con like
                // document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
                // document.getElementById("favoriteIcon").className ="heartIconActive";  
                if(document.getElementById("favorites").style.display === "initial"){//esta situacion creo que nunca se dará por que no se puede tener abierto al mismo tiempo favorite
                    showOneFavoriteGif(object[object.length-1].id);
                }
            }
            else {
                console.log("este gif no esta en favs debo agregarlo");
                object.push(gif);
                localStorage.setItem("favoritos", JSON.stringify(object)) 
                document.getElementById("saveGif").classList.remove("saveGif");
                document.getElementById("saveGif").classList.add("heartIconExpanded");
                // document.getElementById("favoriteIcon").className ="heartIconActive";  
                // if(document.getElementById("favorites").style.display === "initial"){//significa que se esta mostrando favorites
                //     showOneFavoriteGif(object[object.length-1].id);
                // }
            }
        }
    }else {
        console.log("vino de my giphos");
        console.log(e.target.parentNode.parentNode.lastElementChild);
        let gifId = e.target.parentNode.parentNode.lastElementChild.id;
        let object = JSON.parse(localStorage.getItem("misGifos"));;//tomamos todos los favoritos en local
        let isOnFavoriteLocal = searchMyGifInMyGiphos(gifId);//Aca ya tengo la posicion del elemento si es que estaba dentro de favoritos
        console.log(isOnFavoriteLocal);

        if((isOnFavoriteLocal === (object.length -1))&& (object.length>1)) {//si es el ultimo elemento, que muestro como siguiente el elemento 0 
            let nextGifIdOnLs = object[0];
            let imageToBeUsed = document.getElementById(nextGifIdOnLs);
            e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImageNoContentDesk");
            e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImage");
            e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
            e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
            e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
            let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }else if (isOnFavoriteLocal === 0 && object.length ===1){//si es el primer elemento de un array de un solo elemento que muestre sin contenido
            console.log("te quedaste sin gif en my giphos create uno guachin");
            e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-mis-gifos-sin-contenido.svg");
            e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImage");
            e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImageNoContentDesk");
            document.getElementById("expandedUser").innerText = "";
            document.getElementById("expandedUser").innerText = "¡Anímate a crear tu propio GIFO!";
            document.getElementById("expandedUser").style.gridColumn = "1/4";
            document.getElementById("expandedUser").style.textAlign = "center";
            document.getElementById("saveGif").style.display = "none";
            document.getElementById("downloadGif").style.display = "none";
            document.getElementById("left-slider-expand").style.display = "none";
            document.getElementById("right-slider-expand").style.display = "none";
        } else if((isOnFavoriteLocal != (object.length -1))){
            let nextGifIdOnLs = object[isOnFavoriteLocal+1];
            let imageToBeUsed = document.getElementById(nextGifIdOnLs);
            e.target.parentNode.parentNode.lastElementChild.classList.remove("expandedImageNoContentDesk");
            e.target.parentNode.parentNode.lastElementChild.classList.add("expandedImage");
            e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
            e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
            e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
            let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
            let ampersandPosition = findAmpersandPosition(titleAndUser);
            document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
            document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
        }

//         let gifIdOnLs = object[isOnFavoriteLocal]; //Ojo que si este es el gifId que estoy por mandar a la function unShowOneFavoriteGif debo tener en cuenta que este es comun sin favSection
//         // let offsetMyGifos = +localStorage.getItem("offsetMyGifos");
//         let nextGifIdOnLs = object[isOnFavoriteLocal+1];//con este id ya existe un elemento creado y es el de la seccion myGiphos
//         let imageToBeUsed = document.getElementById(nextGifIdOnLs);
//         console.log(imageToBeUsed);
// /** */
//         if(imageToBeUsed != null) {
//             e.target.parentNode.parentNode.lastElementChild.src = imageToBeUsed.src;  
//             e.target.parentNode.parentNode.lastElementChild.id = "expandedImage"+imageToBeUsed.id;
//             e.target.parentNode.parentNode.lastElementChild.title = imageToBeUsed.title;
//             // drawHeartBaseOnFavoriteList(gifsId[0]);  
//             let titleAndUser = e.target.parentNode.parentNode.lastElementChild.title;
//             let ampersandPosition = findAmpersandPosition(titleAndUser);
//             // document.getElementById("expandedTitle").innerText = "";
//             // document.getElementById("expandedUser").innerText = "";
//             document.getElementById("expandedTitle").innerText = extractTitle(titleAndUser, ampersandPosition);
//             document.getElementById("expandedUser").innerText = extractUser(titleAndUser, ampersandPosition);
//             /*** */
//             // showOneOwnGif(nextGifId);
//             // object.splice(isOnFavoriteLocal, 1);//lo remuevo 
//             // localStorage.setItem("misGifos", JSON.stringify(object))//refresco local storage
//             // // document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
//             // // document.getElementById("favoriteIcon").className ="heartIcon";
//             // unShowOneOfMyGifos(gifId);
//         }else {
//             console.log("te quedaste sin gif en my giphos create uno guachin");
//             menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");   
//             e.target.parentNode.parentNode.lastElementChild.setAttribute("src", "./assets/icon-mis-gifos-sin-contenido.svg");
//             document.getElementById("expandedUser").innerText = "";
//             document.getElementById("expandedUser").innerText = "¡Anímate a crear tu propio GIFO!";
//             document.getElementById("expandedUser").style.gridColumn = "1/4";
//             document.getElementById("expandedUser").style.textAlign = "center";
//             document.getElementById("saveGif").style.display = "none";
//             document.getElementById("downloadGif").style.display = "none";
//             document.getElementById("left-slider-expand").style.display = "none";
//             document.getElementById("right-slider-expand").style.display = "none";

//         }
        object.splice(isOnFavoriteLocal, 1);//lo remuevo 
        localStorage.setItem("misGifos", JSON.stringify(object))
    }
}

function closeExpandSection() {
    document.getElementById("expandGif").style.display = "none";
    console.log(rootOfGifs);
    if(document.getElementById("myGifos").style.display === "initial") {
        showMyGifos();    
    }
    if(document.getElementById("favorites").style.display === "initial") {
        showFavorite();
    }
}

function closeExpandSectionMobile() {
    document.getElementById("expandGif").style.display = "none";
    console.log("estas cerrando expand en mobile");
    console.log(rootOfGifsMobile);
    if(document.getElementById("myGifos").style.display === "initial") {
        showMyGifos();    
    }
    if(document.getElementById("favorites").style.display === "initial") {
        showFavorite();
    }
    // if(rootOfGifsMobile === "myGifosContainer") {
    //     showMyGifos();
    // }else if (rootOfGifsMobile === "favoriteContainer") {
    //     console.log("tamos entrando a refrescar los favoritos");

    //     showFavorite();
    // }
}

function searchFavoriteExpand (expandedGifId) {
    console.log(expandedGifId);
    let object = JSON.parse(localStorage.getItem("favoritos"));//tomamos el array donde tenemos todos los favoritos
    //Aca los id de los objetos no tienen la
    let gifFound = -1;
    if(object != null) {//osea si hay con que comparar
        if(expandedGifId.includes('favSection')) {//Si habría otra seccion que cambier el id por defecto del gif deberiamos tener otro filtro de este tipo
            console.log("al intentar buscar en localStorage favoritos encontramos favSection match");
            if(!expandedGifId.includes("expandedImage")) {
                for(let i=0; i<object.length; i++) {//la unica vez que pase por aquí es cuando se abra el primer expand
                    let objectIdModified = "favSection" + object[i].id;
                    if(objectIdModified === expandedGifId) {
                        gifFound = i;
                        return gifFound;
                    }
                }    
            }else {
                for(let i=0; i<object.length; i++) {//la unica vez que pase por aquí es cuando se abra el primer expand
                    let objectIdModified = "expandedImagefavSection" + object[i].id;
                    if(objectIdModified === expandedGifId) {
                        gifFound = i;
                        return gifFound;
                    }
                }
            }    
        }else if (expandedGifId.includes('expandedImage')) {
            console.log("al intentar buscar en localStorage favoritos encontramos expandedImage match");
            for(let i=0; i<object.length; i++) {//la unica vez que pase por aquí es cuando se abra el primer expand
                let objectIdModified = "expandedImage" + object[i].id;
                console.log(objectIdModified);
                if(objectIdModified === expandedGifId) {
                    console.log("encontramos match");
                    gifFound = i;
                    return gifFound;
                }
            }
        }
        else {
            console.log("al intentar buscar en localStorage favoritos encontramos que debemos trabajar con id sin agregados");
            for(let i=0; i<object.length; i++) {//este accion se ejecutara cada vez que hagamos click derecho click izquierdo
                if(object[i].id === expandedGifId) {
                    gifFound = i;
                    return gifFound;
                }
            }
        }
        return gifFound;
    }else {
        console.log("ni existe todavia favoritos en localStorage");
        return gifFound;
    }
}

/*cada vez que hago click en expand tengo que consultar si esta o no en favs
  cada vez que hago click derecha o izquierda tambien debo consultar para ver
  si ya esta en favs o no para mostrar corazon likeado o no*/
function drawHeartBaseOnFavoriteList(expandedGifId) {
    let isOnFavoriteExpand = searchFavoriteExpand(expandedGifId);
    if(isOnFavoriteExpand != -1) {//en este caso estaría dentro de favoritos y la acción a ejecutar sería borrar el gif
        console.log("estas entrando al div y este gif esta liked debes desactivar la clase heartIcon y poner fav-active");
        document.getElementById("saveGif").classList.remove("saveGif");
        document.getElementById("saveGif").classList.add("heartIconExpanded");
    }
    else {//en este caso no estaría dentro de favoritos y la acción a ejecutar sería añadir el gif
        console.log("estas entrando al div y este gif no esta liked debes activar la clase heartIcon");
        document.getElementById("saveGif").classList.remove("heartIconExpanded");
        document.getElementById("saveGif").classList.add("saveGif");
    }
}

/**Function para descargar el expanded gif *****/
function downloadExpandedGif(e) {
    console.log(e.target.parentNode.parentNode);
    let parentContainer = e.target.parentNode.parentNode;
    console.log(parentContainer.lastElementChild.src);
    fetch(parentContainer.lastElementChild.src)
    .then((response) => response.blob())
    .then((blob) => {
        const urlToDownload = window.URL.createObjectURL(new Blob([blob]));
        console.log(urlToDownload);
        //Debemos crear un elemento <a> para poder asociarle el link y ademas simularle un click
        let usefulLink = document.createElement("a");
        usefulLink.href = urlToDownload;
        usefulLink.setAttribute("download", "download.gif");
        //si no simulo el click nunca se ejecutaria
        usefulLink.click();
        
    })
}


/***Me falta traer el titulo y el usuario al expanded Gif, ojo aca que hay una superposicion de datos en favorite *****/
function findAmpersandPosition(titleAndUser) {
    let ampersandPosition = titleAndUser.indexOf("&")//Recordar que la posicion del ampersand es una antes a donde empieza el user
    return ampersandPosition;
}

function extractTitle(titleAndUser, ampersandPosition) {
    let title = titleAndUser.substring(0, ampersandPosition);
    return title;
}

function extractUser(titleAndUser, ampersandPosition) {
    let user = titleAndUser.substring(ampersandPosition+1, titleAndUser.length);
    return user;
}
/***Me falta el boton para volver a home haciendo click en el logo *****/

document.getElementById("logo").addEventListener("click", showHomePage)

function showHomePage() {
    document.getElementById("search").style.display = "initial";
    document.getElementById("trending").style.display = "initial";
    document.getElementById("favorites").style.display = "none";
    document.getElementById("myGifos").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("createYourGif").style.display = "none";
}

document.getElementById("paragraphLogo").addEventListener("click", showHomePage);

/**Modificar estilos de expand para mobile *****/
/**Me falta modificar fonde de trending para mobile que es medio gris, yo lo tengo blanco creo */
/**Me falta poner el titulo y el user en el OpenScreen de cada gif */
/**Me falta acomodar todo para mobile y ver si tengo que modificar algo del js */
/**Me falta modificar los estilos del modo captura **/
//cada vez que hago click en capture debo mostrar nuevamente su pantalla inicial 
//eso implica mostrar textsYourOwnGif
/**Hacer el repositorio, obtener el link para poder probar la pagina en mobile */


//COSAS FUNCIONALES QUE ME FALTAN PARA TERMINAR - EL RESTO ES CHARLABLE
/**Me falta dibujar misGifos ***/
/**Dice que para mobile, tenes que hacer que cuando le haces touch se abra, es sin modal ******/
/**Los titulos de trending tienen que ser clickeables y ademas todavia ni hice que aparezcan ****/
/**como se ve cuando no hay contenido en favoritos? en mobile y desktop */
/**Como se ve cuando no hay contenido en desktop en mis gifos?? */

{
    let urlTrendingTopics = "https://api.giphy.com/v1/trending/searches?" //urlTrendingTopics
    +"api_key="
    +APIKEY
    
    fetch(urlTrendingTopics)//urlTrendingTopics
      .then(res => res.json())
      .then(({ data }) => data.map(showTrendingTopics))//showTrendingTopics
      .catch(error => console.log("tuviste un problema cargando los trending topics: " + error))
    
    let trendingTopicsAmount = 0;//trendingTopicsAmount
    
    function showTrendingTopics (topic) {//showTrendingTopics - topic
        topic = transformToUpperCase(topic)//topic - transformToUpperCase
      trendingTopicsAmount++//trendingTopicsAmount
      let trendingTopic = document.createElement("A");//trendingTopic
      trendingTopic.id = topic//trendingTopic.id - topic
      trendingTopic.addEventListener("click", searchTrendingTopic);//trendingTopic - searchTrendingTopic
      trendingTopicsAmount < 8 ? trendingTopic.innerHTML = topic + " - "://trendingTopicsAmount - trendingTopic.innetHTML - topic
      trendingTopicsAmount == 8 ? trendingTopic.innerHTML = topic: null;//trendingTopicsAmount - trendingTopic.innetHTML - topic
      document.getElementById("temasTrending").appendChild(trendingTopic)//trendingTopic
    }
    
    function searchTrendingTopic() {//searchTrendingTopic
      let searchForThis = this.id;//searchForThis
      localStorage.setItem("toSearch", searchForThis)//searchForThis 
      searchFunction(searchForThis, 12);//searchForThis
      localStorage.setItem("limit", 12)
    }
}    


function transformToUpperCase(words) {//transformToUpperCase - words
    words = words.split(" ");//words - words.split
    words = words.map((word) => word[0].toUpperCase() + word.slice(1));//words - words.map
    words = words.join(" ")//words - words.join
    return words //words
  }

/**Cuando no hay elementos en favoritos se debe mostrar cierto contenido tenemos esa situacion pero aun no desarrollamos la funcion */
/**Desactivar los botones verMas cuando ya no alla nada que mostrar, es facil esto ***/
/**No me muestra animate a crear tu gifo cuando elimino el ultimo elemento en desktop del my giphos */
/**Cuando elimino un elemento de favoritos me dice que no encuentra ese id y es por que no tenemos en la posicion 12
 * si tenemos poquitos gif
 */
//notar que despues de crear un gifooo la camara queda prendidaaaa, deberia apagarla inmediatamenteee
/**Como apagar la camara ??*/

//fijarse la limpieza de elementos en favorite de mobile, probar todas las limpiezas de elementooos!!
//Plantear escenarios y largar de cero


/***Estilos que faltan - hover -cambios de color etc */
if (!window.matchMedia("(max-width: 767px)").matches) {
//HOVER DEL RIGHT AND LEFT BTN DEL EXPAND
    document.getElementById("left-slider-expand").addEventListener("mouseenter", () => {
        document.getElementById("left-slider-expand").setAttribute("src", "./assets/button-slider-left-hover.svg")
    })
    document.getElementById("left-slider-expand").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("left-slider-expand").setAttribute("src", "./assets/button-slider-left.svg")    
        }else {
            document.getElementById("left-slider-expand").setAttribute("src", "./assets/button-slider-left-md-noct.svg")
        }
    })
    document.getElementById("right-slider-expand").addEventListener("mouseenter", () => {
        document.getElementById("right-slider-expand").setAttribute("src", "./assets/Button-Slider-right-hover.svg")
    })
    document.getElementById("right-slider-expand").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("right-slider-expand").setAttribute("src", "./assets/Button-Slider-right.svg")    
        }else {
            document.getElementById("right-slider-expand").setAttribute("src", "./assets/button-slider-right-md-noct.svg")
        }
    })
    //HOVER DEL RIGHT AND LEFT BTN DEL TRENDING
    document.getElementById("left-slider").addEventListener("mouseenter", () => {
        document.getElementById("left-slider").setAttribute("src", "./assets/button-slider-left-hover.svg")
    })
    document.getElementById("left-slider").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("left-slider").setAttribute("src", "./assets/button-slider-left.svg")    
        }else {
            document.getElementById("left-slider").setAttribute("src", "./assets/button-slider-left-md-noct.svg")
        }
    })
    document.getElementById("right-slider").addEventListener("mouseenter", () => {
        document.getElementById("right-slider").setAttribute("src", "./assets/Button-Slider-right-hover.svg")
    })
    document.getElementById("right-slider").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("right-slider").setAttribute("src", "./assets/Button-Slider-right.svg")    
        }else {
            document.getElementById("right-slider").setAttribute("src", "./assets/button-slider-right-md-noct.svg")
        }
    })

    //HOVER REDES SOCIALES
    document.getElementById("fb-icon").addEventListener("mouseenter", () => {
        document.getElementById("fb-icon").setAttribute("src", "./assets/icon_facebook_hover.svg")    
    })
    document.getElementById("fb-icon").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("fb-icon").setAttribute("src", "./assets/icon_facebook.svg")    
        }else {
            document.getElementById("fb-icon").setAttribute("src", "./assets/icon_facebook_noc.svg")
        }
    })
    document.getElementById("tw-icon").addEventListener("mouseenter", () => {
        document.getElementById("tw-icon").setAttribute("src", "./assets/icon-twitter-hover.svg")
    })
    document.getElementById("tw-icon").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("tw-icon").setAttribute("src", "./assets/icon-twitter.svg")    
        }else {
            document.getElementById("tw-icon").setAttribute("src", "./assets/icon_twitter_noc.svg")
        }
    })
    document.getElementById("ig-icon").addEventListener("mouseenter", () => {
        document.getElementById("ig-icon").setAttribute("src", "./assets/icon_instagram-hover.svg")
    })
    document.getElementById("ig-icon").addEventListener("mouseleave", () => {
        if(modoNocturnoOn === "true") {
            document.getElementById("ig-icon").setAttribute("src", "./assets/icon_instagram.svg")    
        }else {
            document.getElementById("ig-icon").setAttribute("src", "./assets/icon_instagram_noc.svg")
        }
    })
}
