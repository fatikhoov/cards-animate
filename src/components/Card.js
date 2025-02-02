// src/components/Card.js
import { handleCardHover, handleCardLeave, handleGlobalMouseLeave, handleGlobalScroll } from '../utils/eventHandlers.js';

class Card {
  static globalListenersAdded = false; // Статическое свойство для предотвращения повторных глобальных слушателей

  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.video = data.video;
    this.title = data.title;
    this.popupText = data.popupText;
  }

  render() {
    // Создаем контейнер для карточки
    const cardElement = document.createElement('div');
    cardElement.classList.add('block');
    cardElement.id = this.id;

    // Создаем обертку для изображения
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    // Создаем блок для видео
    const videoPlaceholder = document.createElement('div');
    videoPlaceholder.classList.add('video-placeholder');
    videoPlaceholder.setAttribute('data-autoplay', 'true');
    videoPlaceholder.setAttribute('data-loop', 'true');
    videoPlaceholder.setAttribute('data-wf-ignore', 'true');

    // Создаем элемент video
    const videoElement = document.createElement('video');
    videoElement.setAttribute('loading', 'lazy');
    videoElement.setAttribute('autoplay', 'autoplay');
    videoElement.setAttribute('loop', 'loop');
    videoElement.setAttribute('muted', 'muted');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('data-wf-ignore', 'true');
    videoElement.setAttribute('data-object-fit', 'cover');
    videoElement.classList.add('lazyLoad', 'isLoaded');
    videoElement.poster = this.image;  // Используем изображение как постер

    // Создаем источник для видео
    const videoSource = document.createElement('source');
    videoSource.setAttribute('data-wf-ignore', 'true');
    videoSource.src = this.video;

    // Добавляем source в video и video в videoPlaceholder
    videoElement.appendChild(videoSource);
    videoPlaceholder.appendChild(videoElement);
    imageWrapper.appendChild(videoPlaceholder);

    // Добавляем заголовок
    const titleElement = document.createElement('h4');
    titleElement.classList.add('block-title');
    titleElement.innerHTML = `<strong>${this.title}</strong>`;

    // Добавляем текст попапа
    const popupTextWrapper = document.createElement('div');
    popupTextWrapper.classList.add('popup-text');

    const popupTextElement = document.createElement('p');
    popupTextElement.classList.add('popup-text-invert', `popup-text-${this.id}`);
    popupTextElement.textContent = this.popupText;

    popupTextWrapper.appendChild(popupTextElement);

    // Добавляем все элементы в карточку
    cardElement.appendChild(imageWrapper);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(popupTextWrapper);

    // Добавляем слушатели событий
    this.addListeners(cardElement);
    console.log('Карточка создана, слушаем события');

    // Возвращаем карточку, чтобы можно было вставить в контейнер
    return cardElement;
  }

  addListeners(cardElement) {
    // Локальные события для конкретной карточки
    cardElement.addEventListener('mouseenter',(e) => handleCardHover(e));
    cardElement.addEventListener('mouseleave',(e) => handleCardLeave(e));

    // Глобальные события для всего документа или окна
    if (!Card.globalListenersAdded) {
      document.addEventListener('mouseleave',(e) => handleGlobalMouseLeave(e));
      window.addEventListener('scroll',(e) => handleGlobalScroll(e));
      Card.globalListenersAdded = true; // Флаг для предотвращения дублирования
    }
  }
}

export default Card;
