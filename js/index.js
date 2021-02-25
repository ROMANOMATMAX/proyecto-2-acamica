let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";

//Esta es una funcion asincrona que nos trae las imagenes neceserias para la seccion trending
/*******Refactorizacion Trending *****************/
(function() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=12`;
    fetch(url)
    .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
    .then(({pagination, data}) => {
        data.map(drawGifTrending)
    })
    .catch(err => {
        console.log(err);
    })
}());


/**Esta funcion dibuja uno a uno los gif en una etiqueta imagen que luego se introduce en un div y luego se meta al contenedor, ademas le da la funcionalidad del hover*/
function drawGifTrending(gif) { //map te recorre de a uno los elementos del array de objetos data
    //En teoria tenemos en html unicamente un contenedor para todos estos gif crearemos un div y dentro de ese div un img cuyo src sera un div
    let imageContainer = document.createElement("div");//A los elementos nuevos que creemos dinamicamente asignarle una clase para poder darles estilo
    imageContainer.className = "imageContainer";
    img = document.createElement("img");
    img.src = gif.images.original.url;//asignamos la url gipho como fuente de imagen
    img.title = gif.title;//el titulo del gif tmb necesita ser renderizados
    img.user = gif.user;//el usuario al cual perteneces el gif tmb necesita ser renderizados
    img.id = gif.id; //tomamos el id esto permite el acceso a cualquier imagen de forma independiente
    img.className = "small"//Dijimos que a cualquier elemento nuevo le crearemos una clase para poder darle estilo en css
    imageContainer.append(img);
    document.getElementById("trendingContainer").appendChild(imageContainer);
    //antes yo creaba el efecto hover y botones por separado para cade gif con eventos mouseenter y mouseleave pero aca puedo creerle esos eventos a todos los gif sin necesidad de tanto código
    hoverAndBtns(img);
}

function hoverAndBtns(img) {
    document.getElementById(`${img.id}`).parentNode.addEventListener("mouseenter", openScreen);
    document.getElementById(`${img.id}`).parentNode.addEventListener("mouseleave", closeScreen);
}

function openScreen() {
    //en este caso como el evento se esta colocando a la imagen .this hace referencia a ella
    currentId = this.firstChild.id; //tomo el atributo id de la imagen
    currentUrl = this.firstChild.src; //tomo el atributo src de la imagen
    currentUser = this.firstChild.user; //tomo el atributo user de la imagen
    currentTitle = this.firstChild.title; //tomo el atributo title de la imagen
    this.style.background = "rgba(87, 46, 229, 0.5)"; //Al div contenedor le aplico un background
    this.firstChild.style.opacity = "0.3"; //a la imagen le doy un opacity de 0.3 para que sea vea el background del contenedor

    /****Instrucciones necesarias para la funcion download*******/
    let download = document.createElement("a");
    download.setAttribute("href", "javascript:void(0)");//significa que por mas que es un link al asignarle undefined a hreg no va a ningun lado
    download.className ="downloadIcon";//es un elemento y le damos una clase para poder darle estilo en css
    download.addEventListener("click", downloadGif)//todas las variables declaradas antes tienen acceso aquí 
    this.append(download);

    /****instrucción necessary for favorite action *******/
    let favorite;
    if(document.getElementById("favorites").style.display === "initial"){//esta situacion solo ocurre cuando hacemos click en linlFavorite
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
}

function closeScreen() {
    this.style.background = "none";
    this.firstChild.style.opacity = "1";
    const iconsToDelete = this.getElementsByTagName("a");
    let iterationNum1 = iconsToDelete.length;
    for(let i= 0; i<iterationNum1; i++) {
        this.removeChild(iconsToDelete[0]) ;
    }
    // const textsToDelete = this.getElementsByTagName("p");
    // let iterationNum2 = textsToDelete.length;
    // for(let i= 0; i<iterationNum2; i++) {
    //     this.removeChild(textsToDelete[0]) ;
    // }
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

function saveGifAsFavorite() {
    let object = JSON.parse(localStorage.getItem("favoritos"));;//tomamos todos los favoritos en local
    let isOnFavoriteLocal = searchFavorite();
    console.log(isOnFavoriteLocal);
    if(isOnFavoriteLocal != -1) {
        console.log("este gif ya esta en favs debo removerlo");
        object.splice(isOnFavoriteLocal, 1);
        localStorage.setItem("favoritos", JSON.stringify(object))   
        document.getElementById("favoriteIcon").classList.toggle ="heartIconActive";
        document.getElementById("favoriteIcon").className ="heartIcon";
    }
    else {
            let gif = {
            url: currentUrl,
            id: currentId,
            user: currentUser,
            title: currentTitle
        }
        if(!object) {
            console.log("Este gif ni ningun otro gif esta en fav debo crear un espacio en la localStorage y agregarlo");
            object = [];
            object.push(gif);
            localStorage.setItem("favoritos", JSON.stringify(object))  
            document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
            document.getElementById("favoriteIcon").className ="heartIconActive";  
        }
        else {
            console.log("este gif no esta en favs debo agregarlo");
            object.push(gif);
            localStorage.setItem("favoritos", JSON.stringify(object)) 
            document.getElementById("favoriteIcon").classList.toggle ="heartIcon";
            document.getElementById("favoriteIcon").className ="heartIconActive";  
        }
    }
}

function searchFavorite () {
    let object = JSON.parse(localStorage.getItem("favoritos"));//tomamos el array donde tenemos todos los favoritos
    let gifFound = -1;
    if(object != null){//Si hay con que comparar ejecutamos el if
        for(let i=0; i<object.length; i++) {
            if(object[i].id === currentId) {
                gifFound = i;
            }
        }  
    }
    return gifFound;
}
