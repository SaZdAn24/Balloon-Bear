import React from 'react';
import gsap from 'gsap';

const POP = new Audio('https://assets.codepen.io/605876/pop.mp3');

const BalloonBear = ({ id, x, hue, speed, onFinish, size, flipped, main, z }) => {
  const balloonRef = React.useRef(null);
  const bearRef = React.useRef(null);
  React.useEffect(() => {
    if (!main) {
      gsap.to(bearRef.current, {
        y: -window.innerHeight * 1.5,
        duration: speed,
        ease: 'none',
        onComplete: () => {
          if (onFinish) onFinish(id);
        }
      });
      balloonRef.current.addEventListener('click', () => {
        console.info('pop');
        gsap.set(balloonRef.current, { transformOrigin: '50% 50%' });
        POP.pause();
        POP.currentTime = 0;
        POP.play();
        gsap.timeline()
          .to(balloonRef.current, {
            scale: 2,
            opacity: 0,
            duration: 0.1,
            transformOrigin: '50% 50%',
          })
          .to(bearRef.current, {
            y: '100vh',
            yPercent: -100,
            duration: 1,
            onComplete: () => {
              if (onFinish) onFinish(id);
            }
          });
      });
    }
  }, []);
  return (
    <svg
      ref={bearRef}
      className="balloon-bear"
      data-balloon-bear-static={main}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 885 1059"
      style={{
        '--x': x,
        '--hue': hue,
        '--speed': speed,
        '--size': size,
        '--flipped': flipped,
        '--z': z
      }}
    >
    
    </svg>
  );
};

export default BalloonBear;
