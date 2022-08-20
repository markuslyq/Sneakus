const token = "";

function search() {
  var sneaker = $("#sneaker").val();
  console.log(sneaker);
  if (sneaker == "") {
    alert("Please enter the sneaker you would like to find!");
  } else {
    var individualWords = sneaker.split(" ");
    console.log(individualWords);
    var searchParameters;
    var pageLimit;
    var sneakerName = [];
    var sneakerPic = [];
    var retailPrice = [];
    var releaseYear = [];
    var estimatedMarketValue = [];
    var stockXLink = [];

    for (var i = 0; i < individualWords.length; i++) {
      if (i == 0) {
        searchParameters = individualWords[i] + "%20";
      } else if (i == individualWords.length - 1) {
        searchParameters = searchParameters + individualWords[i];
      } else {
        searchParameters = searchParameters + individualWords[i] + "%20";
      }
    }
    console.log(searchParameters);
    $.ajax({
      async: true,
      crossDomain: true,
      url: "https://the-sneaker-database.p.rapidapi.com/search?limit=100&query=" + searchParameters,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2101987bc2mshcea79aef8976c85p1e0e30jsnf0fd1e45fdb9",
        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
      },
    }).done(function (data) {
      $("#nav-bar").show();
      $("#display").show();
      let pageLimit = 100;
      //   console.log("pageLimit = " + 100);
      console.log(data["results"]);
      let sneakerInfo = data["results"];
      for (var i = 0; i < pageLimit; i++) {
        sneakerName.push(sneakerInfo[i]["name"]);
        sneakerPic.push(sneakerInfo[i]["image"]["thumbnail"]);
        retailPrice.push(sneakerInfo[i]["retailPrice"]);
        releaseYear.push(sneakerInfo[i]["releaseYear"]);
        estimatedMarketValue.push(sneakerInfo[i]["estimatedMarketValue"]);
        stockXLink.push(sneakerInfo[i]["links"]["stockX"]);
        $("#tableBody").append(
          '<tr><td class="title"> <img src = "' +
            sneakerPic[i] +
            '"><a href = "' + 
            stockXLink[i] + 
            '"><div class="name">' +
            sneakerName[i] +
            '</div></a></td><td><div class="price">' +
            releaseYear[i] +
            '</div></td><td><div class="price">$' +
            retailPrice[i] +
            '</div></td><td><div class="price">$' +
            estimatedMarketValue[i] +
            "</div></td></tr>"
        );
      }
      console.log("sneakerName = " + sneakerName);
      console.log("retailPrice = " + retailPrice);
      console.log("releaseYear = " + releaseYear);
      console.log("estimatedMarketValue = " + estimatedMarketValue);
    });
  }
}
var input = document.getElementById("searchInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});
