// let url_string = window.location.href;
// console.log(url_string);
// let url = new URL(url_string);
// let lookingFor = url.searchParams.get("lookingFor");
// console.log(lookingFor);

// let APIKEY = "QyOxncNKEan7B4abTimnsBt6bl87ZloY";
        document.addEventListener("DOMContentLoaded", init);

        function init() {
            // document.getElementById("btnSearch").addEventListener"click", ev => 
            //     ev.preventDefault();
            let copiaContent;
            let buscadaOn = document.getElementById("lupa");
            let url_string = window.location.href;
            let verMasBtn = document.getElementById("verMasBtn");
            console.log(url_string);
            let url = new URL(url_string);
            let lookingFor = url.searchParams.get("lookingFor");
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
                let urlForApi = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=24&q=`
                urlForApi = urlForApi.concat(lookingFor);
                console.log(url);
                //Notar que fetch recibe la url
                fetch(urlForApi)
                .then( response => response.json()) //.json es tmb una funcion asincrona que resp con promesa
                .then(content => {
                    console.log(content.data);
                    console.log(content.meta);
                    copiaContent = content.data.map(function(obj){
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

                function getIndexUrl(currentSrc) {
                    for(let i= 0; i<copiaContent.length; i++) {
                        if(copiaContent[i].url=== currentSrc) {    
                            return i;
                        }
                    }
                }

                verMasBtn.addEventListener('click', () => {
                    console.log("right-slide");
                    let indice = getIndexUrl(imgFound1.getAttribute("src"));
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
                        imgFound1.setAttribute("src", copiaContent[20].url);
                        imgFound2.setAttribute("src", copiaContent[21].url);
                        imgFound3.setAttribute("src", copiaContent[22].url);
                        imgFound4.setAttribute("src", copiaContent[23].url);
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
                        imgFound1.setAttribute("src", copiaContent[indice-4].url);
                        imgFound2.setAttribute("src", copiaContent[indice-3].url);
                        imgFound3.setAttribute("src", copiaContent[indice-2].url);
                        imgFound4.setAttribute("src", copiaContent[indice-1].url);
                    }
                });

                buscadaOn.addEventListener("change", function () {
                    console.log("Hola niños2");
                    window.document.location = '../busqueda-activa.html' + '?lookingFor=' + inputText.value;
                });
        }