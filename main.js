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
    
    this.scrollTimeout = null;
    this.screenWidth = window.innerWidth;
  }

  render(container) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = this.id;

    block.innerHTML = `<div class="image-wrapper">
    <img src="${this.image}" alt="Card Image/Video" class="image-placeholder" loading="lazy"/>
  </div>
  <h4 class="block-title"><strong>${this.title}</strong></h4>
  <div class="popup-text">
  <p class="popup-text-invert popup-text-${this.id}">${this.popupText}</p>
  </div>`;

    container.appendChild(block);

    this.block = block;
    this.titleElem = block.querySelector('.block-title');
    this.popupTextWrap = block.querySelector('.popup-text');
    this.popupTextElem = block.querySelector('.popup-text-invert');

    this.addListeners();
  }
  addListeners() {    
    this.block.addEventListener('mouseenter', (e) => this.handleScroll(e));
    this.block.addEventListener('mouseleave', () => this.resetCardsState());
    
    if (!Card.globalListenersAdded) {
      document.addEventListener('mouseleave', () => this.resetCardsState());
      window.addEventListener('scroll', (e) => this.handleScroll(e));
    
      Card.globalListenersAdded = true; // Флаг, чтобы избежать дублирования
    }
  }
  
  // ---------- СБРОС АНИМАЦИИ ----------
  resetCardsState() {

    // Сброс прозрачности всех блоков
    gsap.to(".block", {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  
    // Скрытие всех popup-text и их элементов
    document.querySelectorAll(`.popup-text`).forEach(popup => {
      gsap.to(popup, {
        opacity: 0,
        y: 0,
        duration: 0, 
      });
    });
  
    document.querySelectorAll('.popup-text-invert').forEach(popupText => {
        gsap.to(popupText, {
        opacity: 0,
        y: 0,
        duration: 0.1,
        ease: "power4.out",
      });
    });
  
    // Возврат заголовков
    document.querySelectorAll('.block-title').forEach(title => {
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
  // ---------- АНИМАЦИЯ ----------
  handlePointerEnter() {    
    gsap.to('.block', {
      opacity: (i, target) => (target === this.block ? 1 : 0),
      duration: 0.1,
    });
    gsap.to(this.popupTextElem, {
        opacity: 1,
        y: -20, 
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          this.popupTextWrap.style.mixBlendMode = 'difference';
        },
    });
    gsap.to(this.popupTextWrap, {
        opacity: 1,
        zIndex: 9,
        duration: 1,
        ease: "power4.out",
        y: 0,
        x: 0,
        z: 0
    });
    gsap.to(this.titleElem, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
  // ---------- УСЛОВИЯ ----------
  handleScroll(e) {   
    // если экран больше 640px
    // если курсор зашел на карточку - с проверкой где остановился курсор
    // если был скролл - с проверкой где остановился курсор
    if (this.screenWidth > 640) {
      clearTimeout(this.scrollTimeout)
      
      const runAnimating = (time) => {
        this.scrollTimeout = setTimeout(() => {
          const blocks = document.querySelectorAll('.block');
          blocks.forEach(block => {
            if (this.isCursorInside(block)) {
              // Если курсор на карточке, анимация
              this.block = block;
              this.titleElem = block.querySelector('.block-title');
              this.popupTextWrap = block.querySelector('.popup-text');
              this.popupTextElem = block.querySelector('.popup-text-invert');
              this.handlePointerEnter();
            }
          });
        }, time);
      }  
      if (e && e.type === 'mouseenter') {
        runAnimating(200)
      }
      if (e && e.type === 'scroll') {
        this.resetCardsState()
        runAnimating(300) 
      }
    }
  }

  // ---------- курсор на карточке? да/нет ----------
  isCursorInside(block) {
    const rect = block.getBoundingClientRect();
    return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
  }
}

const container = document.getElementById('blocks-container');
window.mouseX = 0;
window.mouseY = 0;
document.addEventListener('mousemove', (event) => {
window.mouseX = event.clientX;
window.mouseY = event.clientY;
});
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
cardsData.forEach((cardData) => {
  const card = new Card(cardData); 
  card.render(container); 
});