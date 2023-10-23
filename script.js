// TMDB API top rated
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjdhMjljMDFhOWQ5MDE3MDYyN2NmMGUxMzUzY2NjMSIsInN1YiI6IjY1MzBkOGE3YzQzOWMwMDBmZThiZmUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kagSnSNwG7P2CqOrCJcXDYXNgiGcftJWPoHDeeAZFk'
    }
};

// TMDB
const base_url = 'https://api.themoviedb.org/3/';
const api_key = '9b7a29c01a9d90170627cf0e1353ccc1';
const api_url = base_url + 'movie/top_rated?api_key=' + api_key + '&language=ko-KR';
const img_url = 'https://image.tmdb.org/t/p/w500';
const search_url = base_url + 'search/movie?api_key=' + api_key + '&language=ko-KR';

// const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(api_url);

function getMovies(url) {
    fetch(url, options).then(response => response.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    }).catch(err => console.error(err));
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        // 영화 정보
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.id = id;
        movieEl.innerHTML = `
        <img src="${img_url + poster_path}" alt="Image">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rate">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            `;

        main.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(search_url + '&query=' + searchTerm);
    } else {
        getMovies(api_url);
    }
})