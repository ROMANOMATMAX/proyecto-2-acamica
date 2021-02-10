
let expandImgFound1;
let expandImgFound2;
let expandImgFound3;
let expandImgFound4;
let expandImgFound5;
let expandImgFound6;
let expandImgFound7;
let expandImgFound8;
let expandImgFound9;
let expandImgFound10;
let expandImgFound11;
let expandImgFound12;
let expandImgFound13;
let expandImgFound14;
let expandImgFound15;
let expandImgFound16;
let expandImgFound17;
let expandImgFound18;
let expandImgFound19;
let expandImgFound20;
let expandImgFound21;
let expandImgFound22;
let expandImgFound23;
let expandImgFound24;
let expandFirstTrendingImg;
let copiaContent1;
let buscadaOn = document.getElementById("lupa");
let inputText = document.getElementById("buscador-palabra");
let lista = document.getElementById("sugerencias");
var menuHamburguesa = document.getElementById("menu-hamburguesa");
let elementosSugeridos = document.getElementsByClassName("item-sugerido");
let url_string = window.location.href;
let verMasBtn = document.getElementById("verMasBtn");
console.log(url_string);
let url = new URL(url_string);
let galeriaImagenes = document.querySelector('.galeria-imagenes');
let contenedorBtn = document.querySelector('.contenedor-button');
let seccionUnoAlt = document.querySelector('.seccion-1-alt');
let seccionUno = document.querySelector('.seccion-1');
//KEY PARA REALIZAR LA BUSQUEDA - PASADA COMO PARAMETRO EN LA URL
let lookingFor = getParameterByName("lookingFor");
var modoNocturnoOn = localStorage.getItem("modoNocturnoOn");
console.log("hola soy modoNocturnoOn");
// console.log(passedModoNocturno);
console.log(lookingFor);
const imgFound1 = document.getElementById("imgFound1");
const imgFound2 = document.getElementById("imgFound2");
const imgFound3 = document.getElementById("imgFound3");
const imgFound4 = document.getElementById("imgFound4");
const imgFound5 = document.getElementById("imgFound5");
const imgFound6 = document.getElementById("imgFound6");
const imgFound7 = document.getElementById("imgFound7");
const imgFound8 = document.getElementById("imgFound8");
const imgFound9 = document.getElementById("imgFound9");
const imgFound10 = document.getElementById("imgFound10");
const imgFound11 = document.getElementById("imgFound11");
const imgFound12 = document.getElementById("imgFound12");
const imgFound13 = document.getElementById("imgFound13");
const imgFound14 = document.getElementById("imgFound14");
const imgFound15 = document.getElementById("imgFound15");
const imgFound16 = document.getElementById("imgFound16");
const imgFound17 = document.getElementById("imgFound17");
const imgFound18 = document.getElementById("imgFound18");
const imgFound19 = document.getElementById("imgFound19");
const imgFound20 = document.getElementById("imgFound20");
const imgFound21 = document.getElementById("imgFound21");
const imgFound22 = document.getElementById("imgFound22");
const imgFound23 = document.getElementById("imgFound23");
const imgFound24 = document.getElementById("imgFound24");
let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";


//FUNCION ASINCRONA AUTOINVOCADA PARA REALIZAR LA BUSQUEDA DESEADA
(function() {
    let urlForApi = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=24&q=`
    urlForApi = urlForApi.concat(lookingFor);
    console.log(url);
    //Notar que fetch recibe la url
    fetch(urlForApi)
    .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
    .then(content => {
        console.log(content.data);
        console.log(content.meta);
        copiaContent1 = content.data.map(function(obj){
            let i = 0;
            console.log(obj);
            var rObj = {};
            rObj.title = obj.title;
            rObj.username = obj.username;
            rObj.url = obj.images.downsized.url
            return rObj;
            });
            localStorage.setItem('copiaContent1', JSON.stringify(copiaContent1));
            imgFound1.setAttribute("src", content.data[0].images.downsized.url);
            imgFound2.setAttribute("src", content.data[1].images.downsized.url);
            imgFound3.setAttribute("src", content.data[2].images.downsized.url);
            imgFound4.setAttribute("src", content.data[3].images.downsized.url);
            imgFound5.setAttribute("src", content.data[4].images.downsized.url);
            imgFound6.setAttribute("src", content.data[5].images.downsized.url);
            imgFound7.setAttribute("src", content.data[6].images.downsized.url);
            imgFound8.setAttribute("src", content.data[7].images.downsized.url);
            imgFound9.setAttribute("src", content.data[8].images.downsized.url);
            imgFound10.setAttribute("src", content.data[9].images.downsized.url);
            imgFound11.setAttribute("src", content.data[10].images.downsized.url);
            imgFound12.setAttribute("src", content.data[11].images.downsized.url);
            imgFound13.setAttribute("src", content.data[12].images.downsized.url);
            imgFound14.setAttribute("src", content.data[13].images.downsized.url);
            imgFound15.setAttribute("src", content.data[14].images.downsized.url);
            imgFound16.setAttribute("src", content.data[15].images.downsized.url);
            imgFound17.setAttribute("src", content.data[16].images.downsized.url);
            imgFound18.setAttribute("src", content.data[17].images.downsized.url);
            imgFound19.setAttribute("src", content.data[18].images.downsized.url);
            imgFound20.setAttribute("src", content.data[19].images.downsized.url);
            imgFound21.setAttribute("src", content.data[20].images.downsized.url);
            imgFound22.setAttribute("src", content.data[21].images.downsized.url);
            imgFound23.setAttribute("src", content.data[22].images.downsized.url);
            imgFound24.setAttribute("src", content.data[23].images.downsized.url);
    })
    .catch(err => {
        console.log(err);
        galeriaImagenes.innerHTML = '<div class="sin-resultado"><img src="./assets/icon-busqueda-sin-resultado.svg"></img><p>Intenta con otra búsqueda<p></div>';
        contenedorBtn.style.display ="none";
        seccionUnoAlt.style.marginBottom = "0";
        seccionUno.style.marginBottom = "0";
    })
}());

//FUNCION PARA ENCONTRAR DENTRO DEL ARRAY DE OBJETO EL INDICE QUE OCUPA DE ACUERDO comparando src, sirve para slider
function getIndexUrl(currentSrc, copiaContent) {
    for(let i= 0; i<copiaContent.length; i++) {
        if(copiaContent[i].url=== currentSrc) {    
            return i;
        }
    }
}

//FUNCION PARA EL BOTON VER MAS, SLIDER HACIA ABAJO - aqui usamos la funcion getIndexUrl(currentSrc, copiaContent)
verMasBtn.addEventListener('click', () => {
    console.log("presionaste ver mas");
    if(verMasBtn.textContent === "VER MÁS") {
        imgFound13.parentNode.style.display = "block";
        imgFound14.parentNode.style.display = "block";
        imgFound15.parentNode.style.display = "block";
        imgFound16.parentNode.style.display = "block";
        imgFound17.parentNode.style.display = "block";
        imgFound18.parentNode.style.display = "block";
        imgFound19.parentNode.style.display = "block";
        imgFound20.parentNode.style.display = "block";
        imgFound21.parentNode.style.display = "block";
        imgFound22.parentNode.style.display = "block";
        imgFound23.parentNode.style.display = "block";
        imgFound24.parentNode.style.display = "block";    
        verMasBtn.textContent = "VER MENOS";
    }
    else {
        imgFound13.parentNode.style.display = "none";
        imgFound14.parentNode.style.display = "none";
        imgFound15.parentNode.style.display = "none";
        imgFound16.parentNode.style.display = "none";
        imgFound17.parentNode.style.display = "none";
        imgFound18.parentNode.style.display = "none";
        imgFound19.parentNode.style.display = "none";
        imgFound20.parentNode.style.display = "none";
        imgFound21.parentNode.style.display = "none";
        imgFound22.parentNode.style.display = "none";
        imgFound23.parentNode.style.display = "none";
        imgFound24.parentNode.style.display = "none";
        verMasBtn.textContent = "VER MÁS";
    }
});

//Esta funcion nos permite que al hacer click en la lupa con la intención de realizar una nueva busqueda se recargue la pagina con la key necesaria
buscadaOn.addEventListener("change", function () {
    console.log("Hola niños2");
    window.document.location = '../busqueda-activa.html' + '?lookingFor=' + inputText.value;
});


//Esta funcion es asincrona y nos permite obtener sugerencias para la busqueda que hace el usuario
inputText.addEventListener("keyup", function () {
    console.log("Hola niños");
    var a_buscar = inputText.value;
    // console.log(a_buscar);
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&limit=5&q=${a_buscar}`;
    fetch(url)
    .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
    .then(content => {
        console.log(content);
        // console.log(content.data);
        if(lista.hasChildNodes()) {
            while(lista.childNodes.length>=1) {
                lista.removeChild(lista.firstChild);
            }
        }
        for( let i= 0; i< content.data.length; i++) {
            console.log(content.data[i].name);
            nuevoItem = document.createElement('li');
            nuevoItem.setAttribute("class", "item-sugerido");
            nuevoItem.setAttribute("id", `item${i}`);
            contenido = document.createTextNode(content.data[i].name);
            nuevoItem.appendChild(contenido);
            lista.appendChild(nuevoItem);
        }
    })
    .catch(err => {
        console.log(err);
    })
});

//Esta funcion nos permite que cada vez que se haga click sobre alguna sugerencia de la lista esta se coloque como value del inputText
lista.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.target.textContent);
    inputText.value = e.target.textContent;
});  


//Esta es una funcion asincrona que nos trae las imagenes neceserias para la seccion trending
(function() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=24`;
    fetch(url)
    .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
    .then(content => {
        console.log(content);
        console.log(content.data);
        console.log(content.data[0].title);
        console.log(content.data[0].username);
        copiaContent = content.data.map(function(obj){
            let i = 0;
            console.log(obj);
            var rObj = {};
            rObj.title = obj.title;
            rObj.username = obj.username;
            rObj.url = obj.images.downsized.url
            return rObj;
            });
        localStorage.setItem('copiaContent', JSON.stringify(copiaContent));
        firstTrending.setAttribute("src", content.data[0].images.downsized.url);
        secondTrending.setAttribute("src", content.data[1].images.downsized.url);
        thirdTrending.setAttribute("src", content.data[2].images.downsized.url);
        Image4.setAttribute("src", content.data[3].images.downsized.url)
        Image5.setAttribute("src", content.data[4].images.downsized.url)
        Image6.setAttribute("src", content.data[5].images.downsized.url)
        Image7.setAttribute("src", content.data[6].images.downsized.url)
        Image8.setAttribute("src", content.data[7].images.downsized.url)
        Image9.setAttribute("src", content.data[8].images.downsized.url)
        Image10.setAttribute("src", content.data[9].images.downsized.url)
        Image11.setAttribute("src", content.data[10].images.downsized.url)
        Image12.setAttribute("src", content.data[11].images.downsized.url)
        Image13.setAttribute("src", content.data[12].images.downsized.url)
        Image14.setAttribute("src", content.data[13].images.downsized.url)
        Image15.setAttribute("src", content.data[14].images.downsized.url)
        Image16.setAttribute("src", content.data[15].images.downsized.url)
        Image17.setAttribute("src", content.data[16].images.downsized.url)
        Image18.setAttribute("src", content.data[17].images.downsized.url)
        Image19.setAttribute("src", content.data[18].images.downsized.url)
        Image20.setAttribute("src", content.data[19].images.downsized.url)
        Image21.setAttribute("src", content.data[20].images.downsized.url)
        Image22.setAttribute("src", content.data[21].images.downsized.url)
        Image23.setAttribute("src", content.data[22].images.downsized.url)
        Image24.setAttribute("src", content.data[23].images.downsized.url)
    })
    .catch(err => {
        console.log(err);
    })
}());

//Hover de la seccion trending
let slider = document.querySelector(".slider");//selecciona todo el slider container
let thirdImage = document.getElementById("thirdTrending");//hace referencia a la tercer imagen de la seccion trending
let secondImage = document.getElementById("secondTrending");//hace referencia a la segunda imagen de la seccion trending
let firstImage = document.getElementById("firstTrending");//hace referencia a la primer imagen de la seccion trending
let Image4 = document.getElementById("Trending4");
let Image5 = document.getElementById("Trending5");
let Image6 = document.getElementById("Trending6");
let Image7 = document.getElementById("Trending7");
let Image8 = document.getElementById("Trending8");
let Image9 = document.getElementById("Trending9");
let Image10 = document.getElementById("Trending10");
let Image11 = document.getElementById("Trending11");
let Image12 = document.getElementById("Trending12");
let Image13 = document.getElementById("Trending13");
let Image14 = document.getElementById("Trending14");
let Image15 = document.getElementById("Trending15");
let Image16 = document.getElementById("Trending16");
let Image17 = document.getElementById("Trending17");
let Image18 = document.getElementById("Trending18");
let Image19 = document.getElementById("Trending19");
let Image20 = document.getElementById("Trending20");
let Image21 = document.getElementById("Trending21");
let Image22 = document.getElementById("Trending22");
let Image23 = document.getElementById("Trending23");
let Image24 = document.getElementById("Trending24");
let capaOpaca = document.createElement("div");//Es un div que se agrega dinamicamente sobre las imagenes a modo hover
let username = document.createElement("p");//Será un hijo de capaOpaca que contendra el username del GIF
let title = document.createElement("p");//Será un hijo de capaOpaca que contendra el title del GIF
let containerThreeBtns = document.createElement("div");//Es un div tmb hijo de capaOpaca que contiene tres elementos mg, download y expand
let rightSlider = document.getElementById("right-slider");//selecciona el boton derecho del slider
let leftSlider = document.getElementById("left-slider");//selecciona el boton izquierdo del slider


//Funcion que realiza el hover al posicionarse sobre un GIF de la seccion trending
thirdImage.addEventListener("mouseenter", (e) => {
    let indiceInterno = getIndexUrl(thirdImage.getAttribute("src"), copiaContent);
    console.log("mouseenterImg3");
    console.log(e.target);
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);    
});


//Funcion que realiza el hover al posicionarse sobre un GIF de la seccion trending
secondImage.addEventListener("mouseenter", (e) => {
    let indiceInterno = getIndexUrl(secondImage.getAttribute("src"), copiaContent);
    console.log("mouseenterImg3");
    console.log(e.target);
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
});

firstImage.addEventListener("mouseenter", (e) => {
    let indiceInterno = getIndexUrl(firstImage.getAttribute("src"), copiaContent);
    console.log("mouseenterImg3");
    console.log(e.target);
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id="expandFirstTrendingImg">`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandFirstTrendingImg = document.getElementById("expandFirstTrendingImg");
    expandFirstTrendingImg.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=trendingFunction');
});

//Funcion que elimina la capaOpaca cuando uno deja de posicionarse sobre un GIF
capaOpaca.addEventListener("mouseleave", (e) => {
    console.log("mouseleave3");
    console.log(e.target.parentNode.getElementsByTagName('div')[0]);    
    e.target.parentNode.removeChild(e.target.parentNode.getElementsByTagName('div')[0]);    
});

//variable que identifica en que modo esta la page, passedModoNocturno es pasado por parametro y se lo asignamos a modoNocturnoOn pa no modificar las otras funciones
// let modoNocturnoOn = passedModoNocturno;
//funcion que hace el hover al boton left del slider / en funcion de si se encuentre en modoNocturno o no (notar que a diferencia de main js modo nocturno aqui es string)
leftSlider.addEventListener("mouseenter", (e) => {
    console.log("entrar");
    if(modoNocturnoOn === "false" || modoNocturnoOn ==="" || modoNocturnoOn ===null || modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-left-hover.svg");
    }
    else {
        e.target.style.filter = "invert(100%)";
        e.target.style.background = "black";
    }
}); 

//funcion que hace el hover al boton left del slider / en funcion de si se encuentre en modoNocturno o no (notar que a diferencia de main js modo nocturno aqui es string)
leftSlider.addEventListener("mouseleave", (e) => {
    console.log("sali");
    if(modoNocturnoOn === "false" || modoNocturnoOn ==="" || modoNocturnoOn ===null || modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-left.svg");
    }
    else{
        e.target.style.filter = "";
        e.target.style.background = "";  
    }
}); 

//funcion que hace el hover al boton right del slider / en funcion de si se encuentre en modoNocturno o no (notar que a diferencia de main js modo nocturno aqui es string)
rightSlider.addEventListener("mouseenter", (e) => {
    console.log("entrar");
    if(modoNocturnoOn === "false" || modoNocturnoOn ==="" || modoNocturnoOn ===null || modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-right-hover.svg");
    }
    else {
        e.target.style.filter = "invert(100%)";
        e.target.style.background = "black";
    }
}); 

//funcion que hace el hover al boton right del slider / en funcion de si se encuentre en modoNocturno o no (notar que a diferencia de main js modo nocturno aqui es string)
rightSlider.addEventListener("mouseleave", (e) => {
    console.log("sali");
    if(modoNocturnoOn === "false" || modoNocturnoOn ==="" || modoNocturnoOn ===null  || modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-right.svg");
    }
    else{
        e.target.style.filter = "";
        e.target.style.background = "";  
    }
}); 

//Modo Nocturno
var btnNocturneMode = document.getElementById("boton-menu"); // seleccionamos el checkbox sobre la imagen del menu hamburguesa

//Escuchamos los cambios que ocurren dentro de ese checkbox dentro de esta funcion
btnNocturneMode.addEventListener("change", validacionCheckbox, false); 

//Es la funcion que se encarga de colocar la imagen del menu hamburguesa o de la cruz segun corresponda y de acuerdo al modo nocturno o diurno
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
            menuHamburguesa.setAttribute("src", "./assets/burger-modo-noct.svg");
        }
    }
}

//Selecciona el primer li de la ul del nav menu que es el que nos lleva a modo nocturno o diurno
var botonNocturno = document.getElementById("a_modoNocturno");

//funcion que al hacer click sobre el li del nav que nos lleva a los 2 modos agrega o quita la clase dark al body
//ademas tambien lo usamos para cambiar las imagenes que se usa para rightSlider y leftSlider en los 2 modos
botonNocturno.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if(menuHamburguesa.getAttribute("src") === "./assets/close.svg") {
        console.log("a nocturno");
        modoNocturnoOn = "false";
        localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
        leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
        menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");    
        botonNocturno.textContent = "Modo Diurno";
    }
    else {
        console.log("a diurno");
        modoNocturnoOn = "true";
        localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
        leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
        menuHamburguesa.setAttribute("src", "./assets/close.svg");
        botonNocturno.textContent = "Modo Nocturno";
    }
});


(function() {
    imgFound13.parentNode.style.display = "none";
    imgFound14.parentNode.style.display = "none";
    imgFound15.parentNode.style.display = "none";
    imgFound16.parentNode.style.display = "none";
    imgFound17.parentNode.style.display = "none";
    imgFound18.parentNode.style.display = "none";
    imgFound19.parentNode.style.display = "none";
    imgFound20.parentNode.style.display = "none";
    imgFound21.parentNode.style.display = "none";
    imgFound22.parentNode.style.display = "none";
    imgFound23.parentNode.style.display = "none";
    imgFound24.parentNode.style.display = "none";
    verMasBtn.textContent = "VER MÁS";
}());

(function() {
    console.log("entre a la funcion autoinvocada");
    console.log(modoNocturnoOn);
    if(modoNocturnoOn === "true") {
        console.log("el valor de passedModoNocturno era true");
        document.body.classList.toggle("dark");
        if(menuHamburguesa.getAttribute("src") === "./assets/close.svg") {
            console.log("a nocturno");
            modoNocturnoOn = "false";
            leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
            rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
            menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");    
            botonNocturno.textContent = "Modo Diurno";
        }
        else {
            console.log("a diurno");
            modoNocturnoOn = "true";
            leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
            rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
            menuHamburguesa.setAttribute("src", "./assets/close.svg");
            botonNocturno.textContent = "Modo Nocturno";
        }
    }
  }());



rightSlider.addEventListener('click', () => {
    console.log("right-slide");
    let indice = getIndexUrl(thirdTrending.getAttribute("src"), copiaContent);
    console.log(indice);
    let firstSrc = "";
    let secondSrc = "";
    let thirdSrc = "";
    if(indice === 23){
        console.log("otro aqui");
        // secondTrending.setAttribute("src", copiaContent[0].url);
        // thirdTrending.setAttribute("src", copiaContent[1].url);
        firstSrc = firstTrending.getAttribute("src")
        secondSrc = secondTrending.getAttribute("src");
        thirdSrc = thirdTrending.getAttribute("src");
        firstTrending.setAttribute("src", secondSrc);
        secondTrending.setAttribute("src", thirdSrc);
        thirdTrending.setAttribute("src", copiaContent[0].url);
    }
    else {
        // firstTrending.setAttribute("src", copiaContent[indice+1].url);
        console.log("entre aquiiiii");
        firstSrc = firstTrending.getAttribute("src")
        secondSrc = secondTrending.getAttribute("src");
        thirdSrc = thirdTrending.getAttribute("src");
        firstTrending.setAttribute("src", secondSrc);
        secondTrending.setAttribute("src", thirdSrc);
        thirdTrending.setAttribute("src", copiaContent[indice+1].url);
    }
});

leftSlider.addEventListener('click', () => {
    console.log("left-slide");
    let indice = getIndexUrl(firstTrending.getAttribute("src"), copiaContent);
    console.log(indice);
    let firstSrc = "";
    let secondSrc = "";
    let thirdSrc = "";
    if(indice === 0){
        console.log("otro aqui");
        secondSrc = secondTrending.getAttribute("src");
        thirdSrc = thirdTrending.getAttribute("src");
        firstSrc = firstTrending.getAttribute("src");
        thirdTrending.setAttribute("src", secondSrc);
        secondTrending.setAttribute("src", firstSrc);
        firstTrending.setAttribute("src", copiaContent[23].url);
    }
    else {
        // firstTrending.setAttribute("src", copiaContent[indice+1].url);
        console.log("entre aquiiiii");
        secondSrc = secondTrending.getAttribute("src");
        thirdSrc = thirdTrending.getAttribute("src");
        firstSrc = firstTrending.getAttribute("src");
        thirdTrending.setAttribute("src", secondSrc);
        secondTrending.setAttribute("src", firstSrc);
        firstTrending.setAttribute("src", copiaContent[indice-1].url);
    }
});


imgFound1.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound1.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound1'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound1 = document.getElementById("expandImgFound1");
    expandImgFound1.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound2.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound2.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound2'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound2 = document.getElementById("expandImgFound2");
    expandImgFound2.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound3.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound3.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound3'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound3 = document.getElementById("expandImgFound3");
    expandImgFound3.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound4.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound4.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound4'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound4 = document.getElementById("expandImgFound4");
    expandImgFound4.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound5.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound5.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound5'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound5 = document.getElementById("expandImgFound5");
    expandImgFound5.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound6.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound6.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound6'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound6 = document.getElementById("expandImgFound6");
    expandImgFound6.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound7.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound7.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound7'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound7 = document.getElementById("expandImgFound7");
    expandImgFound7.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound8.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound8.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound8'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound8 = document.getElementById("expandImgFound8");
    expandImgFound8.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound9.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound9.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound9'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound9 = document.getElementById("expandImgFound9");
    expandImgFound9.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound10.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound10.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound10'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound10 = document.getElementById("expandImgFound10");
    expandImgFound10.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound11.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound11.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound11'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound11 = document.getElementById("expandImgFound11");
    expandImgFound11.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound12.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound12.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound12'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound12 = document.getElementById("expandImgFound12");
    expandImgFound12.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound13.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound13.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound13'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound13 = document.getElementById("expandImgFound13");
    expandImgFound13.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound14.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound14.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound14'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound14 = document.getElementById("expandImgFound14");
    expandImgFound14.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound15.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound15.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound15'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound15 = document.getElementById("expandImgFound15");
    expandImgFound15.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound16.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound16.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound16'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound16 = document.getElementById("expandImgFound16");
    expandImgFound16.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound17.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound17.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound17'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound17 = document.getElementById("expandImgFound17");
    expandImgFound17.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});


imgFound18.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound18.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound18'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound18 = document.getElementById("expandImgFound18");
    expandImgFound18.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound19.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound19.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound19'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound19 = document.getElementById("expandImgFound19");
    expandImgFound19.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound20.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound20.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound20'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound20 = document.getElementById("expandImgFound20");
    expandImgFound20.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound21.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound21.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound21'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound21 = document.getElementById("expandImgFound21");
    expandImgFound21.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound22.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound22.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound22'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound22 = document.getElementById("expandImgFound22");
    expandImgFound22.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound23.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound23.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound23'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound23 = document.getElementById("expandImgFound23");
    expandImgFound23.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});

imgFound24.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(imgFound24.getAttribute("src"), copiaContent1);
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent1[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    title.textContent = copiaContent1[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg' id = 'expandImgFound24'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    expandImgFound24 = document.getElementById("expandImgFound24");
    expandImgFound24.addEventListener("click", ()=>window.document.location = '../gif-max.html'+ '?indice=' + indiceInterno + '&from=searchFunction');
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let palabraBuscada = document.getElementById("palabraBuscada");

palabraBuscada.textContent = lookingFor;

// let expandImgFound1 = document.getElementById("expandImgFound1")