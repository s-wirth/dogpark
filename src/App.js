import { useState } from 'react'
import './App.css';
import { ContentMD } from './pageContent.js'
import { siteContent } from './content.js'

const LANGUAGES = ['en', 'ger']

function App() {
  const [language, setLanguage] = useState(LANGUAGES[0])
  const [navLinks, setNavLinks] = useState([])
  
  function changeLanguage() { 
    setLanguage(prev => prev === LANGUAGES[0] ? LANGUAGES[1] : LANGUAGES[0])
  }

  return (
    <div className="App">
        <nav >
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
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