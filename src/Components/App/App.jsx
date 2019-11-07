import React, { Component, createRef } from 'react';
import { propertyHelp, fetchImg } from '../../Services/helps';
import SearchForm from '../SearchForm/SearchForm';
import Gallery from '../Gallery/Gallery';
import Modal from '../Modal/Modal';
import style from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    modal: false,
    id: '',
  };

  appRef = createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }
  handleSubmit = query => {
    this.setState({ query, images: [], page: 1, id: '' });
  };

  handleOpenModal = id => {
    this.setState({ id, modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    fetchImg(query, page)
      .then(images => {
        this.setState(state => ({
          images: [...state.images, ...propertyHelp(images)],
          page: state.page + 1,
        }));
      })
      .finally(() => {
        const { scrollHeight } = this.appRef.current;
        window.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  findImage = id => this.state.images.find(image => image.id === id);
  render() {
    const { images, modal, id } = this.state;
    const { largeImageURL, tags } = id ? this.findImage(id) : '';
    return (
      <div className={style.app} ref={this.appRef}>
        {modal && (
          <Modal
            src={largeImageURL}
            alt={tags}
            onCloseModal={this.handleCloseModal}
          />
        )}
        <SearchForm onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <Gallery images={images} onOpenModal={this.handleOpenModal} />
        )}
        {images.length > 0 && (
          <button type="button" onClick={this.fetchImages}>
            Load more articles
          </button>
        )}
      </div>
    );
  }
}

export default App;
