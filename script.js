//getting team filter buttons to work

//button collections
const eastButton = document.getElementById("east-but");
const atlcButton = document.getElementById("atlc-but");
const cntrlButton = document.getElementById("cntrl-but");
const SEButton = document.getElementById("se-but");
const westButton = document.getElementById("west-but");
const NWButton = document.getElementById("nw-but");
const pacButton = document.getElementById("pac-but");
const SWButton = document.getElementById("sw-but");
const allButton = document.getElementById("all-but");

//divs collection
const eastConference = document.getElementById("east-conference");
const atlcDivision = document.getElementById("atlantic");
const cntrlDivision = document.getElementById("central");
const SEDivision = document.getElementById("southeast");
const westConference = document.getElementById("west-conference");
const NWDivision = document.getElementById("northwest");
const pacDivision = document.getElementById("pacific");
const SWDivision = document.getElementById("southwest");

//button event listeners
allButton.addEventListener("click", () => {
  eastConference.style.display = "block";
  atlcDivision.style.display = "block";
  cntrlDivision.style.display = "block";
  SEDivision.style.display = "block";
  westConference.style.display = "block";
  NWDivision.style.display = "block";
  pacDivision.style.display = "block";
  SWDivision.style.display = "block";
});

eastButton.addEventListener("click", function () {
  eastConference.style.display = "block";
  atlcDivision.style.display = "block";
  cntrlDivision.style.display = "block";
  SEDivision.style.display = "block";
  westConference.style.display = "none";
});

atlcButton.addEventListener("click", function () {
  eastConference.style.display = "block";
  atlcDivision.style.display = "block";
  cntrlDivision.style.display = "none";
  SEDivision.style.display = "none";
  westConference.style.display = "none";
});

cntrlButton.addEventListener("click", function () {
  eastConference.style.display = "block";
  atlcDivision.style.display = "none";
  cntrlDivision.style.display = "block";
  SEDivision.style.display = "none";
  westConference.style.display = "none";
});

SEButton.addEventListener("click", function () {
  eastConference.style.display = "block";
  atlcDivision.style.display = "none";
  cntrlDivision.style.display = "none";
  SEDivision.style.display = "block";
  westConference.style.display = "none";
});

westButton.addEventListener("click", function () {
  westConference.style.display = "block";
  NWDivision.style.display = "block";
  pacDivision.style.display = "block";
  SWDivision.style.display = "block";
  eastConference.style.display = "none";
});

NWButton.addEventListener("click", function () {
  westConference.style.display = "block";
  NWDivision.style.display = "block";
  pacDivision.style.display = "none";
  SWDivision.style.display = "none";
  eastConference.style.display = "none";
});

pacButton.addEventListener("click", function () {
  westConference.style.display = "block";
  NWDivision.style.display = "none";
  pacDivision.style.display = "block";
  SWDivision.style.display = "none";
  eastConference.style.display = "none";
});

SWButton.addEventListener("click", function () {
  westConference.style.display = "block";
  NWDivision.style.display = "none";
  pacDivision.style.display = "none";
  SWDivision.style.display = "block";
  eastConference.style.display = "none";
});

// testing to get all images on page to test getting the right name
const images = document.querySelectorAll("img");
var teamArray = [];
console.log(images);

for (let i = 0; i < images.length; i++) {
  //console.log(images[i].src);
  images[i].addEventListener("click", function () {
    console.log("clicked");
    console.log(images[i].src);
    getEval(images[i].src);
  });
}
var teamName;
function getEval(image) {
  teamName = image
    .replaceAll("http://127.0.0.1:5500/images/", "")
    .replaceAll(".png", "")
    .replaceAll("_", " ")
    .toString();
  console.log(teamName);
  //document.getElementById("team-1").innerHTML.replace(teamName);
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "622ffbdde9msh222787b4db9c969p1d83a6jsna708611e67a3",
    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
  },
};

fetch("https://free-nba.p.rapidapi.com/teams?page=0", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .then((response) => (teamArray = response.data))
  .then(console.log(teamArray))
  .catch((err) => console.error(err));
