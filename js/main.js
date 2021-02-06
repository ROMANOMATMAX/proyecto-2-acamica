
let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";

var slider_img = document.querySelector('.slider-img');
var images = ['icon-busqueda-sin-resultado.svg', 'icon-fav-active.svg', 'ilustra_header.svg'];
var i = 0; //current image index

//variable declarada para modificar la imagen del muno hamburgesa
var menuHamburguesa = document.getElementById("menu-hamburguesa");
//variable para el buscador interno
var inputText = document.getElementById("buscador-palabra");
var buscadaOn = document.getElementById("lupa");
var posibles_sugerencias = ["gatos", "gasolina", "gamer", "perros", "pelota", "partido", "autos", "avion", "aire", "futbol"];
var lista = document.getElementById("sugerencias");
var elementosSugeridos = document.getElementsByClassName("item-sugerido");

let modoNocturnoOn = false;

///como detectar un cambio en un checkbox
var btnNocturneMode = document.getElementById("boton-menu");
btnNocturneMode.addEventListener("change", validacionCheckbox, false);

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

var botonNocturno = document.getElementById("a_modoNocturno");

botonNocturno.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if(menuHamburguesa.getAttribute("src") === "./assets/close.svg") {
        console.log("a nocturno");
        modoNocturnoOn = false;
        leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
        menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");    
        botonNocturno.textContent = "Modo Diurno";
    }
    else {
        console.log("a diurno");
        modoNocturnoOn = true;
        leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
        menuHamburguesa.setAttribute("src", "./assets/close.svg");
        botonNocturno.textContent = "Modo Nocturno";
    }
    // document.body.classList.toggle("dark");
});

//EventListener del buscador interno
inputText.addEventListener("keyup", function () {
    // console.log("Hola niños");
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
//seleccion de alguna sugerencia del buscador
lista.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.target.textContent);
    inputText.value = e.target.textContent;
}); 

//EventListener del click en la lupa
buscadaOn.addEventListener("change", function () {
    console.log("Hola niños2");
});


//function para encontrar que url del array esta actualmente dando contenido a imagen 1
let rightSlider = document.getElementById("right-slider");

function getIndexUrl(currentSrc) {
    for(let i= 0; i<copiaContent.data.length; i++) {
        if(copiaContent.data[i].images.downsized.url=== currentSrc) {    
            return i;
        }
    }
}

rightSlider.addEventListener('click', () => {
    console.log("right-slide");
    let indice = getIndexUrl(firstTrending.getAttribute("src"));
    firstTrending.setAttribute("src", copiaContent.data[indice+1].images.downsized.url);
    secondTrending.setAttribute("src", copiaContent.data[indice+2].images.downsized.url);
    thirdTrending.setAttribute("src", copiaContent.data[indice+3].images.downsized.url);
});

const firstTrending = document.getElementById("firstTrending");
const secondTrending = document.getElementById("secondTrending");
const thirdTrending = document.getElementById("thirdTrending");
let copiaContent =[];


(function() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=20`;
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
                    firstTrending.setAttribute("src", content.data[0].images.downsized.url);
                    secondTrending.setAttribute("src", content.data[1].images.downsized.url);
                    thirdTrending.setAttribute("src", content.data[2].images.downsized.url);
                    // console.log(content.data);
                    // console.log(content.meta);
                    // let fig = document.createElement('figure');
                    // let img = document.createElement('img');
                    // let fc = document.createElement('figcaption');
                    // img.src = content.data[0].images.downsized.url;
                    // img.alt = content.data[0].title;
                    // fc.textContent = content.data[0].title;
                    // fig.appendChild(img);
                    // fig.appendChild(fc);
                    // let out = document.querySelector(".out");
                    // out.insertAdjacentElement('afterbegin', fig);
                })
                .catch(err => {
                    console.log(err);
                })
}());

//Hover de la seccion trending
let slider = document.querySelector(".slider");
let thirdImage = document.getElementById("thirdTrending");
let secondImage = document.getElementById("secondTrending");
let firstImage = document.getElementById("firstTrending");
let capaOpaca = document.createElement("div");
let username = document.createElement("p");
let title = document.createElement("p");
let containerThreeBtns = document.createElement("div");

thirdImage.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[0].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    // e.target.parentNode.insertBefore(username, capaOpaca);
    title.textContent = copiaContent[0].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    // e.target.parentNode.insertBefore(title, username);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    // e.target.parentNode.insertBefore(containerThreeBtns, title);
    // },500);
        // let capaOpaca = document.createElement("div");
        // capaOpaca.className = "capaOpaca";
        // e.target.parentNode.insertBefore(capaOpaca, e.target);
    // let capaOpaca = document.createElement("div");
    // capaOpaca.className = "capaOpaca";
    // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
});

secondImage.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[1].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    // e.target.parentNode.insertBefore(username, capaOpaca);
    title.textContent = copiaContent[1].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    // e.target.parentNode.insertBefore(title, username);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    // },500);
        // let capaOpaca = document.createElement("div");
        // capaOpaca.className = "capaOpaca";
        // e.target.parentNode.insertBefore(capaOpaca, e.target);
    // let capaOpaca = document.createElement("div");
    // capaOpaca.className = "capaOpaca";
    // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
});

firstImage.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[2].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    // e.target.parentNode.insertBefore(username, capaOpaca);
    title.textContent = copiaContent[2].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    // e.target.parentNode.insertBefore(title, username);
    containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg'>
    <img src='./assets/icon-download.svg'>
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
    // },500);
        // let capaOpaca = document.createElement("div");
        // capaOpaca.className = "capaOpaca";
        // e.target.parentNode.insertBefore(capaOpaca, e.target);
    // let capaOpaca = document.createElement("div");
    // capaOpaca.className = "capaOpaca";
    // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
});

capaOpaca.addEventListener("mouseleave", (e) => {
    // e.preventDefault();
    console.log("mouseleave3");
    console.log(e.target.parentNode.getElementsByTagName('div')[0]);    
    // setTimeout(()=>{
    e.target.parentNode.removeChild(e.target.parentNode.getElementsByTagName('div')[0]);
    // }, 500);
    // console.log(e.target.parentNode);
    
});

// secondImage.addEventListener("mouseover", (e) => {
//     e.preventDefault();
//     console.log("mouseenterImg2");
//     // console.log(e.target.parentNode);
//     let capaOpaca = document.createElement("div");
//     capaOpaca.className = "capaOpaca";
//     e.target.parentNode.insertBefore(capaOpaca, e.target);
//     // let capaOpaca = document.createElement("div");
//     // capaOpaca.className = "capaOpaca";
//     // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
// });

// secondImage.addEventListener("mouseout", (e) => {
//     e.preventDefault();
//     console.log("mouseleave2");
//     // console.log(e.target.parentNode);
//     e.target.parentNode.removeChild(e.target.parentNode.firstChild);
    
// });

// secondImage.addEventListener("mouseover", (e) => {
//     console.log("mouseenterImg2");
//     // console.log(e.target.parentNode); 
//     let capaOpaca = document.createElement("div");
//     capaOpaca.className = "capaOpaca";
//     e.target.parentNode.insertBefore(capaOpaca, e.target);
//     // let capaOpaca = document.createElement("div");
//     // capaOpaca.className = "capaOpaca";
//     // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
// });

// secondImage.addEventListener("mouseout", (e) => {
//     console.log("mouseleave");
//     console.log(e.target.parentNode);
//     e.target.parentNode.removeChild(e.target.parentNode.firstChild);
    
// });

let leftSlider = document.getElementById("left-slider");
// let rightSlider = document.getElementById("right-slider");

leftSlider.addEventListener("mouseenter", (e) => {
    console.log("entrar");
    // if(e.target.getAttribute("src") === "./assets/button-slider-left.svg") {
    if(modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-left-hover.svg");
    }
    else {
        e.target.style.filter = "invert(100%)";
        e.target.style.background = "black";
    }
}); 

leftSlider.addEventListener("mouseleave", (e) => {
    console.log("sali");
    if(modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-left.svg");
    }
    else{
        e.target.style.filter = "";
        e.target.style.background = "";  
    }
}); 

rightSlider.addEventListener("mouseenter", (e) => {
    console.log("entrar");
    if(modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-right-hover.svg");
    }
    else {
        e.target.style.filter = "invert(100%)";
        e.target.style.background = "black";
    }
}); 

rightSlider.addEventListener("mouseleave", (e) => {
    console.log("sali");
    if(modoNocturnoOn === false) {
        e.target.setAttribute("src", "./assets/button-slider-right.svg");
    }
    else{
        e.target.style.filter = "";
        e.target.style.background = "";  
    }
}); 
