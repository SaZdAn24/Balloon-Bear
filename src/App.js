import React from 'react';
import gsap from 'gsap';
import BalloonBear from './components/BalloonBear';
import Cloud from './components/Cloud';

const CLOUDS = new Array(10).fill().map(() => {
  return {
    id: crypto.randomUUID(),
    x: gsap.utils.random(-0.2, 1.2),
    size: gsap.utils.random(20, 60, 1),
    speed: gsap.utils.random(10, 60, 0.1),
    delay: gsap.utils.random(-30, 20, 0.1),
    flipped: Math.random() > 0.5 ? 1 : 0,
    z: gsap.utils.random(0, 10),
  };
});

const App = () => {
  const [bears, setBears] = React.useState([]);
  
  const onFinish = (id) => {
    setBears(bears => bears.filter(bear => bear.id !== id));
  };

  const addBear = () => {
    setBears(oldBears => [...oldBears, {
      id: crypto.randomUUID(),
      x: gsap.utils.random(0, 1),
      hue: gsap.utils.random(0, 359, 1),
      size: gsap.utils.random(10, 40, 1),
      speed: gsap.utils.random(2, 20, 0.1),
      flipped: Math.random() > 0.5 ? 1 : 0,
      z: gsap.utils.random(0, 10, 1),
      onFinish,
    }]);
  };

  React.useEffect(() => {
    document.body.addEventListener('click', addBear);
  }, []);

  return (
    <>
      <BalloonBear main />
      {bears.map(bear => {
        return <BalloonBear key={bear.id} {...bear} />;
      })}
      {CLOUDS.map(cloud => {
        return <Cloud key={cloud.id} {...cloud} />;
      })}
    </>
  );
};

export default App;
