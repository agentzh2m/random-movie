$(document).ready(function() {
  const api_key = '90ad3bebbed7b70fdbf06381391a2de8'
  const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US'
  $.get(genre_url, (json) => {
    const genre_data = json.genres
    $(".select-genre").select2({data: genre_data.map(x => x.name)});
    $(".select-rating").select2({
      minimumResultsForSearch: Infinity,
      data: [1,2,3,4,5,6,7,8,9]
    })

    $(".select-year").select2({
      minimumResultsForSearch: Infinity,
      data: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    })

    function parseQuery(){
      var main = 'https://api.themoviedb.org/3/discover/movie?api_key='
      main += api_key
      main += '&language=en-US&sort_by=popularity.desc'
      main += '&include_video=false&primary_release_data='+$(".select-year")[0].value
      main += '&vote_average.gte=' + $(".select-rating")[0].value
      main += '&with_genres=' + genre_data.filter(x => x.name == $(".select-genre")[0].value)[0].id
      return main
    }

    var toggle = true
    if(toggle){
      $("#start-random").click(() => {
        toggle = false
        $.get(parseQuery(), (json) => {
          const movies = json.results
          function rand_movie() {
            return movies[Math.floor((Math.random() * movies.length))]
          }
          counter = 0
          var intId = setInterval(() => {
            var selected_movie = rand_movie()
            var base_url = 'https://image.tmdb.org/t/p/w500/'
            $("#title span").text(selected_movie.title)
            $("#rating span").text(selected_movie.vote_average)
            $("#poster").attr("src", base_url + selected_movie.poster_path)
            if(counter > 10){
              clearInterval(intId);
            }
            counter++
          }, 200)
        });
      })
    }
  })

});
