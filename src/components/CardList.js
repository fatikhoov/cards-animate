// src/components/CardList.js

import Card from './Card.js';  // Импорт компонента Card

class CardList {
  constructor(container) {
    this.container = container;
  }

  async render() { 
    try {
      const response = await fetch('./data/cardsData.json');  // Загрузка данных из JSON
      const cardsData = await response.json();  // Преобразуем в формат JavaScript

      this.container.innerHTML = '';  // Очистка контейнера перед рендером

      cardsData.forEach(data => {
        const card = new Card(data);  // Создание новой карточки
        this.container.appendChild(card.render());  // Добавление карточки в контейнер
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);  // Логирование ошибок
    } finally {
    console.log('рендер закончен')
    }
  }
}

export default CardList;
