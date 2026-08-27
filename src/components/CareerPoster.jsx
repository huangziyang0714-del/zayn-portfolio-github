import React from 'react';

export default function CareerPoster() {
  return (
    <div className="career-poster" aria-label="Zayn visual practice poster">
      <div className="career-poster__topline"><span>ZAYN</span><span>VISUAL PRACTICE</span></div>
      <div className="career-poster__field" aria-hidden="true">
        <i className="career-poster__disc career-poster__disc--large" />
        <i className="career-poster__disc career-poster__disc--small" />
        <i className="career-poster__bar career-poster__bar--horizontal" />
        <i className="career-poster__bar career-poster__bar--vertical" />
      </div>
      <div className="career-poster__title"><span>MAKE</span><strong>VISIBLE</strong></div>
      <div className="career-poster__index">
        <span>MODEL</span><span>IMAGE</span><span>MOTION</span><span>AI</span>
      </div>
      <div className="career-poster__footer"><span>2026</span><span>HZ / 01</span></div>
    </div>
  );
}
