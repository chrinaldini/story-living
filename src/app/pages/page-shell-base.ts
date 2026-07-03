import { afterNextRender, Directive, HostListener, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { HOME_SECTIONS } from '../app.routes';
import { MEWS_CONFIG } from './booking/mews.config';

interface MewsGlobal {
  Mews?: {
    Distributor(
      options: { configurationIds: string[]; openElements?: string },
      callback?: unknown,
      settings?: { dataBaseUrl?: string }
    ): void;
  };
}

/**
 * Shared page-level behaviour for the two landing pages: hero parallax,
 * scroll-spy that keeps the URL in sync with the visible section, and
 * deep-link scrolling on first load. Each variant page extends this and
 * composes its own (fully separate) section components.
 */
@Directive()
export abstract class PageShellBase {
  private readonly location = inject(Location);

  readonly segment: 'family' | 'corporate';
  private readonly basePath: string;
  private currentSection = '';

  // Parallax offset (px) for the hero, passed down to the hero section.
  readonly heroOffset = signal(0);
  private scrollTicking = false;
  private readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    const parts = this.location.path().split(/[?#]/)[0].split('/').filter(Boolean);
    this.segment = parts[0] === 'corporate' ? 'corporate' : 'family';
    this.basePath = this.segment === 'corporate' ? '/corporate' : '';
    const initialSection = this.segment === 'corporate' ? (parts[1] ?? '') : (parts[0] ?? '');

    afterNextRender(() => {
      if (HOME_SECTIONS.includes(initialSection)) {
        this.currentSection = initialSection;
        this.deepLinkScroll(initialSection);
      }
      this.initMews();
    });
  }

  // Bind the Mews Distributor to every ".distributor-open" button on the page
  // (the booking CTA bands and the contact section's booking button).
  private initMews(): void {
    const mews = (window as MewsGlobal).Mews;
    if (!mews) return;
    mews.Distributor(
      { configurationIds: MEWS_CONFIG.configurationIds, openElements: '.distributor-open' },
      undefined,
      MEWS_CONFIG.dataBaseUrl ? { dataBaseUrl: MEWS_CONFIG.dataBaseUrl } : undefined
    );
  }

  // Scroll to a deep-linked section. Images and web fonts load after the first
  // render and shift the layout, so re-run the scroll as the page settles.
  private deepLinkScroll(id: string): void {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const scroll = () => document.getElementById(id)?.scrollIntoView();

    scroll();
    requestAnimationFrame(scroll);
    setTimeout(scroll, 250);
    setTimeout(scroll, 800);
    window.addEventListener('load', () => scroll(), { once: true });
    (document as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready?.then(() => scroll());
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      if (!this.reduceMotion) this.heroOffset.set(window.scrollY * 0.2);
      this.syncUrlToSection();
      this.scrollTicking = false;
    });
  }

  // Update the URL to the section under the header without router navigation.
  private syncUrlToSection(): void {
    const headerH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 96;

    let active = '';
    for (const id of HOME_SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= headerH + 8) active = id;
    }

    if (active !== this.currentSection) {
      this.currentSection = active;
      this.location.replaceState(this.basePath + (active ? '/' + active : '') || '/');
    }
  }
}
