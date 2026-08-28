import React, { useMemo } from 'react';
import ProjectPoster from './ProjectPoster.jsx';

export default function ProjectAccordion({ projects, lang, text, filter, setFilter, onOpen }) {
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === 'all' || project.category === filter),
    [filter, projects],
  );
  return (
    <section className="work-section" id="work">
      <div className="work-section__head reveal">
        <h2>{lang === 'zh' ? '精选作品' : 'SELECTED WORK'}</h2>
        <p>{text.work.intro}</p>
      </div>

      <div className="work-filter reveal" aria-label={lang === 'zh' ? '作品分类' : 'Project categories'}>
        {['all', 'graphic', 'motion', 'threeD'].map((value) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'is-active' : ''}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {text.filter[value]}
          </button>
        ))}
      </div>

      <div className="project-gallery reveal">
        {visibleProjects.map((project) => {
          const originalIndex = projects.indexOf(project);
          return (
            <button
              className={`project-gallery__item project-gallery__item--${project.layout || 'standard'}`}
              key={project.id}
              type="button"
              aria-label={`${project.title[lang]} - ${project.type[lang]}`}
              onClick={() => onOpen(originalIndex)}
            >
              <span className="project-gallery__visual">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.poster}
                    aria-label={project.title[lang]}
                    muted
                    playsInline
                    preload={project.poster ? 'none' : 'metadata'}
                  />
                ) : project.posterComponent ? (
                  <ProjectPoster />
                ) : (
                    <img src={project.image} alt={project.title[lang]} loading="lazy" decoding="async" />
                )}
                {project.posterLogo && (
                  <span className={`project-gallery__brand-layer project-gallery__brand-layer--${project.posterLogoClass || ''}`} aria-hidden="true">
                    <img src={project.posterLogo} alt="" loading="lazy" decoding="async" />
                  </span>
                )}
                {project.video && <span className="project-gallery__play" aria-hidden="true">▶</span>}
                <span className="project-gallery__hover">{lang === 'zh' ? '打开项目' : 'OPEN PROJECT'} <span aria-hidden="true">↗</span></span>
              </span>
              <span className="project-gallery__caption">
                <span className="project-gallery__meta">{project.id} / {project.year}</span>
                <strong>{project.title[lang]}</strong>
                <span className="project-gallery__type">{project.type[lang]}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
