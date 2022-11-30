// testing to get all images on page to test getting the right name
const images = document.querySelectorAll('img');
console.log(images);

for (let i = 0; i < images.length; i++) {
    //console.log(images[i].src);
    images[i].addEventListener('click', function() {
        console.log('clicked');
        console.log(images[i].src);
        getEval(images[i].src);
    });
}
var teamName;
function getEval(image) {
    teamName = image.replaceAll("http://127.0.0.1:5500/images/", "").replaceAll(".png", "").replaceAll("_", " ").toString();
    console.log(teamName);
    //document.getElementById("team-1").innerHTML.replace(teamName);
}