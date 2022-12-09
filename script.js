// testing to get all images on page to test getting the right name
const images = document.querySelectorAll("img");
var teamArray = [];
//console.log(images);
//send the team selection to the next page
const url = new URL("https://atrim11.github.io/343-f22-p2/eval.html#");
//const url = new URL("http://127.0.0.1:5500/eval.html#");

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function () {
    getEval(images[i].src);
    console.log(url + teamName);
    window.location.assign(url + teamName);
  });
}
var teamName;
function getEval(image) {
  teamName = image
    //.replaceAll("http://127.0.0.1:5500/images/", "")
    .replaceAll("https://atrim11.github.io/343-f22-p2/images/", "")
    .replaceAll(".png", "")
    .toString();
  console.log(teamName);
  return teamName;
}

// Path: eval.html
async function teamInfo() {
  let team = window.location.hash.replace("#", "");
  document.getElementById("eval-logo").src = `images/${team}.png`;
  team = team.replaceAll("_", " ").replaceAll("j", "J");
  if (team == "LA Clippers") {
    document.getElementById("team-name").innerHTML = "Los Angeles Clippers";
  } else {
    document.getElementById("team-name").innerHTML = team;
  }
  var city, name;
  //basketball stuff
  const allTeams = await fetch("https://www.balldontlie.io/api/v1/teams");
  const teams = await allTeams.json();
  console.log(teams);
  console.log(team);
  const teamID = teams.data.filter((mapTeam) => {
    if (JSON.stringify(mapTeam.full_name) == JSON.stringify(team)) {
      city = mapTeam.city;
      name = mapTeam.name;
      return mapTeam.id;
    }
  });
  const Games = await fetch(
    "https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=" +
      teamID[0].id +
      "&per_page=100"
  ).catch((err) => {
    //hopefully this works when the api is down
    location.reload();
    console.log(err);
  });

  const games = await Games.json();
  games.data.sort(custom_sort);
  // console.log(games);
  var table = document.getElementById("schedule");
  var count = 1;
  const schedule = games.data.map((game) => {
    var date = game.date.replaceAll("-", "/").replaceAll("T00:00:00.000Z", "");
    if (date.includes("2022")) {
      date = date.replaceAll("2022/", "") + "/2022";
    } else {
      date = date.replaceAll("2023/", "") + "/2023";
    }
    // console.log(date);
    var row = table.insertRow(count);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = date;
    if (game.home_team.full_name == team) {
      cell2.innerHTML = game.home_team.name.bold();
    } else {
      cell2.innerHTML = game.home_team.name;
    }

    if (game.visitor_team.full_name == team) {
      cell3.innerHTML = game.visitor_team.name.bold();
    } else {
      cell3.innerHTML = game.visitor_team.name;
    }
    // console.log(game.home_team.full_name);
  });
  //brew stuff here
  console.log(city);
  var brew;
  if (team == "Golden State Warriors") {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=San_Francisco&per_page=15"
    );
  } else if (team == "Utah Jazz") {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=Salt_Lake_city&per_page=15"
    );
  } else if (team == "Minnesota Timberwolves") {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=Minneapolis&per_page=15"
    );
  } else if (team == "LA Clippers") {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=Los_Angeles&per_page=15"
    );
  } else if (team == "Toronto Raptors") {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=Buffalo&per_page=15"
    );
    document.getElementById("breweries").innerHTML +=
      "<h2>Buffalo Breweries because Toronto is the only NBA team not in the US</h2>";
  } else {
    brew = await fetch(
      "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=25"
    );
  }
  const breweries = await brew.json();
  console.log(breweries);
  let interate = 0;
  if (
    team == "New York Knicks" ||
    team == "Detroit Pistons" ||
    team == "Miami Heat" ||
    team == "Portland Trail Blazers" ||
    team == "Dallas Mavericks" ||
    team == "Houston Rockets"
  ) {
    interate--;
  } else if (team == "Cleveland Cavaliers" || team == "Memphis Grizzlies") {
    interate -= 2;
  }
  breweries.map((brewery) => {
    //console.log(interate);
    //console.log(brewery.city);
    //console.log(brewery.name);
    console.log(brewery.state);
    //need to see about skipping planning and ones with broken names like in houston
    if (
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Toronto Raptors") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Utah Jazz") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Minnesota Timberwolves") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "LA Clippers") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Golden State Warriors") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Houston Rockets") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && team == "Indiana Pacers") ||
      (!brewery.brewery_type.includes("planning") && interate < 9 && brewery.city == city)
    ) {
      var num = brewery.phone;
      var phone;
      if (brewery.phone == null) {
        phone = "";
      } else {
        phone =
          "Phone Number: " + num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      var bType = brewery.brewery_type;
      var bDesc;
      if (brewery.brewery_type == "micro") {
        bDesc = "Most craft breweries";
      } else if (brewery.brewery_type == "nano") {
        bDesc =
          "An extremely small brewery which typically only distributes locally.";
      } else if (brewery.brewery_type == "regional") {
        bDesc = "A regional location of an expanded brewery";
      } else if (brewery.brewery_type == "brewpub") {
        bDesc =
          "A beer-focused restaurant or restaurant/bar with a brewery on-premise";
      } else if (brewery.brewery_type == "large") {
        bDesc = "A very large brewery. Likely not for visitors.";
      } else if (brewery.brewery_type == "planning") {
        bDesc = "A brewery in planning or not yet opened to the public.";
      } else if (brewery.brewery_type == "bar") {
        bDesc = "A bar. No brewery equipment on premise";
      } else if (brewery.brewery_type == "contract") {
        bDesc = "A brewery that uses another brewery’s equipment.";
      } else if (brewery.brewery_type == "proprietor") {
        bDesc =
          "imilar to contract brewing but refers more to a brewery incubator.";
      } else {
        bType = "";
        bDesc = "";
      }
      if (bType != null) {
        bType = "Type: " + bType;
        bDesc = "Description: " + bDesc;
      }
      var bAddress = brewery.street;
      var bCity = brewery.city;
      var bState = brewery.state;
      var bZip = brewery.postal_code;
      if (brewery.street == null) {
        bAddress = "";
        bCity = "";
        bState = "";
        bZip = "";
      } else {
        bAddress = "Address: " + brewery.street + ", ";
        bCity = brewery.city + ", ";
        bState = brewery.state + ", ";
        bZip = brewery.postal_code;
      }
      var bSite = brewery.website_url;
      if (brewery.website_url == null) {
        bSite = "N/A";
      }

      if (!brewery.name.includes("Anheuser-Busch")) {
        // brewery card
        let c;
        if (bSite == "N/A") {
          c = `<div class="col">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">${brewery.name}</h5>
          <p class="card-text">${bAddress} ${bCity} ${bState} ${bZip}</p>
          <p class="card-text">${bType} </p>
          <p class="card-text">${bDesc}</p>
          <p class="card-text">${phone}</p>
        </div>
      </div>
    </div>`;
        } else {
          c = `<div class="col">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">${brewery.name}</h5>
          <p class="card-text">${bAddress} ${bCity} ${bState} ${bZip}</p>
          <p class="card-text">${bType} </p>
          <p class="card-text">${bDesc}</p>
          <p class="card-text">${phone}</p>
          <a href="${bSite}" target="_blank" class="btn btn-primary">Visit Website</a>
        </div>
      </div>
    </div>`;
        }
        document.getElementById("breweries").innerHTML += c;
        interate++;
      }
    }
  });
}
//function to sort the dates by earliest to latest
function custom_sort(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
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
