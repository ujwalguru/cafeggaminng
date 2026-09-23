import { useEffect } from 'react';

export interface DocumentMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  imageAlt?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_IMAGE = '/airavoto-demo-screenshot.png';
const SITE_URL = 'https://airavotogaming.com';
const SITE_NAME = 'Airavoto Cafe';

/**
 * Sets document title + meta description/OG/Twitter tags per-route.
 * Runs client-side via effect since this SPA has no server-side rendering.
 */
export function useDocumentMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  imageAlt = 'Airavoto Cafe gaming café discovery platform',
  schema,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = `${SITE_URL}${url ?? window.location.pathname}`.replace(/([^:]\/)\/+/, '$1');
    const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) ?? [];
        if (attrName && attrValue) el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const setLink = (selector: string, rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(selector);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1');
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', absoluteImage);
    setMeta('meta[property="og:image:alt"]', 'content', imageAlt);
    setMeta('meta[property="og:locale"]', 'content', 'en_IN');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', absoluteImage);
    setMeta('meta[name="twitter:image:alt"]', 'content', imageAlt);
    setLink('link[rel="canonical"]', 'canonical', canonicalUrl);

    const pageSchema = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en-IN',
    };
    const graph = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Airavoto Gaming',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/airavoto-logo.png` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
      },
      pageSchema,
      ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
    ];
    let script = document.head.querySelector<HTMLScriptElement>('script[data-airavoto-schema]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.airavotoSchema = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }, [title, description, image, url, type, imageAlt, schema]);
}
