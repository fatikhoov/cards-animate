<<<<<<< HEAD
import CardList from 'src/components/CardList.js';
=======
import CardList from 'src/components/CardList.js';
>>>>>>> 6aec4b0dd12902fc0708822a786b1bfecbeb1915

document.addEventListener('DOMContentLoaded', () => {
console.log('DOM готов к работе')
  const container = document.getElementById('blocks-container');
  const cardList = new CardList(container);
  cardList.render();
});
