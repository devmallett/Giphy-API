

var topics = ["dog", "cat", "mouse", "fish", "monkey", "horse", "pig", "cow", "lion", "moose", "goose"];

function alertTopicName() {
    var topicName = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=dc6zaTOxFJmzC&limit=10";
    //AJAX call to recieve data from api database
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;


        function imageGen() {
            //Loops through results objects
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
               

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Declare image tag
                var personImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled from result item
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("data-state", "animate");
                personImage.addClass("gif")


                // Appending the paragraph and personImage to "gifDiv" div
                gifDiv.append(p);
                gifDiv.append(personImage);

                // Prepending the gifDiv to "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(gifDiv);

                //Click event will register but gif will not pause on click
                $(".gif").on("click", function () {
                    alert("howd");

                    var state = $(this).attr("data-state");

                    //Playing around with animate gif & still object
                    // if (state === "animate") {
                    //     $(this).attr("src", results[i].images.original_still.url);
                    //     $(this).attr("data-state", "still");


                    // } else {
                    //     $(this).attr("src", results[i].images.fixed_height.url);
                    //     $(this).attr("data-state", "animate");


                    // }
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                      } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                      }
                });

            }
        };
        imageGen();
    });
}

// Function for displaying animal data
function renderButtons() {

    // Deleting the animals prior to adding new animals
   
    $("#buttons-view").empty();

    // Looping through the array of animal topics
    for (var i = 0; i < topics.length; i++) {

        // Dynamically generating buttons for each animal topic
       
        var a = $("<button>");
        // Adding a class of animal to our button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        //Append button to HTML
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#animal-input").val().trim();

    // Adding the animal from the textbox to our array

    topics.push(topic);


    // Calling renderButtons which handles the processing of animal topic array
    renderButtons();

});

$(document).on("click", ".animal", alertTopicName);

// Calling the renderButtons function to display the intial buttons
renderButtons();
