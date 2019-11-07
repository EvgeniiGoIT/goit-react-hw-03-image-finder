import uuidv1 from 'uuid/v1';

const propertyHelp = images =>
  images.map(
    ({
      previewURL: webformatURL,
      largeImageURL,
      likes,
      views,
      tags,
      comments,
      downloads,
    }) => ({
      id: uuidv1(),
      webformatURL,
      largeImageURL,
      likes,
      views,
      tags,
      comments,
      downloads,
    }),
  );

const DEFAULT_PATH =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=';
const API_KEY = '12932265-6a67b47d81c2d99d25931322f';
const fetchImg = (query, page) => {
  return fetch(`${DEFAULT_PATH}${API_KEY}&q=${query}&page=${page}&per_page=12`)
    .then(res => res.json())
    .then(data => data.hits);
};

export { propertyHelp, fetchImg };
