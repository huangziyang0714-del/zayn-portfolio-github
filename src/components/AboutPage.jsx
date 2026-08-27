import React from 'react';
import CareerPoster from './CareerPoster.jsx';

export default function AboutPage({ text }) {
  return (
    <main className="about-page" id="top">
      <section className="about-intro">
        <div className="about-intro__copy reveal">
          <p>{text.about.label}</p>
          <h1><span>{text.about.headline1}</span><strong>{text.about.headline2}</strong></h1>
          <div className="about-intro__lead">{text.about.lead}</div>
        </div>
        <div className="about-intro__portrait reveal">
          <div><img src="/assets/portrait.jpg" alt={text.about.portraitAlt} loading="lazy" decoding="async" /></div>
        </div>
        <div className="about-intro__hobbies reveal">
          <span>{text.about.hobbiesLabel}</span>
          <ul>{text.about.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}</ul>
        </div>
      </section>

      <section className="about-practice">
        <div className="about-practice__image reveal"><CareerPoster /></div>
        <div className="about-practice__copy reveal"><h2>{text.about.practice}</h2><p>{text.about.bio}</p></div>
      </section>

      <section className="strengths-section">
        <div className="strengths-section__title reveal"><h2>{text.resume.strengthsLabel}</h2></div>
        <div className="strengths-list">
          {text.resume.strengths.map((strength) => (
            <article className="strength-item reveal" key={strength.title}>
              <h3>{strength.title}</h3><p>{strength.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <h2 className="reveal">{text.resume.experienceLabel}</h2>
        <div className="experience-list">
          {text.resume.experience.map((item) => (
            <article className="experience-row reveal" key={`${item.company}-${item.period}`}>
              <time>{item.period}</time>
              <div><h3>{item.company}</h3><strong>{item.role}</strong></div>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="credentials-section">
        <article className="education-panel reveal">
          <p>{text.resume.educationLabel}</p>
          <h2>{text.resume.education.school}</h2>
          <strong>{text.resume.education.meta}</strong>
          <div>{text.resume.education.body}</div>
        </article>
        <article className="certificate-panel reveal">
          <p>{text.resume.certificatesLabel}</p>
          <img src="/assets/jut-logo-black.png" alt={text.resume.education.logoAlt} loading="lazy" decoding="async" />
          <ul>{text.resume.certificates.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className="skills-section">
        <h2 className="reveal">{text.resume.skillsLabel}</h2>
        <div className="skills-layout">
          {text.resume.skills.map((skill) => (
            <article className="skill-block reveal" key={skill.title}><h3>{skill.title}</h3><p>{skill.body}</p></article>
          ))}
        </div>
      </section>

      <section className="facts-section">
        <div className="fact-block reveal"><span>{text.facts.tools}</span><p>Blender, Cinema 4D, Photoshop, Figma, After Effects, ComfyUI</p></div>
        <div className="fact-block reveal"><span>{text.facts.focus}</span><p>{text.facts.focusValue}</p></div>
        <div className="fact-block reveal"><span>{text.facts.availability}</span><p>{text.facts.status}</p></div>
      </section>

      <section className="about-quote"><p className="reveal">{text.about.quote}</p></section>
    </main>
  );
}
