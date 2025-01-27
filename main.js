 

class Card {
  constructor({ id, image, video, title, popupText }) {
    this.id = id;
    this.image = image;
    this.video = video;
    this.title = title;
    this.popupText = popupText;
    
    this.block = null; 
    this.popupTextWrap = null; 
    this.popupTextElem = null; 
    this.titleElem = null; 
    
    this.scrollTimeout = null;
    this.screenWidth = window.innerWidth;

    this.animatingTime = 200;
  }

  render(container) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = this.id;

    block.innerHTML = `
    <div class="image-wrapper"> 
     <div data-autoplay="true" data-loop="true" data-wf-ignore="true" class="video-placeholder">
        <video loading="lazy" autoplay="autoplay" loop="loop" muted="muted" playsinline="" data-wf-ignore="true" data-object-fit="cover" class="lazyLoad isLoaded" poster="${this.image}">
          <source data-wf-ignore="true" src="${this.video}">
        </video>
      </div>
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
    this.block.addEventListener('mouseenter', (e) => this.handleTriggers(e));
    this.block.addEventListener('mouseleave', (e) => this.handleTriggers(e));
    
    if (!Card.globalListenersAdded) {
      document.addEventListener('mouseleave', (e) => this.handleTriggers(e));
      window.addEventListener('scroll', (e) => this.handleTriggers(e));
    
      Card.globalListenersAdded = true; // Флаг, чтобы избежать дублирования
    }
  }
  
  // ---------- СБРОС АНИМАЦИИ ----------
  resetCardsState() {
    // Сброс прозрачности всех блоков
    gsap.to(".block", {
      opacity: 1,
      duration: this.animatingTime/800,
      ease: "power1.in", 
    });
   
    document.querySelectorAll(`.popup-text`).forEach(popup => {
      gsap.to(popup, {
        opacity: 0, 
        duration: this.animatingTime/450, 
        ease: "power2.out",
      });
    });
  
    document.querySelectorAll('.popup-text-invert').forEach(popupText => {
        gsap.to(popupText, {
        opacity: 0, 
        y: -84,
        rotateX: -45,
        duration: this.animatingTime/450,
        ease: "power2.out",
        onComplete: () => (
          gsap.set(popupText, { 
            y: 84,
          })
        )
      });
    });
  
    // Возврат заголовков
    document.querySelectorAll('.block-title').forEach(title => {
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }
  // ---------- АНИМАЦИЯ ----------
  handlePointerEnter() {    
    gsap.to('.block', {
      opacity: (i, target) => (target === this.block ? 1 : 0),
      duration: (i, target) => (target === this.block ? 0 : this.animatingTime/1000),
      ease: "power2.out", 
    });
    
    gsap.fromTo(this.popupTextElem, {
      opacity: 0, 
      y: 84,
      rotateX: -45,
    }, {
      opacity: 1, 
      y: 0,
      rotateX: 0,
      duration: this.animatingTime/500,
      ease: "power1.out", 
      }
    );
    gsap.to(this.popupTextWrap, {
        opacity: 1, 
        duration: this.animatingTime/500,
        ease: "power1.out", 
    });
    gsap.to(this.titleElem, {
      opacity: 0, 
      duration: 0.3,
      ease: 'power2.out',
    });
     
  }
  // ---------- УСЛОВИЯ ----------
  handleTriggers(e) {  
    this.resetCardsState();

    if (this.screenWidth > 640) {  
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
        if (e && e.type === 'mouseleave') { 
          const blocks = document.querySelectorAll('.block');
          blocks.forEach(block => {
            if (!this.isCursorInside(block)) {
              this.resetCardsState();
            }
          }) 
      }
      }  
      if (e && e.type === 'mouseenter') {  
        clearTimeout(this.scrollTimeout)
        runAnimating(this.animatingTime)
      }
      if (e && e.type === 'scroll') {  
        clearTimeout(this.scrollTimeout)
        runAnimating(this.animatingTime*2) 
      }
      if (e && e.type === 'mouseleave') { 
          const blocks = document.querySelectorAll('.block');
          blocks.forEach(block => {
            if (!this.isCursorInside(block)) {
              this.resetCardsState();
            }
          }) 
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
    video: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/pillow.mp4',
    title: 'МТС Лейбл. Айдентика',
    popupText: 'Новые культурные явления',
  },
  {
    id: 'card-2',
    image: 'https://shop-cdn1-2.vigbo.tech/shops/175125/products/19013994/images/2-6e3847b7d72bcbe11793ad614a21d940.jpg?version=1',
    video: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/video_covers_for_cases/Preview_TTMG.mp4',
    title: 'TTMG. Корпоративный сайт',
    popupText: 'Премиум в минимализме',
  },
  {
    id: 'card-3',
    image: 'https://www.jewish-museum.ru/upload/resize_cache/iblock/9ee/1400_920_1/0wxi3rizzt53zzouzj7idnro0v6lgzcy.jpg',
    video: 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2012/Cover-Main.mp4',
    title: 'Kaspersky. Айдентика',
    popupText: 'Эволюция кибериммунитета',
  },
];
cardsData.forEach((cardData) => {
  const card = new Card(cardData); 
  card.render(container); 
});