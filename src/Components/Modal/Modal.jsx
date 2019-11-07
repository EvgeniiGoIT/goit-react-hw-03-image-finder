import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';
import style from './Modal.module.css';
const MODAL_ROOT = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    src: T.string.isRequired,
    alt: T.string.isRequired,
    onCloseModal: T.func.isRequired,
  };

  overlayRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') {
      return;
    }

    this.props.onCloseModal();
  };

  handleOverlayClick = e => {
    if (this.overlayRef.current && e.target !== this.overlayRef.current) {
      return;
    }

    this.props.onCloseModal();
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div
        className={style.overlay}
        ref={this.overlayRef}
        onClick={this.handleOverlayClick}
      >
        <div className={style.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      MODAL_ROOT,
    );
  }
}
export default Modal;
