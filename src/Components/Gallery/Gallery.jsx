import React from 'react';
import T from 'prop-types';
import PhotoCard from '../PhotoCard/PhotoCard';
import style from './Gallery.module.css';

const Gallery = ({ images, onOpenModal }) => (
  <ul className={style.gallery}>
    {images.map(image => (
      <li key={image.id}>
        <PhotoCard image={image} onOpenModal={onOpenModal} />
      </li>
    ))}
  </ul>
);

Gallery.propTypes = {
  images: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      webformatURL: T.string.isRequired,
      likes: T.number.isRequired,
      views: T.number.isRequired,
      tags: T.string.isRequired,
      comments: T.number.isRequired,
      downloads: T.number.isRequired,
    }).isRequired,
  ).isRequired,
  onOpenModal: T.func.isRequired,
};
export default Gallery;
