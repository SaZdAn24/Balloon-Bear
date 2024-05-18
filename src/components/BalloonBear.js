import React from 'react';
import gsap from 'gsap';

const POP = new Audio('https://assets.codepen.io/605876/pop.mp3');

const BalloonBear = ({ id, x, hue, speed, onFinish, size, flipped, main, z }) => {
  const balloonRef = React.useRef(null);
  const bearRef = React.useRef(null);

  React.useEffect(() => {
    if (!main && balloonRef.current) {
      gsap.to(bearRef.current, {
        y: -window.innerHeight * 1.5,
        duration: speed,
        ease: 'none',
        onComplete: () => {
          if (onFinish) onFinish(id);
        }
      });
      balloonRef.current.addEventListener('click', handleBalloonClick);
    }
    
    return () => {
      if (balloonRef.current) {
        balloonRef.current.removeEventListener('click', handleBalloonClick);
      }
    };
  }, []);

  const handleBalloonClick = () => {
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
  };

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
      {/* SVG Path data */}
      <g ref={balloonRef} className="balloon">
        <circle
          className="balloon-bear__balloon"
          cx="421.5"
          cy="273.5"
          r={169}
          fill="#D52828"
          fillOpacity=".5"
          stroke="#000"
          strokeWidth={6}
        />
        <path
          className="balloon-bear__balloon"
          fill="#F20000"
          fillOpacity=".5"
          stroke="#000"
          strokeLinejoin="round"
          strokeWidth={6}
          d="M405.5 444.5H437l9.5 20h-50l9-20Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".5"
          strokeWidth={30}
          d="M384.118 142.738a136.004 136.004 0 0 0-98.123 119.174"
        />
      </g>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={6}
        d="m380 757 62-42"
      />
    </svg>
  );
};

export default BalloonBear;
