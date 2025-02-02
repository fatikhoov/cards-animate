
export function isCursorInside(cardElement, cursorX, cursorY) {
    const rect = cardElement.getBoundingClientRect();
    return cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom;
  }
 
   
 
 