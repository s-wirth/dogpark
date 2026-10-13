import { useState, useEffect } from 'react'

import Markdown from 'react-markdown'
import contentGER from './main_content_ger.md'
import contentEN from './main_content_en.md'

export const ContentMD = ({language}) => {

  const renderContent = {
    'en': contentEN,
    'ger': contentGER  
  }

  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    fetch(renderContent[language]).then(res => res.text()).then(text => setDisplayText(text))
  }, [language])

  console.log('content file')
  console.log(language)
  console.log(renderContent[language])
  console.log(renderContent.language)
  return <div><Markdown>{displayText}</Markdown></div>
}