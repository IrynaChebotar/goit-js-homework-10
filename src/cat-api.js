
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
'live_UvmRvPcq5CNoEMbMbTzJaJnvlWGQC1r397OnZ0EsOzyNJfomdvBQju0VHjI59rTE';

export function fetchCatBreeds() {
  Notiflix.Loading.pulse('Loading data, please wait', {
    backgroundColor: 'rgba(0,0,0,0.5)',
  });

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      Notiflix.Loading.remove();
      return breeds;
    })
    .catch(error => {
      handleFetchError();
      Notiflix.Loading.remove();
      throw error;
    });
}

export function fetchCatByBreedId(breedId) {
  Notiflix.Loading.pulse('Loading data, please wait', {
    backgroundColor: 'rgba(0,0,0,0.5)',
  });

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const cat = response.data[0];
      const breed = cat.breeds[0];

      const catData = {
        imageUrl: cat.url,
        breedName: breed.name,
        description: breed.description,
        temperament: breed.temperament,
      };

      Notiflix.Loading.remove();
      return catData;
    })
    .catch(error => {
      Notiflix.Loading.remove();
      return { error: true };
    });
}

function handleFetchError() {
  const errorElement = document.querySelector('.error');
  errorElement.style.display = 'block';
  errorElement.style.color = 'red';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
