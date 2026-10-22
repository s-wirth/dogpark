import { useState, useEffect } from 'react';
import './App.css';
import { ContentMD } from './pageContent.js';
import { siteContent } from './content.js';

const LANGUAGES = ['en', 'ger'];

function App() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [navLinks, setNavLinks] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState('');

  function changeLanguage() { 
    setLanguage(prev => prev === LANGUAGES[0] ? LANGUAGES[1] : LANGUAGES[0]);
  }

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        // Root margin offset accounts for the fixed 4rem navigation bar
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navLinks]);

  return (
    <div className="App">
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
          {navLinks.map(link => {
            const isActive = activeSectionId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                  onClick={() => setActiveSectionId(link.id)}
                >
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
        <button onClick={changeLanguage}>
          {language === 'en' ? siteContent.nav.ger : siteContent.nav.en}
        </button>
      </nav>
      
      <div className="content">
        <ContentMD language={language} onSectionsLoaded={setNavLinks} />
      </div>
    </div>
  );
}

export default App;