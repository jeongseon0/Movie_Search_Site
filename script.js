// TMDB API top rated에서 받아온 값
// 어디에 사용되는지 모르겠음,,;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjdhMjljMDFhOWQ5MDE3MDYyN2NmMGUxMzUzY2NjMSIsInN1YiI6IjY1MzBkOGE3YzQzOWMwMDBmZThiZmUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kagSnSNwG7P2CqOrCJcXDYXNgiGcftJWPoHDeeAZFk'
    }
};

// TMDB
// api를 사용하기 위해 제공되는 url중 공통적으로 쓰이는 부분
const base_url = 'https://api.themoviedb.org/3/';
// 내가 받은 api key
const api_key = '9b7a29c01a9d90170627cf0e1353ccc1';
// api를 받아오는데 쓰이는 url, base url과 api key를 합쳐 사용
const api_url = base_url + 'movie/top_rated?api_key=' + api_key + '&language=ko-KR';
// img url의 공통적인 부분 -> img_url + 각 영화 poster_path를 합쳐야 이미지가 제대로 나오는 듯
const img_url = 'https://image.tmdb.org/t/p/w500';
// 검색할 때 쓰이는 url
const search_url = base_url + 'search/movie?api_key=' + api_key + '&language=ko-KR';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const home = document.getElementById('home');

getMovies(api_url);


// api로부터 data를 받아와 showMovies 함수에 전달
function getMovies(url) {
    fetch(url, options).then(response => response.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    }).catch(err => console.error(err));
}

// 받아온 data를 movieCard로 생성
// -> 생성하는 함수를 따로 만들고, 그것을 배열에 저장 + alert을 showMovies에서 구현?

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        // 영화 정보
        let _poster_path = movie['poster_path'];
        let _title = movie['title'];
        let _vote_average = movie['vote_average'];
        let _overview = movie['overview'];
        let _id = movie['id'];
        // 시간 되면 개봉일도 넣어보기 -> 안나,,,,,,,,,

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.id = _id;
        movieEl.innerHTML = `
        <img src="${img_url + _poster_path}" alt="Image">
            <div class="movie-info">
                <h3>${_title}</h3>
                <span class="rate">${_vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${_overview}
            </div>
            `;

        main.appendChild(movieEl);
    });

    document.querySelectorAll('.movie').forEach((dom) => {
        dom.addEventListener("click", async (event) => {
            const id = event.currentTarget.getAttribute('id');

            alert(`movie id: ${id}`);
        })
    })
}

// 엔터키를 누르면 검색
form.addEventListener('submit', (e) => {
    // form에서 엔터 치면 나는 오류 방지
    e.preventDefault();

    const searchValue = search.value;

    if (searchValue) {
        getMovies(search_url + '&query=' + searchValue);
    } else {
        getMovies(api_url);
    }
});

// Movie Chart를 누르면 새로고침
home.addEventListener('click', () => {
    location.reload();
})