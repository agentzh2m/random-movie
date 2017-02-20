$(document).ready(function() {
    const api_key = '90ad3bebbed7b70fdbf06381391a2de8'
    const genre_url_movie = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US'
    const genre_url_tv = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + api_key + '&language=en-US'

    init(genre_url_movie, 'movie')

    function setplatform(sel) {
        if (sel.value === 'movie') {
            init(genre_url_movie, 'movie')
        } else {
            init(genre_url_tv, 'tv')
        }
    }

    $('#sel').change(() => {
        setplatform($('#sel').val())
    })

    function init(genre_url, genre) {
        $.get(genre_url, (json) => {
            var genre_data = json.genres
            $(".select-genre").empty()
            $(".select-genre").select2({
                data: genre_data.map(x => x.name)
            });
            $(".select-rating").select2({
                minimumResultsForSearch: Infinity,
                data: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9
                ]
            })

            function parseQuery(page) {
                var main = 'https://api.themoviedb.org/3/discover/' + genre + '?api_key='
                main += api_key
                main += '&language=en-US&sort_by=popularity.desc'
                main += '&include_video=false&primary_release_data=' + $("#select-year")[0].value
                main += '&vote_average.gte=' + $(".select-rating")[0].value
                var sel_genre = $(".select-genre").select2("val").map(v => genre_data.filter(x => x.name == v)[0].id).join(",")
                main += '&with_genres=' + sel_genre
                main += '&page=' + page
                return main
            }

            var toggle = true
            $("#start-random").click(() => {
                if (toggle) {
                    toggle = false
                    var movies1 = []
                    for (i = 1; i < 10; i++) {
                        movies1.push($.get(parseQuery(i)))
                    }

                    $.when.apply($, movies1).done(function() {
                        var movies = []
                        for (var i = 0; i < arguments.length; i++) {
                            var res = arguments[i][0].results
                            for (var j = 0; j < res.length; j++) {
                                movies.push(res[j])
                            }
                        }
                        counter = 0
                        var intId = setInterval(() => {
                            var selected_movie = movies[Math.floor((Math.random() * movies.length))]
                            var base_url = 'https://image.tmdb.org/t/p/w500/'
                            $("#title span").text(selected_movie.title)
                            $("#rating span").text("Rating: " + selected_movie.vote_average)
                            $("#poster").attr("src", base_url + selected_movie.poster_path)
                            if (counter > 10) {
                                clearInterval(intId);
                                toggle = true
                            }
                            counter++
                        }, 400)
                    })

                } else {
                    console.log("not finish randoming yet")
                }
            })
        })
    }

});
