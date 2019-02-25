$(document).ready(function() {
    var topics = [];
    
         function displayCartoons() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL =  "http://api.giphy.com/v1/gifs/search?q=ryan+gosling" + x + "&api_key=UqSVSuZR3nWGR9Mv3J8nrIOBkYAoJ5cA";
       
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var animeDiv = $("<div class='col-md-4'>");
    
              
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var animeImage = $("<img>");
                 var p = $("<p>").text();
                  
    
                 animeImage.attr("src", staticSrc);
                 animeImage.addClass("cartoonsGiphy");
                 animeImage.attr("data-state", "still");
                animeImage.attr("data-still", staticSrc);
                animeImage.attr("data-animate", defaultAnimatedSrc);
                animeDiv.append(p);
                animeDiv.append(animeImage);
                $("#gifArea").prepend(animeDiv);
    
            }
        });
    }
    
        $("#addAnime").on("click", function(event) {
            event.preventDefault();
            var newAnime = $("#cartoonsInput").val().trim();
            topics.push(newAnime);
            console.log(topics);
            $("#cartoonsInput").val('');
            displayButtons();
          });
    
      function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "anime");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      
      $(document).on("click", "#anime", displayCartoons);
    
      $(document).on("click", ".cartoonsGiphy", pausePlayGifs);
    
           function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });

    