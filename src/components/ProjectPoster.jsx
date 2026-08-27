import React from 'react';

export default function ProjectPoster({ className = '' }) {
  return (
    <div className={`ahomelas-poster ${className}`.trim()} role="img" aria-label="AHOMELAS&PROYA cosmetic 3D rendering poster">
      <span className="ahomelas-poster__index">12 / 2026</span>
      <span className="ahomelas-poster__line ahomelas-poster__line--top" aria-hidden="true" />
      <span className="ahomelas-poster__line ahomelas-poster__line--side" aria-hidden="true" />
      <div className="ahomelas-poster__content">
        <p className="ahomelas-poster__eyebrow">PRODUCT VISUAL / 3D RENDERING</p>
        <h3>AHOMELAS<span>&amp;</span>PROYA</h3>
        <p className="ahomelas-poster__subline">A STUDY IN CONTRAST / MATERIAL / LIGHT</p>
      </div>
      <div className="ahomelas-poster__footer">
        <span>WARM / AMBER</span>
        <span>COOL / OCEAN</span>
      </div>
    </div>
  );
}
