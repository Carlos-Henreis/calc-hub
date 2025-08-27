import { Injectable, Inject, Optional } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { InjectionToken } from '@angular/core';
export const ORIGIN_URL = new InjectionToken<string>('ORIGIN_URL');

export type SeoRouteData = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string; // ex: '/saude/imc'
  ogImage?: string;       // URL absoluta
  schema?: 'software' | 'webpage' | 'article' | null;
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly SITE = {
    name: 'Calculadoras Online',
    defaultImage: 'https://www.hubcalc.cahenre.com/assets/og-default.png',
    twitter: '@seu_usuario'
  };

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
    @Optional() @Inject(ORIGIN_URL) private originUrl?: string, // vem do provider acima
  ) {}

  apply(data: SeoRouteData) {
    const origin = this.originUrl || 'https://www.hubcalc.cahenre.com';
    const path   = data.canonicalPath ?? this.doc.location?.pathname ?? '/';
    const url    = new URL(path, origin).toString();

    const fullTitle = `${data.title} | ${this.SITE.name}`;
    const desc  = (data.description || '').slice(0, 160);
    const image = data.ogImage || this.SITE.defaultImage;

    // Title
    this.title.setTitle(fullTitle);

    // Meta básicos
    this.setTag('description', desc);
    this.setTag('keywords', (data.keywords ?? []).join(', '));

    // Canonical
    this.setCanonical(url);

    // Open Graph
    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', this.SITE.name);
    this.setProperty('og:title', fullTitle);
    this.setProperty('og:description', desc);
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);

    // Twitter
    this.setTag('twitter:card', 'summary_large_image');
    this.setTag('twitter:site', this.SITE.twitter);
    this.setTag('twitter:title', fullTitle);
    this.setTag('twitter:description', desc);
    this.setTag('twitter:image', image);

    // JSON-LD
    this.setJsonLd(this.buildJsonLd(data, url, image));
  }

  // ------- helpers -------
  private setTag(name: string, content?: string) {
    if (!content) { this.meta.removeTag(`name="${name}"`); return; }
    this.meta.updateTag({ name, content });
  }
  private setProperty(property: string, content?: string) {
    if (!content) { this.meta.removeTag(`property="${property}"`); return; }
    this.meta.updateTag({ property, content });
  }
  private setCanonical(href: string) {
    let link = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
  private setJsonLd(json: object | null) {
    this.doc.querySelectorAll('script[type="application/ld+json"].route-jsonld').forEach(n => n.remove());
    if (!json) return;
    const s = this.doc.createElement('script');
    s.type = 'application/ld+json';
    s.classList.add('route-jsonld');
    s.text = JSON.stringify(json);
    this.doc.head.appendChild(s);
  }

  private buildJsonLd(data: SeoRouteData, url: string, image: string) {
    switch (data.schema ?? 'webpage') {
      case 'software':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: data.title,
          applicationCategory: 'Calculator',
          operatingSystem: 'Web',
          url, image,
          description: data.description,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
          publisher: { '@type': 'Organization', name: this.SITE.name }
        };
      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          mainEntityOfPage: url,
          image
        };
      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data.title,
          url,
          description: data.description,
          image
        };
    }
  }
}
