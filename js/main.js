
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
localStorage.setItem("modoNocturnoOn", modoNocturnoOn);

///como detectar un cambio en un checkbox
var btnNocturneMode = document.getElementById("boton-menu");
btnNocturneMode.addEventListener("change", validacionCheckbox, false);

//variables para funcionalidad agregar a favoritos
let listaFavoritos = [];
let primeraPasada = true;
// localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
// listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
let saveThirdTrendingGif;
let saveSecondTrendingGif;
let saveFirstTrendingGif;

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
        localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
        leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
        menuHamburguesa.setAttribute("src", "./assets/close-modo-noct.svg");    
        botonNocturno.textContent = "Modo Diurno";
    }
    else {
        console.log("a diurno");
        modoNocturnoOn = true;
        localStorage.setItem("modoNocturnoOn", modoNocturnoOn);
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
    window.document.location = '../busqueda-activa.html' + '?lookingFor=' + inputText.value;
});


//function para encontrar que url del array esta actualmente dando contenido a imagen 1
let rightSlider = document.getElementById("right-slider");
let leftSlider = document.getElementById("left-slider");

function getIndexUrl(currentSrc) {
    for(let i= 0; i<copiaContent.length; i++) {
        if(copiaContent[i].url=== currentSrc) {    
            return i;
        }
    }
}

rightSlider.addEventListener('click', () => {
    console.log("right-slide");
    let indice = getIndexUrl(thirdTrending.getAttribute("src"));
    console.log(indice);
    let firstSrc = "";
    let secondSrc = "";
    let thirdSrc = "";
    if(indice === 19){
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
    let indice = getIndexUrl(firstTrending.getAttribute("src"));
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
        firstTrending.setAttribute("src", copiaContent[19].url);
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

const firstTrending = document.getElementById("firstTrending");
const secondTrending = document.getElementById("secondTrending");
const thirdTrending = document.getElementById("thirdTrending");
let copiaContent =[];


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
let capaOpaca = document.createElement("div");
let username = document.createElement("p");
let title = document.createElement("p");
let containerThreeBtns = document.createElement("div");

// thirdImage.addEventListener("mouseenter", (e) => {
//     // e.preventDefault();
//     let indiceInterno = getIndexUrl(thirdImage.getAttribute("src"));
//     console.log("mouseenterImg3");
//     console.log(e.target);
//     // setTimeout(()=> {
//     capaOpaca.className = "capaOpaca";
//     e.target.parentNode.insertBefore(capaOpaca, e.target);
//     username.textContent = copiaContent[indiceInterno].username;
//     username.className = "user-name";
//     capaOpaca.appendChild(username);
//     // e.target.parentNode.insertBefore(username, capaOpaca);
//     title.textContent = copiaContent[indiceInterno].title;
//     title.className = "title";
//     capaOpaca.appendChild(title);
//     // e.target.parentNode.insertBefore(title, username);
//     let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
//     if(listaFavoritos.includes(copiaContent[indiceInterno])) {
//         containerThreeBtns.innerHTML = `<img src='./assets/icon-fav-active.svg' id='save-as-favorite'>
//         <img src='./assets/icon-download.svg'>
//         <img src='./assets/icon-max-normal.svg'>`;    
//     }
//     else {
//         containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg' id='save-as-favorite'>
//         <img src='./assets/icon-download.svg'>
//         <img src='./assets/icon-max-normal.svg'>`;
//     }
//     capaOpaca.appendChild(containerThreeBtns);
//     containerThreeBtns.className ="container-three-btns";
//     capaOpaca.appendChild(containerThreeBtns);
//     saveThirdTrendingGif = document.getElementById('save-as-favorite');
//     saveThirdTrendingGif.addEventListener("mouseenter", () => {
//         if(saveThirdTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
//             saveThirdTrendingGif.setAttribute("src", './assets/icon-fav-hover.svg');
//         }
//     })
//     saveThirdTrendingGif.addEventListener("mouseleave", () => {
//         if(saveThirdTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
//             saveThirdTrendingGif.setAttribute("src", './assets/icon-fav.svg');
//         }
//     })
//     saveThirdTrendingGif.addEventListener("click", () => {
//         if(!listaFavoritos.includes(copiaContent[indiceInterno])) {
//             saveThirdTrendingGif.setAttribute("src", './assets/icon-fav-active.svg')
//             listaFavoritos.push(copiaContent[indiceInterno]);
//             localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
//         }
//         else {
//             saveThirdTrendingGif.setAttribute("src", './assets/icon-fav.svg')
//             listaFavoritos.splice(listaFavoritos.indexOf(copiaContent[indiceInterno]), 1);
//             localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
//         }
//     });
//     // e.target.parentNode.insertBefore(containerThreeBtns, title);
//     // },500);
//         // let capaOpaca = document.createElement("div");
//         // capaOpaca.className = "capaOpaca";
//         // e.target.parentNode.insertBefore(capaOpaca, e.target);
//     // let capaOpaca = document.createElement("div");
//     // capaOpaca.className = "capaOpaca";
//     // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
// });

// secondImage.addEventListener("mouseenter", (e) => {
//     // e.preventDefault();
//     let indiceInterno = getIndexUrl(secondImage.getAttribute("src"));
//     console.log("mouseenterImg3");
//     console.log(e.target);
//     // setTimeout(()=> {
//     capaOpaca.className = "capaOpaca";
//     e.target.parentNode.insertBefore(capaOpaca, e.target);
//     username.textContent = copiaContent[indiceInterno].username;
//     username.className = "user-name";
//     capaOpaca.appendChild(username);
//     // e.target.parentNode.insertBefore(username, capaOpaca);
//     title.textContent = copiaContent[indiceInterno].title;
//     title.className = "title";
//     capaOpaca.appendChild(title);
//     // e.target.parentNode.insertBefore(title, username);
//     let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
//     if(listaFavoritos.includes(copiaContent[indiceInterno])) {
//         containerThreeBtns.innerHTML = `<img src='./assets/icon-fav-active.svg' id='save-as-favorite'>
//         <img src='./assets/icon-download.svg'>
//         <img src='./assets/icon-max-normal.svg'>`;    
//     }
//     else {
//         containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg' id='save-as-favorite'>
//         <img src='./assets/icon-download.svg'>
//         <img src='./assets/icon-max-normal.svg'>`;
//     }
//     capaOpaca.appendChild(containerThreeBtns);
//     containerThreeBtns.className ="container-three-btns";
//     capaOpaca.appendChild(containerThreeBtns);
//     saveSecondTrendingGif = document.getElementById('save-as-favorite');
//     saveSecondTrendingGif.addEventListener("mouseenter", () => {
//         if(saveSecondTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
//             saveSecondTrendingGif.setAttribute("src", './assets/icon-fav-hover.svg');
//         }
//     })
//     saveSecondTrendingGif.addEventListener("mouseleave", () => {
//         if(saveSecondTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
//             saveSecondTrendingGif.setAttribute("src", './assets/icon-fav.svg');
//         }
//     })
//     saveSecondTrendingGif.addEventListener("click", () => {
//         if(!listaFavoritos.includes(copiaContent[indiceInterno])) {
//             saveSecondTrendingGif.setAttribute("src", './assets/icon-fav-active.svg')
//             listaFavoritos.push(copiaContent[indiceInterno]);
//             localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
//         }
//         else {
//             saveSecondTrendingGif.setAttribute("src", './assets/icon-fav.svg')
//             listaFavoritos.splice(listaFavoritos.indexOf(copiaContent[indiceInterno]), 1);
//             localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
//         }
//     });
//     // },500);
//         // let capaOpaca = document.createElement("div");
//         // capaOpaca.className = "capaOpaca";
//         // e.target.parentNode.insertBefore(capaOpaca, e.target);
//     // let capaOpaca = document.createElement("div");
//     // capaOpaca.className = "capaOpaca";
//     // e.target.parentNode.insertBefore(capaOpaca, e.target);
    
// });

firstImage.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(firstImage.getAttribute("src"));
    console.log("mouseenterImg3");
    console.log(e.target);
    // setTimeout(()=> {
    capaOpaca.className = "capaOpaca";
    e.target.parentNode.insertBefore(capaOpaca, e.target);
    username.textContent = copiaContent[indiceInterno].username;
    username.className = "user-name";
    capaOpaca.appendChild(username);
    // e.target.parentNode.insertBefore(username, capaOpaca);
    title.textContent = copiaContent[indiceInterno].title;
    title.className = "title";
    capaOpaca.appendChild(title);
    // e.target.parentNode.insertBefore(title, username);
    // // let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
    // console.log(listaFavoritos);
    // console.log(copiaContent[indiceInterno]);
    // console.log(copiaContent);
    // console.log(listaFavoritos.includes(copiaContent[indiceInterno]));
    if(primeraPasada) {
        containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg' id='save-as-favorite'>
        <img src='./assets/icon-download.svg'>
        <img src='./assets/icon-max-normal.svg'>`;
        containerThreeBtns.className ="container-three-btns";
        capaOpaca.appendChild(containerThreeBtns);
        saveFirstTrendingGif = document.getElementById('save-as-favorite');
        saveFirstTrendingGif.addEventListener("mouseenter", () => {
            if(saveFirstTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
                saveFirstTrendingGif.setAttribute("src", './assets/icon-fav-hover.svg');
            }
        })
        saveFirstTrendingGif.addEventListener("mouseleave", () => {
            if(saveFirstTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
                saveFirstTrendingGif.setAttribute("src", './assets/icon-fav.svg');
            }
        })
        saveFirstTrendingGif.addEventListener("click", () => {
            console.log(primeraPasada);
            if(primeraPasada) {
                console.log("se creo el localStorage list");
                saveFirstTrendingGif.setAttribute("src", './assets/icon-fav-active.svg')
                listaFavoritos.push(copiaContent[indiceInterno]);
                localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
                primeraPasada = false;    
            }
            else {
                console.log("considera que si esta en la lista");
                saveFirstTrendingGif.setAttribute("src", './assets/icon-fav.svg')
                listaFavoritos.splice(listaFavoritos.indexOf(copiaContent[indiceInterno]), 1);
                localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
                primeraPasada = true;
            }
        });
        localStorage.setItem("primerPasada", primeraPasada);
    }
    else {
        containerThreeBtns.innerHTML = `<img src='./assets/icon-fav-active.svg' id='save-as-favorite'>
        <img src='./assets/icon-download.svg'>
        <img src='./assets/icon-max-normal.svg'>`;
        containerThreeBtns.className ="container-three-btns";
        capaOpaca.appendChild(containerThreeBtns);
        saveFirstTrendingGif = document.getElementById('save-as-favorite');
        let listafavs = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
        if(listaFavoritos.includes(copiaContent[indiceInterno])|| listafavs[0].title === copiaContent[indiceInterno].title) {
            containerThreeBtns.innerHTML = `<img src='./assets/icon-fav-active.svg' id='save-as-favorite'>
            <img src='./assets/icon-download.svg'>
            <img src='./assets/icon-max-normal.svg'>`;
            containerThreeBtns.className ="container-three-btns";
            capaOpaca.appendChild(containerThreeBtns);
        }
        else {
            
        }
    }
    // listafavs = JSON.parse(localStorage.getItem("listaFavoritosLocalStorage"));
    // console.log(listafavs[0].url);
    // console.log(copiaContent[0].url);
    // console.log(indiceInterno);
    // if(listafavs[0].title === copiaContent[0].title) {
    //     console.log("funciono al fin");
    // }
    // if(listaFavoritos.includes(copiaContent[indiceInterno])|| listafavs[0].title === copiaContent[indiceInterno].title) {
    //     containerThreeBtns.innerHTML = `<img src='./assets/icon-fav-active.svg' id='save-as-favorite'>
    //     <img src='./assets/icon-download.svg'>
    //     <img src='./assets/icon-max-normal.svg'>`;    
    // }
    // else {
    //     containerThreeBtns.innerHTML = `<img src='./assets/icon-fav.svg' id='save-as-favorite'>
    //     <img src='./assets/icon-download.svg'>
    //     <img src='./assets/icon-max-normal.svg'>`;
    // }
    // containerThreeBtns.className ="container-three-btns";
    // capaOpaca.appendChild(containerThreeBtns);
    // saveFirstTrendingGif = document.getElementById('save-as-favorite');
    // saveFirstTrendingGif.addEventListener("mouseenter", () => {
    //     if(saveFirstTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
    //         saveFirstTrendingGif.setAttribute("src", './assets/icon-fav-hover.svg');
    //     }
    // })
    // saveFirstTrendingGif.addEventListener("mouseleave", () => {
    //     if(saveFirstTrendingGif.getAttribute("src") != './assets/icon-fav-active.svg') {
    //         saveFirstTrendingGif.setAttribute("src", './assets/icon-fav.svg');
    //     }
    // })
    // saveFirstTrendingGif.addEventListener("click", () => {
    //     console.log(listaFavoritos);
    //     console.log(copiaContent[indiceInterno]);
    //     console.log(listaFavoritos.indexOf(copiaContent[indiceInterno]));
    //     if(!listaFavoritos.includes(copiaContent[indiceInterno])) {
    //         console.log("considera que no esta en la lista");
    //         saveFirstTrendingGif.setAttribute("src", './assets/icon-fav-active.svg')
    //         listaFavoritos.push(copiaContent[indiceInterno]);
    //         localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
    //     }
    //     else {
    //         console.log("considera que si esta en la lista");
    //         saveFirstTrendingGif.setAttribute("src", './assets/icon-fav.svg')
    //         listaFavoritos.splice(listaFavoritos.indexOf(copiaContent[indiceInterno]), 1);
    //         localStorage.setItem("listaFavoritosLocalStorage", JSON.stringify(listaFavoritos));
    //     }
    // });
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

// let leftSlider = document.getElementById("left-slider");
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


