import { useEffect } from 'react'
import Markdown from 'react-markdown'
import { siteContent } from './content.js'

export const ContentMD = ({ language, onSectionsLoaded }) => {
  
  useEffect(() => {
    const navItems = siteContent.sections.map(section => ({
      id: section.id,
      title: section.title[language]
    }));
    onSectionsLoaded(navItems);
  }, [language, onSectionsLoaded]);

  return (
    <div className="content-container">
      {siteContent.sections.map(section => (
        <section key={section.id} id={section.id} style={{ marginBottom: '3rem' }}>
          <h2>{section.title[language]}</h2>
          <Markdown>{section.content[language]}</Markdown>

          {/* Render media if it exists for this section */}
          {section.media && (
            <div className="media-wrapper" style={{ marginTop: '1rem' }}>
              {section.media.type === 'image' && (
                <img 
                  src={section.media.src} 
                  alt={section.media.alt[language]} 
                  style={{ maxWidth: '100px', borderRadius: '8px' }}
                />
              )}
              {section.media.type === 'video' && (
                <video controls width="100%" style={{ borderRadius: '8px' }}>
                  <source src={section.media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}