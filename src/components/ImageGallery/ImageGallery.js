import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'react';
import css from './ImageGallery.module.css';

const ImageGallery = ({ hits, openImage }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {hits.map(({ id, webformatURL, largeImageURL }) => (
          <li key={id}>
            <ImageGalleryItem
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              handleClick={openImage}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
ImageGallery.protoType = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
