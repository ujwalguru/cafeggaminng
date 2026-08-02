import { useEffect } from 'react';

export interface DocumentMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_IMAGE = '/airavoto-demo-screenshot.png';

/**
 * Sets document title + meta description/OG/Twitter tags per-route.
 * Runs client-side via effect since this SPA has no server-side rendering.
 */
export function useDocumentMeta({ title, description, image = DEFAULT_IMAGE, type = 'website' }: DocumentMeta) {
  useEffect(() => {
    document.title = title;

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

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
  }, [title, description, image, type]);
}
