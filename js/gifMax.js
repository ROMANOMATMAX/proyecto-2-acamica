
//FUNCION PARA SACAR UN PARAMETRO DE LA URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Prueba recuperando los parametros de la url
let indice = getParameterByName("indice");
console.log(indice);
let from = getParameterByName("from");
console.log(from);

//Imagen visible del DOM
let Trending1 = document.getElementById("Trending1");
let Trending2 = document.getElementById("Trending2");
let Trending3 = document.getElementById("Trending3");
let Trending4 = document.getElementById("Trending4");
let Trending5 = document.getElementById("Trending5");
let Trending6 = document.getElementById("Trending6");
let Trending7 = document.getElementById("Trending7");
let Trending8 = document.getElementById("Trending8");
let Trending9 = document.getElementById("Trending9");
let Trending10 = document.getElementById("Trending10");
let Trending11 = document.getElementById("Trending11");
let Trending12 = document.getElementById("Trending12");
let Trending13 = document.getElementById("Trending13");
let Trending14 = document.getElementById("Trending14");
let Trending15 = document.getElementById("Trending15");
let Trending16 = document.getElementById("Trending16");
let Trending17 = document.getElementById("Trending17");
let Trending18 = document.getElementById("Trending18");
let Trending19 = document.getElementById("Trending19");
let Trending20 = document.getElementById("Trending20");
let Trending21 = document.getElementById("Trending21");
let Trending22 = document.getElementById("Trending22");
let Trending23 = document.getElementById("Trending23");
let Trending24 = document.getElementById("Trending24");

//function increase the indice and return to 0
let arrayIndex =[];
// (function autoIndexComplete(indice) {
//     let i=0;
//     let indiceIncreased = indice;
//     for(let i=0; i<20; i++) {
//         if(i===0){
//             arrayIndex.push(indice);    
//         }
//         else {
//             indiceIncreased++;
//             console.log(indiceIncreased);
//             if(indiceIncreased === 20) {
//                 // arrayIndex.push(indiceIncreased); 
//                 indiceIncreased = 0;
//                 arrayIndex.push(indiceIncreased);    
//             }
//             else {
//                 arrayIndex.push(indiceIncreased);    
//             }
//         }
//     }
//     console.log(arrayIndex);
        
// }

(function() {
    let i=0;
    let indiceIncreased = parseInt(indice);
    for(let i=0; i<24; i++) {
        if(i===0){
            arrayIndex.push(indiceIncreased);    
        }
        else {
            indiceIncreased++;
            console.log(indiceIncreased);
            if(indiceIncreased === 24) {
                // arrayIndex.push(indiceIncreased); 
                indiceIncreased = 0;
                arrayIndex.push(indiceIncreased);    
            }
            else {
                arrayIndex.push(indiceIncreased);    
            }
        }
    }
    console.log(arrayIndex);
}());

if(from === "searchFunction") {
    Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[0]].url);
    Trending2.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[1]].url);
    Trending3.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[2]].url);
    Trending4.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[3]].url);
    Trending5.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[4]].url);
    Trending6.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[5]].url);
    Trending7.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[6]].url);
    Trending8.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[7]].url);
    Trending9.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[8]].url);
    Trending10.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[9]].url);
    Trending11.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[10]].url);
    Trending12.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[11]].url);
    Trending13.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[12]].url);
    Trending14.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[13]].url);
    Trending15.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[14]].url);
    Trending16.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[15]].url);
    Trending17.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[16]].url);
    Trending18.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[17]].url);
    Trending19.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[18]].url);
    Trending20.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[19]].url);
    Trending21.setAttribute("src", JSON.parse (localStorage.getItem('copiaContent1'))[arrayIndex[20]].url);
    Trending22.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[21]].url);
    Trending23.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[22]].url);
    Trending24.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[arrayIndex[23]].url);
}
else {
    console.log("entro desde otro lado");
    Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[0]].url);
    Trending2.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[1]].url);
    Trending3.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[2]].url);
    Trending4.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[3]].url);
    Trending5.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[4]].url);
    Trending6.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[5]].url);
    Trending7.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[6]].url);
    Trending8.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[7]].url);
    Trending9.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[8]].url);
    Trending10.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[9]].url);
    Trending11.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[10]].url);
    Trending12.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[11]].url);
    Trending13.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[12]].url);
    Trending14.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[13]].url);
    Trending15.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[14]].url);
    Trending16.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[15]].url);
    Trending17.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[16]].url);
    Trending18.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[17]].url);
    Trending19.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[18]].url);
    Trending20.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[19]].url);
    Trending21.setAttribute("src", JSON.parse (localStorage.getItem('copiaContent'))[arrayIndex[20]].url);
    Trending22.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[21]].url);
    Trending23.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[22]].url);
    Trending24.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[arrayIndex[23]].url);
}

//tomamos el nodo leftSlider
let leftSlider = document.getElementById("left-slider");
let rightSlider = document.getElementById("right-slider");
//establecemos la variable modoNocturnoOn
var modoNocturnoOn = localStorage.getItem("modoNocturnoOn");

leftSlider.addEventListener("mouseenter", (e) => {
    console.log("entrar");
    if(modoNocturnoOn === "false" || modoNocturnoOn ==="" ) {
        e.target.setAttribute("src", "./assets/button-slider-left-hover.svg");
    }
    else {
        e.target.style.filter = "invert(100%)";
        e.target.style.background = "black";
    }
}); 

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

(function() {
    console.log("entre a la funcion autoinvocada");
    console.log(modoNocturnoOn);
    if(modoNocturnoOn === "true") {
        document.body.classList.toggle("dark");
        leftSlider.setAttribute("src", "./assets/button-slider-left-md-noct.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right-md-noct.svg");
    }
    else {
        leftSlider.setAttribute("src", "./assets/button-slider-left.svg");
        rightSlider.setAttribute("src", "./assets/button-slider-right.svg");
    }
  }());

  //logica para el slider
  function getIndexUrl(currentSrc, copiaContent) {
    for(let i= 0; i<copiaContent.length; i++) {
        if(copiaContent[i].url=== currentSrc) {    
            return i;
        }
    }
}

  rightSlider.addEventListener('click', () => {
    console.log("right-slide");
    let indice;
    if(from === "searchFunction") {
        indice = getIndexUrl(Trending1.getAttribute("src"), JSON.parse(localStorage.getItem('copiaContent1')));    
        if(indice === 23){
            console.log("otro aqui");
            // secondTrending.setAttribute("src", copiaContent[0].url);
            // thirdTrending.setAttribute("src", copiaContent[1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[0].url);
        }
        else {
            // firstTrending.setAttribute("src", copiaContent[indice+1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[indice+1].url);
        }
    }
    else {
        console.log("logica para copiaConten cuando se expande uno del trending");
        indice = getIndexUrl(Trending1.getAttribute("src"), JSON.parse(localStorage.getItem('copiaContent')));    
        if(indice === 23){
            console.log("otro aqui");
            // secondTrending.setAttribute("src", copiaContent[0].url);
            // thirdTrending.setAttribute("src", copiaContent[1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[0].url);
        }
        else {
            // firstTrending.setAttribute("src", copiaContent[indice+1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[indice+1].url);
        }
    }
});

leftSlider.addEventListener('click', () => {
    console.log("left-slide");
    let indice;
    if(from === "searchFunction") {
        indice = getIndexUrl(Trending1.getAttribute("src"), JSON.parse(localStorage.getItem('copiaContent1')));    
        if(indice === 0){
            console.log("otro aqui");
            // secondTrending.setAttribute("src", copiaContent[0].url);
            // thirdTrending.setAttribute("src", copiaContent[1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[23].url);
        }
        else {
            // firstTrending.setAttribute("src", copiaContent[indice+1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent1'))[indice-1].url);
        }
    }
    else {
        indice = getIndexUrl(Trending1.getAttribute("src"), JSON.parse(localStorage.getItem('copiaContent')));    
        console.log("logica para copiaConten cuando se expande uno del trending");
        if(indice === 0){
            console.log("otro aqui");
            // secondTrending.setAttribute("src", copiaContent[0].url);
            // thirdTrending.setAttribute("src", copiaContent[1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[23].url);
        }
        else {
            // firstTrending.setAttribute("src", copiaContent[indice+1].url);
            Trending1.setAttribute("src", JSON.parse(localStorage.getItem('copiaContent'))[indice-1].url);
        }
    }
});