import React, { useCallback } from 'react';
import Particles from 'react-particles'; // ✅ Corrected import
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 80,
          },
          size: {
            value: 1.5,
          },
          opacity: {
            value: 0.2,
          },
          move: {
            enable: true,
            speed: 0.4,
          },
          color: {
            value: '#ffffff',
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
