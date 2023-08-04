
import SlimSelect from 'slim-select';
import Swal from 'sweetalert2';
import { fetchCatBreeds, fetchCatByBreedId } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const errorElement = document.querySelector('.error');

function displayCatBreeds(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  new SlimSelect({
    select: '#single',
  });

  breedSelect.disabled = false;
  errorElement.style.display = 'none';
}

function displayCatInfo(catData) {
  const catImage = document.createElement('img');
  catImage.src = catData.imageUrl;
  catImage.alt = catData.breedName;
  catImage.classList.add('cat-image');

  const breedName = document.createElement('h2');
  breedName.textContent = catData.breedName;

  const description = document.createElement('p');
  description.textContent = catData.description;

  const temperament = document.createElement('p');
  temperament.textContent = catData.temperament;

  const modalContent = document.createElement('div');
  modalContent.appendChild(catImage);
  modalContent.appendChild(breedName);
  modalContent.appendChild(description);
  modalContent.appendChild(temperament);

  Swal.fire({
    title: 'Cat Information',
    html: modalContent.innerHTML,
    showCloseButton: true,
    showConfirmButton: false,
    animation: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreedId(selectedBreedId)
    .then(catData => {
      displayCatInfo(catData);
    })
    .catch(error => {
      console.error(error);
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);

async function initializeApp() {
  try {
    const breeds = await fetchCatBreeds();
    displayCatBreeds(breeds);
  } catch (error) {
    console.error(error);
  }
}

initializeApp();
