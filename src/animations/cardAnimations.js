
const animationSettings = {
  opacityDuration: 0.4,
  opacityDurationActive: 0.2,
    popupTextDuration: 0.8,
    titleDuration: 0.4,
    easing: "power1.out",
  };
  
  function resetCardAnimation(target) {
    let popup, popupText
    popup = target.querySelector(".popup-text")
    popupText = target.querySelector('.popup-text-invert') 

    gsap.killTweensOf(".block");
    gsap.to(".block", {
      opacity: 1,
      duration: animationSettings.opacityDuration,
      ease: animationSettings.easing,
    });
   
     /*  gsap.killTweensOf(".popup-text");
      gsap.to(".popup-text", {
        opacity: 0,
        duration: animationSettings.popupTextDuration,
        ease: animationSettings.easing,
      }); */
  
      gsap.killTweensOf('.popup-text-invert');
      gsap.to('.popup-text-invert', {
        opacity: 0,
        y: -120,
        rotateX: -45, 
        duration: animationSettings.popupTextDuration,
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
      opacity: (i, el) => (el === target ? 1 : 0),
      duration: animationSettings.opacityDurationActive,
      ease: animationSettings.easing,
    });

   /*  gsap.killTweensOf(popup);
    gsap.fromTo(popup, {
      opacity: 0.5,  
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,  
      duration: animationSettings.popupTextDuration,
    ease: animationSettings.easing,
    }); */
     
    gsap.killTweensOf(popupText);
    gsap.fromTo(popupText, {
        opacity: 0.7, 
        y: 120,
        rotateX: -45,  
      }, {
        opacity: 1, 
        y: 0,
        rotateX: 0, 
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
  