
import { animateCardHover, resetCardAnimation } from '../animations/cardAnimations.js';
import { isCursorInside } from "../utils/helpers.js";

let currentTarget, scrollTimeout, scrollTimeoutInter  = null
let isFirstActive = true
window.mouseX = 0;
window.mouseY = 0;

document.addEventListener('mousemove', (event) => {
  window.mouseX = event.clientX;
  window.mouseY = event.clientY;
  });

export function handleCardHover(event) {  
    currentTarget = event.currentTarget 
    animateCardHover(event.currentTarget);
    
    clearTimeout(scrollTimeoutInter)
    scrollTimeoutInter = setTimeout(() => {
      isFirstActive = false
    }, 1000);
}

export function handleCardLeave() {
  resetCardAnimation();
  currentTarget = null 
  isFirstActive = true
  clearTimeout(scrollTimeoutInter)
  clearTimeout(scrollTimeout)
}

export function handleGlobalMouseLeave() {   
    resetCardAnimation();
    currentTarget = null
    isFirstActive = true
    clearTimeout(scrollTimeoutInter)
    clearTimeout(scrollTimeout) 
  }

export function handleGlobalScroll() {
    try { 
      if (currentTarget) resetCardAnimation();
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
      const blocks = document.querySelectorAll('.block');
       blocks.forEach(block => {
        if (isCursorInside(block, window.mouseX, window.mouseY) && !isFirstActive) {
            animateCardHover(block);
            isFirstActive = false;
          }
        })
      }, 400);
    } catch (error) {
    console.log(error)
    } 
}
