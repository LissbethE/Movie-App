'use strict';

const form = document.querySelector('.form');
const search = document.querySelector('.search');
const main = document.querySelector('.main');

const apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=333fe14146c1b0a02e8077ebcfafd277&page=1`;
const imgPath = `https://image.tmdb.org/t/p/w1280`;
const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=333fe14146c1b0a02e8077ebcfafd277&query=""`;

// Putting movie to Dom
const showMovies = function (movie) {
  main.innerHTML = '';

  const getClassByRate = v => (v >= 8 ? 'green' : v >= 5 ? 'orange' : 'red');

  movie.forEach(e => {
    const { title, vote_average, poster_path, overview } = e;

    const html = `
      <div class="movie">
        <figure class="movie__figure">
          <img
            src="${imgPath + poster_path}"
            alt="${title}"
            class="movie__img"
          />
          <figcaption class="movie__info">
            <h1 class="movie__title">${title}</h1>
            <p class="movie__rating ${getClassByRate(
              vote_average
            )}">${vote_average}</p>
          </figcaption>
        </figure>

        <div class="movie__overview">
          <h3 class="movie__text">${title}</h3>
          <p class="movie__description">${overview}</p>
        </div>
      </div>`;

    main.insertAdjacentHTML('beforeend', html);
  });
};

// Get Initial Movies
const getMovies = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`💥Algo salio mal💥`);
    const data = await response.json();

    showMovies(data.results);
  } catch (e) {
    console.log(e.message);
  }
};
getMovies(apiURL);

// Buscar Peliculas
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(searchApi + searchTerm);
    search.value = '';
  } else {
    search.value = '';
    window.location.reload();
  }
});
