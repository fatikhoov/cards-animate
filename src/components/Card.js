import { handleCardHover, handleCardLeave, handleGlobalMouseLeave, handleGlobalScroll } from '../utils/eventHandlers.js';

class Card {
  static globalListenersAdded = false;

  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.video = data.video;
    this.title = data.title;
    this.popupText = data.popupText;
  }

  render() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('block');
    cardElement.id = this.id;

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const videoPlaceholder = document.createElement('div');
    videoPlaceholder.classList.add('video-placeholder');
    videoPlaceholder.setAttribute('data-autoplay', 'true');
    videoPlaceholder.setAttribute('data-loop', 'true');
    videoPlaceholder.setAttribute('data-wf-ignore', 'true');

    const videoElement = document.createElement('video');
    videoElement.setAttribute('loading', 'lazy');
    videoElement.setAttribute('autoplay', 'autoplay');
    videoElement.setAttribute('loop', 'loop');
    videoElement.setAttribute('muted', 'muted');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('data-wf-ignore', 'true');
    videoElement.setAttribute('data-object-fit', 'cover');
    videoElement.classList.add('lazyLoad', 'isLoaded');
    videoElement.poster = this.image;

    const videoSource = document.createElement('source');
    videoSource.setAttribute('data-wf-ignore', 'true');
    videoSource.src = this.video;

    videoElement.appendChild(videoSource);
    videoPlaceholder.appendChild(videoElement);
    imageWrapper.appendChild(videoPlaceholder);

    const titleElement = document.createElement('h4');
    titleElement.classList.add('block-title');
    titleElement.innerHTML = `<strong>${this.title}</strong>`;

    const popupTextWrapper = document.createElement('div');
    popupTextWrapper.classList.add('popup-text');

    const popupTextElement = document.createElement('p');
    popupTextElement.classList.add('popup-text-invert', `popup-text-${this.id}`);
    popupTextElement.textContent = this.popupText;

    popupTextWrapper.appendChild(popupTextElement);

    cardElement.appendChild(imageWrapper);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(popupTextWrapper);

    this.addListeners(cardElement);
    console.log('Карточка создана, слушаем события');

    return cardElement;
  }

  addListeners(cardElement) {
    cardElement.addEventListener('mouseenter',(e) => handleCardHover(e));
    cardElement.addEventListener('mouseleave',() => handleCardLeave()); 

    if (!Card.globalListenersAdded) {
      document.addEventListener('mouseleave',() => handleGlobalMouseLeave());
      window.addEventListener('scroll',() => handleGlobalScroll());
      Card.globalListenersAdded = true;
    }
  }
}

export default Card;
