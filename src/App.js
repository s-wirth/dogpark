import { useState } from 'react'
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
        <nav>
          <button onClick={changeLanguage}>Language</button>
        </nav>
        <div className="content">
          <ContentMD language={language} />
        </div>
    </div>
  );
}

export default App;
