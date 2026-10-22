import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { siteContent } from './content.js';

export const ContentMD = ({ language, onSectionsLoaded }) => {
  const [activeModalImg, setActiveModalImg] = useState(null);

useEffect(() => {
    const navItems = siteContent.sections.map(section => ({
      id: section.id,
      // Prefer navTitle, fall back to main title
      title: section.navTitle?.[language] || section.title[language]
    }));
    onSectionsLoaded(navItems);
  }, [language, onSectionsLoaded]);

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="content-container">
      {siteContent.sections.map(section => (
        <section key={section.id} id={section.id}>
          <h2>{section.title[language]}</h2>
          {section.content && section.content[language] && (
            <Markdown>{section.content[language]}</Markdown>
          )}

          {/* Render array of images (Photo Grid) */}
          {Array.isArray(section.media) && (
            <div className="photo-grid">
              {section.media.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="photo-thumb-btn"
                  onClick={() => setActiveModalImg(item)}
                >
                  <img
                    src={item.src}
                    alt={item.alt[language]}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Render single legacy media object if needed */}
          {section.media && !Array.isArray(section.media) && (
            <div className="media-wrapper">
              {section.media.type === 'image' && (
                <img
                  src={section.media.src}
                  alt={section.media.alt[language]}
                  onClick={() => setActiveModalImg(section.media)}
                  className="clickable-single-image"
                />
              )}
              {section.media.type === 'video' && (
                <video controls width="100%">
                  <source src={section.media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </section>
      ))}

      {/* Lightbox / Modal */}
      {activeModalImg && (
        <div className="modal-backdrop" onClick={() => setActiveModalImg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalImg(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={activeModalImg.src}
              alt={activeModalImg.alt[language]}
              className="modal-image"
            />
            {activeModalImg.alt && (
              <p className="modal-caption">{activeModalImg.alt[language]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};