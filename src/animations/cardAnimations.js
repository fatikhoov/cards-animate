
const animationSettings = {
  opacityDuration: 0.6,
  opacityDurationActive: 0.6,
    popupTextDuration: 0.6,
    titleDuration: 0.4,
    easing: "power1.out",
  };
  
  function resetCardAnimation() {

    gsap.killTweensOf(".block");
    gsap.to(".block", {
      visibility: 'visible',
      duration: animationSettings.opacityDuration,
      ease: 'ease',
    });
  
      gsap.killTweensOf('.popup-text-invert');
      gsap.to('.popup-text-invert', {
        opacity: 0,
        y: -64,
        rotateX: -45,  
        duration: animationSettings.popupTextDuration / 2,
        ease: animationSettings.easing,
      });
  
     gsap.killTweensOf('.block-title');
      gsap.to('.block-title', {
        opacity: 1,
        y: 0,
        duration: animationSettings.titleDuration,
        ease: animationSettings.easing,
      }); 
  }
  
  function animateCardHover(target) { 
    let popup, popupText
    popup = target.querySelector(".popup-text")
    popupText = target.querySelector('.popup-text-invert') 

    gsap.killTweensOf('.block');
    gsap.to('.block', {
      visibility: (i, el) => (el === target ? '' : 'hidden'),
      duration: animationSettings.opacityDurationActive,
      ease: 'ease',
    });

    gsap.killTweensOf(popupText);
    gsap.fromTo(popupText, {
        opacity: 0,
        y: 64,
        rotateX: 90,  
        delay: 0.4,
      }, {
        opacity: 1,
        x: 0, 
        y: 0, 
        z: 0,
        rotateX: 0, 
        rotateY: 0, 
        rotateZ: 0,  
        duration: animationSettings.popupTextDuration,
      ease: animationSettings.easing,
        }
      );
    
    gsap.killTweensOf('.block-title');
    gsap.to('.block-title', {
      opacity: 0,
      duration: animationSettings.titleDuration,
      ease: animationSettings.easing,
    });
  }
  
  export { resetCardAnimation, animateCardHover };
  