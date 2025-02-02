import CardList from 'cards-animated/src/components/CardList.js';

document.addEventListener('DOMContentLoaded', () => {
console.log('DOM готов к работе')
  const container = document.getElementById('blocks-container');
  const cardList = new CardList(container);
  cardList.render();
});
