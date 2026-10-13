import { useState, useEffect } from 'react'

import Markdown from 'react-markdown'
import contentGER from './main_content_ger.md'

export const ContentMD = () => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    fetch(contentGER).then(res => res.text()).then(text => setDisplayText(text))
  })
  console.log(displayText)
  return <div><Markdown>{displayText}</Markdown></div>
}