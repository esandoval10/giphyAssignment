var topics = [
    "Son Goku","Vegeta", "Son Gohan", "Trunks",
    "Piccolo", "Son Goten", "Yamcha", "Kuririn",
    "Kame-Sennin", "Tenshinhan", "Android 18",
     "Bulma", "Pan"]

for (var i = 0; i < topics.length; i++) {

    var setChar = topics[i]; 

    var setButtons = $("<button>");

    setButtons.attr("data-character", setChar);
    setButtons.text(setChar);
    setButtons.addClass("topic btn btn-success");

    $("#spawnButtons").append(setButtons);
};

$("#addCharacter").on("click", function(event) {
    event.preventDefault();

    var addChar = $("#characterInput").val().trim();

    var charButton = $("<button>");

    charButton.attr("data-character", addChar);
    charButton.text(addChar);
    charButton.addClass("topic btn btn-success");

    $("#spawnButtons").append(charButton);

    // Clear the textbox when done
    $("#characterInput").val("");

  });

  $(document).on("click", ".topic", function () {

    $("#gifs").empty();
    
    var character = $(this).attr("data-character");

    // Constructing a queryURL using the character name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      character + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var characterDiv = $("<div>");

          var p = $("<h2>").text("Rating: " + results[i].rating);

          var charImage = $("<img>");
         
          charImage.attr("src", results[i].images.fixed_height_still.url);
          charImage.attr("data-state", "still");
          charImage.addClass("gif");
          charImage.attr("data-still", results[i].images.fixed_height_still.url);
          charImage.attr("data-animate", results[i].images.fixed_height.url);
        //   console.log(results[i].images.fixed_height.url)

          characterDiv.append(charImage);
          characterDiv.append(p);
          

          $("#gifs").prepend(characterDiv);
        }
      });
  });

$(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    // console.log("click");
    var state = $(this).attr("data-state");
    // console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});