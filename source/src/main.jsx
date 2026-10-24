import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { animate, createScope, stagger } from 'animejs';
import { profile, projects } from './content';
import { translations } from './translations';
import './styles.css';

const Locale = createContext(translations.en);
const Arrow = () => <span aria-hidden="true">↗</span>;
const safeURL = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
function External({ href, children, ...props }) {
  const t = useContext(Locale), url = safeURL(href);
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" {...props}>{children}<span className="sr-only">{t.newTab}</span></a> : null;
}

function App() {
  const root = useRef(null);
  const [language, setLanguage] = useState(() => { try { return localStorage.getItem('mf-language') === 'pt' ? 'pt' : 'en'; } catch { return 'en'; } });
  const [motionOff, setMotionOff] = useState(false);
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('');
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta);
    try { localStorage.setItem('mf-language', language); } catch { /* Optional storage: offline use still works. */ }
    setStatus('');
  }, [language, t]);

  useEffect(() => {
    const scope = createScope({ root, mediaQueries: { reduced: '(prefers-reduced-motion: reduce)' } }).add(self => {
      if (self.matches.reduced || motionOff) return;
      animate('.intro-in', { opacity: [0, 1], y: [16, 0], duration: 750, delay: stagger(95), ease: 'out(3)' });
      animate('.orbit-art', { opacity: [0, 1], scale: [.96, 1], duration: 1200, ease: 'out(3)' });
    });
    return () => scope.revert();
  }, [motionOff]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setStatus(t.copied); }
    catch { setStatus(`${t.copyFallback} ${profile.email}`); }
  }
  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  return <Locale.Provider value={t}><div ref={root} data-language={language}>
    <a className="skip" href="#main">{t.skip}</a>
    <header className="header wrap">
      <a className="wordmark" href="#home" aria-label={t.home}>mf<span>.</span></a>
      <div className="header-actions"><nav aria-label={t.nav}><a href="#work">{t.work}</a><a href="#about">{t.about}</a><a href="#contact">{t.contact} <Arrow/></a></nav>
        <button className="language-toggle" onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')} aria-label={t.switchLabel} lang={language === 'en' ? 'pt-BR' : 'en'}><span aria-hidden="true">◎</span> {t.switch}</button>
      </div>
    </header>
    <main id="main" tabIndex={-1}>
      <section id="home" className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow intro-in"><span className="tiny-line"/> MURILO FREITAS</p>
          <h1 id="hero-title" className="intro-in">{t.headline}<br/>{t.headlineSecond} <span className="purple">{t.headlineAccent}</span></h1>
          <p className="hero-description intro-in">{t.intro}</p>
          <div className="hero-actions intro-in"><a className="button primary" href="#work">{t.explore} <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">{t.touch} <Arrow/></a></div>
          <p className="focus-line intro-in">{t.web.toUpperCase()} <span>/</span> {t.python.toUpperCase()}</p>
        </div>
        <div className="orbit-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orb-core"><span>&lt;mf /&gt;</span></div><div className="orbit-dot"/><span className="art-caption">{t.art}</span></div>
        <div className="hero-bottom"><span>React. JavaScript. Python.</span><a href="#work">{t.scroll} <span aria-hidden="true">↓</span></a></div>
      </section>
      <section id="work" className="section wrap" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">{t.workLabel}</p><h2 id="work-title">{t.workTitle}<span className="purple">.</span></h2></div><p>{t.workIntro}<br/>{t.workIntroSecond}</p></div>
        <div className="filters" role="group" aria-label={t.filters}>{['all', ...new Set(projects.map(p => p.category))].map(f => <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>{t[f]}</button>)}</div>
        <div className="project-grid" aria-live="polite">{visible.map(p => { const copy = p[language]; return <article className="project" key={p.id}>
          <div className={`project-visual ${p.visual !== 'web' ? 'automation' : ''}`} aria-hidden="true">
            {p.visual === 'web' ? <div className="browser-sketch"><div className="browser-top"><i/><i/><i/></div><div className="sketch-body"><span/><strong/><em/><em/><b/></div></div> : p.visual === 'python' ? <div className="flow-sketch"><span>input</span><b>→</b><span className="flow-code">.py</span><b>→</b><span>output</span></div> : <div className="desktop-sketch"><span>C#</span><div className="keypad">{Array.from({length:9},(_,i)=><i key={i}/>)}</div></div>}
            <span className="visual-label">{t.illustration}</span>
          </div>
          <div className="project-meta"><span>{t[p.category]}</span><span>{copy.status}</span></div><h3>{copy.title || p.title}</h3><p>{copy.description}</p>
          <details className="project-details"><summary>{t.details}</summary><p>{copy.details}</p></details>
          <div className="project-footer"><div className="tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-links"><External href={p.demo}>{t.demo} <Arrow/></External><External href={p.source}>{p.backend ? t.frontend : t.source} <Arrow/></External><External href={p.backend}>{t.backend} <Arrow/></External></div></div>
        </article>; })}</div>
        <External href={profile.github} className="more-projects">{t.more} <Arrow/></External>
      </section>
      <section id="about" className="section about wrap" aria-labelledby="about-title"><div><p className="eyebrow">{t.aboutLabel}</p><h2 id="about-title">{t.aboutFirst}<br/>{t.aboutSecond}<br/><span className="purple">{t.aboutAccent}</span></h2></div><div className="about-copy"><p>{t.bio}</p><section className="experience" aria-labelledby="experience-title"><div className="experience-heading"><p className="eyebrow" id="experience-title">{t.experience}</p><span className="current-role">{t.current}</span></div><h3>{t.role} <span aria-hidden="true">·</span> Romi</h3><p>{t.jobDescription}</p><div className="tags"><span>Python</span><span>Node.js</span><span>React</span><span>SQL</span></div></section><section className="education" aria-labelledby="education-title"><h3 id="education-title">{t.education}</h3><div className="education-item"><h4>{t.degree}</h4><p>{t.university}</p><p className="education-date">{t.degreeDate}</p></div><div className="education-item"><h4>{t.technical}</h4><p>{t.school}</p><p className="education-date">{t.technicalDate}</p></div><a className="resume-link" href={language === 'en' ? './murilo-freitas-resume-en.pdf' : './curriculo-murilo-freitas.pdf'} download={language === 'en' ? 'Murilo_Freitas_Resume_EN_ATS.pdf' : 'Murilo_Freitas_Curriculo_ATS.pdf'} hrefLang={language === 'en' ? 'en' : 'pt-BR'}>{t.resume} <span aria-hidden="true">↓</span></a></section><div className="focus-row"><span>01</span><div><h3>{t.web}</h3><p>React & JavaScript</p></div><span aria-hidden="true">↗</span></div><div className="focus-row"><span>02</span><div><h3>{t.python}</h3><p>{t.workflows}</p></div><span aria-hidden="true">↗</span></div><p className="small-note">{t.aboutNote}</p></div></section>
      <section id="contact" className="section contact wrap" aria-labelledby="contact-title"><p className="eyebrow">{t.contactLabel}</p><h2 id="contact-title">{t.contactFirst}<br/>{t.contactSecond} <span className="purple">{t.contactAccent}</span></h2><p>{t.contactIntro}</p><a className="email-address" href={`mailto:${profile.email}`}>{profile.email}</a><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>{t.hello} <Arrow/></a><button className="text-link" onClick={copyEmail}>{t.copy}</button></div><div className="socials"><External href={profile.github}>GitHub <Arrow/></External><External href={profile.linkedin}>LinkedIn <Arrow/></External></div><p className="status" role="status">{status}</p></section>
    </main>
    <footer className="footer wrap"><a href="#home" className="wordmark" aria-label={t.back}>mf<span>.</span></a><span>© {new Date().getFullYear()} {profile.name}</span><button className="motion-toggle" onClick={()=>setMotionOff(!motionOff)} aria-pressed={motionOff}>{t.animations}: {motionOff ? t.off : t.system}</button><a href="#home">{t.back} ↑</a></footer>
  </div></Locale.Provider>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);



