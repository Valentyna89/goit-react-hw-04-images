import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ largeImageURL, webformatURL, handleClick }) => {
  return (
    <img
      src={webformatURL}
      alt="description-info"
      className={css.ImageGalleryItemImage}
      onClick={() => handleClick(largeImageURL)}
    />
  );
};
ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  handleClick: PropTypes.func,
};
export default ImageGalleryItem;
