import React from 'react';
import style from './PhotoCard.module.css';
import T from 'prop-types';

const PhotoCard = ({ image, onOpenModal }) => {
  const { id, webformatURL, likes, views, tags, comments, downloads } = image;
  return (
    <div className={style.photoCard}>
      <img src={webformatURL} alt={tags} />

      <div className={style.stats}>
        <p className={style.statsItem}>
          <i className="material-icons">thumb_up</i>
          {likes}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">visibility</i>
          {views}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">comment</i>
          {comments}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">cloud_download</i>
          {downloads}
        </p>
      </div>

      <button
        type="button"
        className={style.fullscreenButton}
        onClick={() => onOpenModal(id)}
      >
        <i className="material-icons">zoom_out_map</i>
      </button>
    </div>
  );
};

PhotoCard.propTypes = {
  image: T.shape({
    id: T.string.isRequired,
    webformatURL: T.string.isRequired,
    likes: T.number.isRequired,
    views: T.number.isRequired,
    tags: T.string.isRequired,
    comments: T.number.isRequired,
    downloads: T.number.isRequired,
  }).isRequired,
  onOpenModal: T.func.isRequired,
};

export default PhotoCard;
