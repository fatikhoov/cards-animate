
const animationSettings = {
  opacityDuration: 0.01,
  opacityDurationActive: 0.3,
    popupTextDuration: 0.6,
    titleDuration: 0.3,
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
      ease: "power1.in",
    });
   
      gsap.killTweensOf(".popup-text");
      gsap.to(".popup-text", {
        opacity: 0,
        duration: animationSettings.popupTextDuration,
        ease: "power1.out",
      });
  
      gsap.killTweensOf('.popup-text-invert');
      gsap.to('.popup-text-invert', {
        opacity: 0,
        y: -184,
        rotateX: -45, 
        duration: animationSettings.popupTextDuration,
        ease: "power1.out",
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

    gsap.killTweensOf(popup);
    gsap.to(popup, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: animationSettings.popupTextDuration / 1.5,
      ease: "power1.out",
    });
     
    gsap.killTweensOf(popupText);
    gsap.fromTo(popupText, {
        opacity: 0, 
        y: 84,
        rotateX: -45,
        delay: 0.2,
        duration: animationSettings.popupTextDuration * 1.5,
      }, {
        opacity: 1, 
        y: 0,
        rotateX: 0,
        duration: animationSettings.popupTextDuration * 1.5,
      ease: "power4.out", 
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
  