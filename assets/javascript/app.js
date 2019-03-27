var animalList = ["Dog", "Cat", "Parrot", "Ferret", "Owl", "Otter"];
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


function showAnimalGIFs() {
  console.log(animalList)

  var search = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=dc6zaTOxFJmzC&limit=10";

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

          var p = $("<p>");
          p.text("Rating: " + rate);

          var animalImage = $("<img>");

          animalImage.attr("src", item.images.fixed_height_still.url);
          animalImage.attr("data-still", item.images.fixed_height_still.url)
          animalImage.attr("data-animate", item.images.fixed_height.url)
          animalImage.attr("data-state", "still")
          animalImage.addClass("pic img-fluid");
          animalDiv.append(animalImage);
          animalDiv.append(p);

          $("#gifs-appear-here").prepend(animalDiv);
        }
    });
  
};

renderButtons();
$(document).on("click", ".animal-btn", showAnimalGIFs);
$(document).on("click", ".pic", animateGIF);


