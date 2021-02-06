let url_string = window.location.href;
console.log(url_string);
let url = new URL(url_string);
let lookingFor = url.searchParams.get("lookingFor");
console.log(lookingFor);