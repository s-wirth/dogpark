import { useState, useEffect } from 'react'
import './App.css';
import {ContentMD} from './pageContent.js'
const LANGUAGES = ['en', 'ger']
function App() {
  const [language, setLanguage] = useState(LANGUAGES[0])
  
  function changeLanguage() { 
    if(language === LANGUAGES[0]) {
      setLanguage(LANGUAGES[1])
    } else {
      setLanguage(LANGUAGES[0])
    }
  }

  console.log(language)

  return (
    <div className="App">
      <header className="App-header">
        <p>{language}</p>
        <button onClick={changeLanguage}>Language</button>
        <ContentMD language={language} />
      </header>
    </div>
  );
}

export default App;
