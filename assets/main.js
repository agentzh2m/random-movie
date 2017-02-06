$(document).ready(function() {
  const api_key = '90ad3bebbed7b70fdbf06381391a2de8'
  const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US'
  var genre_data = $.get(genre_url, (json) => {
    $(".select-genre").select2({data: json.genres.map(x => x.name)});
  })

  $(".select-rating").select2({
    minimumResultsForSearch: Infinity,
    data: [1,2,3,4,5,6,7,8,9]
  })
});
