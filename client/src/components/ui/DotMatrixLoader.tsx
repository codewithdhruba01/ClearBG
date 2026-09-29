import { useEffect, useState } from 'react';

const BASE_OPACITY = 0.08;
const GATE_OPACITY = 0.92;

export const DotMatrixLoader = ({ size = 64, speed = 1 }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const start = Date.now();
    const animate = () => {
      // Calculate phase 't' based on time and speed
      setTime(((Date.now() - start) / 1600) * speed * Math.PI * 2);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  const dots = [];
  const gridSize = 7;
  const center = (gridSize - 1) / 2; // 3

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const dx = col - center;
      const dy = row - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Circular mask for 7x7 grid: skip corners where distance > 3.16
      if (distance * distance > 10) {
        continue;
      }

      // The wave calculation logic from DotmCircular7
      const t = time;
      const ring = distance;
      const angle = Math.atan2(dy, dx);

      const petalWave = 0.5 + 0.5 * Math.cos(5 * angle - t * 1.7);
      const ringWave = 0.5 + 0.5 * Math.cos(ring * 3.3 - t * 1.2);
      const chordWave = 0.5 + 0.5 * Math.cos((dx + dy) * 1.6 + t * 1.35);

      // Sharpen contrast so lit cells form clear, visible groups.
      const petalGate = Math.pow(petalWave, 2.2);
      const blend = 0.68 * petalGate + 0.22 * ringWave + 0.1 * chordWave;
      const opacity = BASE_OPACITY + (GATE_OPACITY - BASE_OPACITY) * blend;

      dots.push(
        <div
          key={`${row}-${col}`}
          className="bg-foreground rounded-full"
          style={{
            gridColumn: col + 1,
            gridRow: row + 1,
            opacity: opacity,
            width: '100%',
            height: '100%'
          }}
        />
      );
    }
  }

  return (
    <div 
      className="grid mb-6" 
      style={{ 
        width: size, 
        height: size, 
        gap: '4px',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
      {dots}
    </div>
  );
};
