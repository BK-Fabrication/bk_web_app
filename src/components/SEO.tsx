import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'BK Fabrication - Medical Equipment & Hospital Furniture Manufacturer',
  description = 'Direct manufacturer of ICU beds, hospital ward furniture, emergency crash carts, medical trolleys, and surgical equipment in India with wholesale factory rates.',
  canonical,
  ogType = 'website',
  ogImage = '/img/hero.png',
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard metadata
    setMeta('description', description);

    // OpenGraph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    if (ogImage) {
      const fullImg = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      setMeta('og:image', fullImg, true);
    }
    const currentUrl = canonical || window.location.href;
    setMeta('og:url', currentUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (ogImage) {
      const fullImg = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      setMeta('twitter:image', fullImg);
    }

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // JSON-LD Structured Data
    const scriptId = 'json-ld-schema';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = scriptId;
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
      }
      scriptElem.textContent = JSON.stringify(schema);
    } else if (scriptElem) {
      scriptElem.remove();
    }
  }, [title, description, canonical, ogType, ogImage, schema]);

  return null;
};

