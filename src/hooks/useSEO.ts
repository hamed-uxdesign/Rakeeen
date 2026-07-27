import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  schema?: any;
}

const DEFAULT_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hamed Walid",
  "jobTitle": "Product Builder",
  "url": "https://hamedwalid.com",
  "sameAs": [
    "https://www.linkedin.com/in/hamedwalidofficial",
    "https://www.behance.net/hamed-walid"
  ]
};

export const useSEO = ({ title, description, image, path, schema }: SEOProps) => {
  useEffect(() => {
    // If a title is provided by the caller, set a contextual tab title
    if (title) document.title = `${title} | Rakeeen`;
    
    // Manage Meta Description synchronously
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    const setOG = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (title) setOG('og:title', `${title} | Rakeeen`);
    if (description) setOG('og:description', description);
    if (image) setOG('og:image', image);
    if (path) setOG('og:url', `https://hamedwalid.com${path}`);

    // Knowledge Graph JSON-LD Schema
    const activeSchema = schema || DEFAULT_PERSON_SCHEMA;
    if (activeSchema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(activeSchema);
    }
  }, [title, description, image, path, schema]);
};
