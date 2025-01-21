class Card {
  constructor({ id, image, title, popupText }) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.popupText = popupText;

    this.block = null; 
    this.popupTextWrap = null; 
    this.popupTextElem = null; 
    this.titleElem = null; 
  }

  /**
   * Метод для рендера карточки
   * @param {HTMLElement} container
   */
  render(container) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = this.id;

    block.innerHTML = `<div class="image-wrapper">
    <img src="${this.image}" alt="Card Image/Video" class="image-placeholder" loading="lazy"/>
  </div>
  <div class="block-title">${this.title}</div>
  <div class="popup-text">
  <div class="popup-text-invert popup-text-${this.id}">${this.popupText}</div>
  </div>`;

    container.appendChild(block);

    this.block = block;
    this.titleElem = block.querySelector('.block-title');
    this.popupTextWrap = block.querySelector(`.popup-text`);
    this.popupTextElem = block.querySelector(`.popup-text-invert`);

    this.addListeners();
  }

  addListeners() {
    this.block.addEventListener('pointerenter', () => this.handlePointerEnter());
    this.block.addEventListener('pointerleave', () => this.handlePointerLeave());
  }

  handlePointerEnter() {
    gsap.to('.block', {
      opacity: (i, target) => (target === this.block ? 1 : 0),
      duration: 0.3,
      ease: 'power1.out',
    });

      gsap.to(this.popupTextWrap, {
        opacity: 1,
        y: -20, 
        duration: 0.3,
        ease: "power2.out",
        visibility: "visible", 
      });
    
      gsap.to(this.popupTextElem, {
        opacity: 1,
        y: -20, 
        duration: 0.3,
        ease: "power2.out",
      });
    

    gsap.to(this.titleElem, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  handlePointerLeave() {
    gsap.to('.block', {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.in',
    });
    
    gsap.to(this.popupTextElem, {
      opacity: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.in', 
    });
    
    gsap.to(this.popupTextWrap, {
      opacity: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.in',
      visibility: 'hidden',
    });

    gsap.to(this.titleElem, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  }
}

// Контейнер для карточек
const container = document.getElementById('blocks-container');

// Данные для карточек
const cardsData = [
  {
    id: 'card-1',
    image: 'https://files.masterkrasok.ru/v4/pictures/jBcU3AXkNmv3SDmgeb3xMePUrVNhqNv2TAPcQb3r.jpg',
    title: 'МТС Лейбл. Айдентика',
    popupText: 'Новые культурные явления',
  },
  {
    id: 'card-2',
    image: 'https://shop-cdn1-2.vigbo.tech/shops/175125/products/19013994/images/2-6e3847b7d72bcbe11793ad614a21d940.jpg?version=1',
    title: 'TTMG. Корпоративный сайт',
    popupText: 'Премиум в минимализме',
  },
  {
    id: 'card-3',
    image: 'https://www.jewish-museum.ru/upload/resize_cache/iblock/9ee/1400_920_1/0wxi3rizzt53zzouzj7idnro0v6lgzcy.jpg',
    title: 'Kaspersky. Айдентика',
    popupText: 'Эволюция кибериммунитета',
  },
];

const cardsData2 = [
  {
    id: 'card-4',
    image: 'https://files.masterkrasok.ru/v4/pictures/jBcU3AXkNmv3SDmgeb3xMePUrVNhqNv2TAPcQb3r.jpg',
    title: 'МТС Лейбл. Айдентика',
    popupText: 'Новые культурные явления',
  },
  {
    id: 'card-5',
    image: 'https://shop-cdn1-2.vigbo.tech/shops/175125/products/19013994/images/2-6e3847b7d72bcbe11793ad614a21d940.jpg?version=1',
    title: 'TTMG. Корпоративный сайт',
    popupText: 'Премиум в минимализме',
  },
  {
    id: 'card-6',
    image: 'https://www.jewish-museum.ru/upload/resize_cache/iblock/9ee/1400_920_1/0wxi3rizzt53zzouzj7idnro0v6lgzcy.jpg',
    title: 'Kaspersky. Айдентика',
    popupText: 'Эволюция кибериммунитета',
  },
];

// Инициализация карточек
cardsData.forEach((cardData) => {
  const card = new Card(cardData); 
  card.render(container); 
});
cardsData2.forEach((cardData) => {
  const card = new Card(cardData); 
  card.render(container); 
});