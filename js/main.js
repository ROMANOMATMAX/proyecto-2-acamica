var slider_img = document.querySelector('.slider-img');
var images = ['icon-busqueda-sin-resultado.svg', 'icon-fav-active.svg', 'ilustra_header.svg'];
var i = 0; //current image index

function prev() {
    console.log('apreto prev');
    if( i <= 0 ) {
        i = images.length;
    }
    i--;
    return setImg();
}

function next() {
    if( i >= images.length -1 ) {
        i = -1;
    }
    i++;
    return setImg();
}

function setImg() {
    return slider_img.setAttribute('src', '../assets/'+images[i]);
}