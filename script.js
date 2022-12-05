// testing to get all images on page to test getting the right name
const images = document.querySelectorAll("img");
var teamArray = [];
//console.log(images);
//send the team selection to the next page
const url = new URL("http://127.0.0.1:5500/eval.html#");
for (let i = 0; i < images.length; i++) {
  //console.log(images[i].src);
  images[i].addEventListener("click", function () {
    //console.log("clicked");
    //console.log(images[i].src);
    getEval(images[i].src);
    console.log(url + teamName);
    window.location.assign(url + teamName);
    // window.onload = function () {
    //   console.log(url.pathname);
    // };
    //now have a method that will update the eval page with all the team info
  });
}
var teamName;
function getEval(image) {
  teamName = image
    .replaceAll("http://127.0.0.1:5500/images/", "")
    .replaceAll(".png", "")
    .toString();
  console.log(teamName);
  return teamName;
  //document.getElementById("team-1").innerHTML.replace(teamName);
}

// Path: eval.html
function teamInfo() {
  let team = window.location.hash.replace("#", "");
  document.getElementById("eval-logo").src = `images/${team}.png`;
  team = team.replaceAll("_", " ");
  document.getElementById("team-name").innerHTML = team;
}

//search bar function
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  search();
});

function search() {
  let input = document.getElementById("search-bar").value;
  console.log(input);
  input = input.toLowerCase();
  let x = document.getElementsByTagName("img");
  let y = document.getElementsByClassName("row justify-content-center");
  for (i = 0; i < y.length; i++) {
    if (input != "") {
      y[i].style.display = "none";
    } else {
      //location.reload();
      y[i].style.display = "flex";
    }
  }
  for (i = 0; i < x.length; i++) {
    if (getEval(x[i].src).toLowerCase().includes(input)) {
      x[i].style.display = "block";
    } else {
      x[i].style.display = "none";
    }
  }
}
//end of search function

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
