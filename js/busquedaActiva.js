// let url_string = window.location.href;
// console.log(url_string);
// let url = new URL(url_string);
// let lookingFor = url.searchParams.get("lookingFor");
// console.log(lookingFor);

// let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";



            // document.getElementById("btnSearch").addEventListener"click", ev => 
            //     ev.preventDefault();
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
let lookingFor = getParameterByName("lookingFor");
var passedModoNocturno = getParameterByName("modoNocturnoOn");
console.log("hola soy modoNocturnoOn");
console.log(passedModoNocturno);
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
let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";

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
function getIndexUrl(currentSrc, copiaContent) {
    for(let i= 0; i<copiaContent.length; i++) {
        if(copiaContent[i].url=== currentSrc) {    
            return i;
        }
    }
}

verMasBtn.addEventListener('click', () => {
    console.log("right-slide");
    let indice = getIndexUrl(imgFound1.getAttribute("src"), copiaContent1);
    console.log(indice);
    let src1 = "";
    let src2 = "";
    let src3 = "";
    let src4 = "";
    let src5 = "";
    let src6 = "";
    let src7 = "";
    let src8 = "";
    // let src9 = "";
    // let src10 = "";
    // let src11 = "";
    // let src12 = "";
    if(indice === 0){
        console.log("otro aqui");
        imgFound1.setAttribute("src", copiaContent1[20].url);
        imgFound2.setAttribute("src", copiaContent1[21].url);
        imgFound3.setAttribute("src", copiaContent1[22].url);
        imgFound4.setAttribute("src", copiaContent1[23].url);
    }
    else {
        // firstTrending.setAttribute("src", copiaContent[indice+1].url);
        console.log("entre aquiiiii");
        src1 = imgFound1.getAttribute("src");
        src2 = imgFound2.getAttribute("src");
        src3 = imgFound3.getAttribute("src");
        src4 = imgFound4.getAttribute("src");
        src5 = imgFound5.getAttribute("src");
        src6 = imgFound6.getAttribute("src");
        src7 = imgFound7.getAttribute("src");
        src8 = imgFound8.getAttribute("src");
        // src9 = imgFound9.getAttribute("src");
        // src10 = imgFound10.getAttribute("src");
        // src11 = imgFound11.getAttribute("src");
        // src12 = imgFound12.getAttribute("src");
        imgFound5.setAttribute("src", src1);
        imgFound6.setAttribute("src", src2);
        imgFound7.setAttribute("src", src3);
        imgFound8.setAttribute("src", src4);
        imgFound9.setAttribute("src", src5);
        imgFound10.setAttribute("src", src6);
        imgFound11.setAttribute("src", src7);
        imgFound12.setAttribute("src", src8);
        imgFound1.setAttribute("src", copiaContent1[indice-4].url);
        imgFound2.setAttribute("src", copiaContent1[indice-3].url);
        imgFound3.setAttribute("src", copiaContent1[indice-2].url);
        imgFound4.setAttribute("src", copiaContent1[indice-1].url);
    }
});

buscadaOn.addEventListener("change", function () {
    console.log("Hola niños2");
    window.document.location = '../busqueda-activa.html' + '?lookingFor=' + inputText.value;
});

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
       
lista.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.target.textContent);
    inputText.value = e.target.textContent;
});  


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
let rightSlider = document.getElementById("right-slider");
let leftSlider = document.getElementById("left-slider");

thirdImage.addEventListener("mouseenter", (e) => {
    // e.preventDefault();
    let indiceInterno = getIndexUrl(thirdImage.getAttribute("src"), copiaContent);
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
    let indiceInterno = getIndexUrl(secondImage.getAttribute("src"), copiaContent);
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
    let indiceInterno = getIndexUrl(firstImage.getAttribute("src"), copiaContent);
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

let modoNocturnoOn = passedModoNocturno;

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


(function() {
    console.log("entre a la funcion autoinvocada");
    console.log(passedModoNocturno);
    if(passedModoNocturno === "true") {
        console.log("el valor de passedModoNocturno era true");
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
    }
  }());



rightSlider.addEventListener('click', () => {
    console.log("right-slide");
    let indice = getIndexUrl(firstTrending.getAttribute("src"), copiaContent);
    console.log(indice);
    let firstSrc = "";
    let secondSrc = "";
    if(indice === 0){
        console.log("otro aqui");
        secondTrending.setAttribute("src", copiaContent[0].url);
        thirdTrending.setAttribute("src", copiaContent[1].url);
        firstTrending.setAttribute("src", copiaContent[19].url);
    }
    else {
        // firstTrending.setAttribute("src", copiaContent[indice+1].url);
        console.log("entre aquiiiii");
        firstSrc = firstTrending.getAttribute("src")
        secondSrc = secondTrending.getAttribute("src");
        secondTrending.setAttribute("src", firstSrc);
        thirdTrending.setAttribute("src", secondSrc);
        firstTrending.setAttribute("src", copiaContent[indice-1].url);
    }
});

leftSlider.addEventListener('click', () => {
    console.log("left-slide");
    let indice = getIndexUrl(thirdTrending.getAttribute("src"), copiaContent);
    console.log(indice);
    let firstSrc = "";
    let secondSrc = "";
    if(indice === copiaContent.length -1){
        console.log("otro aqui");
        secondTrending.setAttribute("src", copiaContent[19].url);
        thirdTrending.setAttribute("src", copiaContent[0].url);
        firstTrending.setAttribute("src", copiaContent[18].url);
    }
    else {
        // firstTrending.setAttribute("src", copiaContent[indice+1].url);
        console.log("entre aquiiiii");
        secondSrc = secondTrending.getAttribute("src");
        thirdSrc = thirdTrending.getAttribute("src");
        firstTrending.setAttribute("src", secondSrc);
        secondTrending.setAttribute("src", thirdSrc);
        thirdTrending.setAttribute("src", copiaContent[indice+1].url);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
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
    <img src='./assets/icon-max-normal.svg'>`;
    containerThreeBtns.className ="container-three-btns";
    capaOpaca.appendChild(containerThreeBtns);
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// var prodId = getParameterByName('modoNocturnoOn');
// console.log(prodId);

// var prodDe = getParameterByName('lookingFor');
// console.log(prodDe);