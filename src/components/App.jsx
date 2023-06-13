import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from '../services/api';
import Modal from './Modal';
import Button from './Button';
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState('');
  const [showModal, setShowModal] = useState(false);
  const perPage = 12;

  useEffect(() => {
    if (searchQuery !== '') {
      setLoading(true);

      getImages(searchQuery, page, perPage)
        .then(({ hits, totalHits }) => {
          setHits(prevHits => [...prevHits, ...hits]);
          setTotalHits(totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchQuery, page]);

  // useEffect(() => {
  //   if (page !== 1) {
  //     setLoading(true);

  //     getImages(searchQuery, page)
  //       .then(({ hits, totalHits }) => {
  //         setHits(prev => [...prev, ...hits]);
  //         setTotalHits(totalHits);
  //       })
  //       .catch(error => setError(error))
  //       .finally(() => setLoading(false));
  //   }
  // }, [page]);

  const showLoadMore = () => {
    return page < Math.ceil(totalHits / perPage);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setHits([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenPicture = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const handleLoadMoreBtnClick = async () => {
    await setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />

      {error && <p>{error.message}</p>}

      {hits.length > 0 && (
        <ImageGallery hits={hits} openImage={handleOpenPicture} />
      )}

      {loading && (
        <div className={css.Spiner}>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}

      {hits.length !== 0 && !loading && showLoadMore() && (
        <Button onClick={handleLoadMoreBtnClick} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={largeImage} />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
