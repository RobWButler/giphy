var animalList = ["Dog", "Cat", "Parrot", "Ferret", "Owl", "Otter"];
var faveList = [];

console.log(animalList)


function animateGIF(){
  var state = $(this).attr("data-state")
  var animatedImage = $(this).attr("data-animate")
  var stillImage = $(this).attr("data-still")
  console.log(state)

  if (state === "still") {
    $(this).attr("src", animatedImage)
    $(this).attr("data-state", "animate")

  }

  else {
    $(this).attr("src", stillImage)
    $(this).attr("data-state", "still")

  }
}

$("#fave-btn").on("click", function(){
  renderFaves();
})

function renderFaves(){
  faveList = JSON.parse(localStorage.getItem("fave-list"));

  for (var i = 0; i < faveList.length; i++) {
    var item = faveList[i];
          var animalDiv = $("<div>");
          animalDiv.addClass("card float-left col-md-3 mx-1 mt-1 h-25");

          var p = $("<p>");
          p.text("Rating: " + faveList[i].rating);

          var f = $("<a>");
          f.text("Remove from favorites")
          f.addClass("text-secondary")
          f.addClass("unfave")
          f.attr("src", faveList[i].src)

          var animalImage = $("<img>");

          animalImage.attr("src", faveList[i].src);
          animalImage.attr("data-still", faveList[i].datastill)
          animalImage.attr("data-animate", faveList[i].dataanimate)
          animalImage.attr("data-state", faveList[i].datastate)
          animalImage.attr("data-rating", faveList[i].rating)
          animalImage.addClass("pic img-fluid");
          animalDiv.append(animalImage);
          animalDiv.append(p);
          animalDiv.append(f);

          $("#gifs-appear-here").prepend(animalDiv);
  }

}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < animalList.length; i++) {

    var a = $("<button>");
    a.addClass("animal-btn btn btn-secondary mr-1");
    a.attr("id", animalList[i])
    a.attr("data-name", animalList[i]);
    a.text(animalList[i]);
    $("#buttons-view").append(a);
    
  }
};

$("#search").on("click", function() {
  event.preventDefault();
  var animal = $(".form-control").val();

  animalList.push(animal);

  renderButtons();

  $(".form-control").val("");


});

function addtoFavorites() {

  var fav = {
    src: $(this).attr("src"),
    datastill: $(this).attr("data-still"),
    dataanimate: $(this).attr("data-animate"),
    datastate: $(this).attr("data-still"),
    rating: $(this).attr("data-rating"),
    id: $(this).attr("id"),
  }

  faveList.push(fav)
  localStorage.setItem("fave-list", JSON.stringify(faveList));
  console.log(faveList)

}

function unFave(){
  var faveItem = $(this).attr('id');
  console.log(faveItem)

  $('#item-'+faveItem).remove();
  faveList.splice(faveItem, 1)
  localStorage.setItem("fave-list", JSON.stringify(faveList));

}


function showAnimalGIFs() {
  console.log(animalList)

  var search = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=eb89NnXfSJnzr8ROuXeBRPTmebkjJVFz&limit=10";

console.log(search);
console.log(queryURL);

  $.ajax({
        url: queryURL,
        method: "GET",

      }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

          var item = results[i];
          var animalDiv = $("<div>");
          var rate = item.rating.toUpperCase();
          animalDiv.addClass("card float-left col-md-3 mx-1 mt-1 h-25");
          animalDiv.attr("id", "item-" + i)


          var p = $("<p>");
          p.text("Rating: " + rate);

          var f = $("<a>");
          f.text("Add to favorites")
          f.addClass("text-primary")
          f.addClass("favorite")
          f.attr("src", item.images.fixed_height_still.url);
          f.attr("data-still", item.images.fixed_height_still.url)
          f.attr("data-animate", item.images.fixed_height.url)
          f.attr("data-state", "still")
          f.attr("data-rating", rate)
          f.attr("id", "item-" + i)


          var animalImage = $("<img>");

          animalImage.attr("src", item.images.fixed_height_still.url);
          animalImage.attr("data-still", item.images.fixed_height_still.url)
          animalImage.attr("data-animate", item.images.fixed_height.url)
          animalImage.attr("data-state", "still")
          animalImage.attr("data-rating", rate)
          animalImage.addClass("pic img-fluid");
          animalDiv.append(animalImage);
          animalDiv.append(p);
          animalDiv.append(f);

          $("#gifs-appear-here").prepend(animalDiv);
        }
    });
  
};

renderButtons();
$(document).on("click", ".animal-btn", showAnimalGIFs);
$(document).on("click", ".pic", animateGIF);
$(document).on("click", ".favorite", addtoFavorites);
$(document).on("click", ".unfave", unFave);


