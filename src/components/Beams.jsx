import React, { useEffect, useRef } from 'react';

function parseHex(hex) {
  const value = hex.replace('#', '');
  const normalized = value.length === 3 ? value.split('').map((part) => part + part).join('') : value;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export default function Beams({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#ffffff',
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;
    const color = parseHex(lightColor);
    let width = 0;
    let height = 0;
    let frame;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      targetY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    };

    const draw = (time) => {
      pointerX += (targetX - pointerX) * 0.08;
      pointerY += (targetY - pointerY) * 0.08;
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'screen';
      context.translate(width / 2, height / 2);
      context.rotate((rotation * Math.PI) / 180);
      context.translate(-width / 2, -height / 2);

      for (let index = 0; index < beamNumber; index += 1) {
        const spread = beamNumber === 1 ? 0 : index / (beamNumber - 1) - 0.5;
        const wave = Math.sin(time * 0.00025 * speed + index * 1.7) * noiseIntensity;
        const cursorBend = (pointerX - 0.5) * width * 0.22 * (1 - Math.abs(spread));
        const baseX = width * 0.5 + spread * width * 0.82 + cursorBend + wave * width * 0.015;
        const beamSize = Math.max(1, beamWidth * (1 + Math.sin(index * 2.2) * 0.3) * (1 + scale));
        const topY = -height * (0.15 + scale * 0.18);
        const bottomY = height * 1.1;
        const drift = (pointerY - 0.5) * height * 0.16;
        const alpha = 0.11 + (1 - Math.abs(spread)) * 0.16;
        context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        context.beginPath();
        context.moveTo(baseX - beamSize, bottomY);
        context.lineTo(baseX + beamSize, bottomY);
        context.lineTo(baseX + beamSize * 0.34 + drift, topY);
        context.lineTo(baseX - beamSize * 0.34 + drift, topY);
        context.closePath();
        context.fill();
      }
      context.restore();
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, [beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation]);

  return <canvas ref={canvasRef} className="beams-canvas" aria-hidden="true" />;
}
