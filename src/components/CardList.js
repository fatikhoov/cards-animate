
import Card from './Card.js';

class CardList {
  constructor(container) {
    this.container = container;
  }

  async render() { 
    try {
      const response = await fetch('https://fatikhoov.github.io/cards-animated/src/data/cardsData.json');
      const cardsData = await response.json();

      this.container.innerHTML = '';

      cardsData.forEach(data => {
        const card = new Card(data);
        this.container.appendChild(card.render());
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
    console.log('рендер закончен')
    }
  }
}

export default CardList;
