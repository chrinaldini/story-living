import { Component, HostBinding, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'sl-header',
  imports: [LogoComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly scrolled = signal(false);

  // Mobile burger menu open/closed.
  readonly menuOpen = signal(false);

  // URL prefix for the current variant: '' for family/vacation, '/corporate' for corporate.
  readonly basePath = signal('');

  constructor() {
    this.updateBase(this.router.url);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.updateBase(e.urlAfterRedirects);
    });
  }

  private updateBase(url: string): void {
    const path = url.split(/[?#]/)[0];
    this.basePath.set(path === '/corporate' || path.startsWith('/corporate/') ? '/corporate' : '');
  }

  // The variant the switch button links to (the opposite of the current one).
  readonly other = () =>
    this.basePath() === '/corporate'
      ? { label: 'Vacation', path: '/', icon: 'beach_access' }
      : { label: 'Corporate', path: '/corporate', icon: 'business' };

  // Build a link within the current variant. id '' is the variant home.
  link(id: string): string {
    if (id === '') return this.basePath() || '/';
    return this.basePath() + '/' + id;
  }

  // Switch between the family/vacation and corporate variants (SPA navigation).
  switchVariant(event: MouseEvent): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    this.menuOpen.set(false);
    this.router.navigateByUrl(this.other().path);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  @HostBinding('class.scrolled')
  get isScrolled(): boolean {
    return this.scrolled();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  // Nav links point at real paths. When the home page is already rendered we
  // smooth-scroll to the section; otherwise the router navigates to it.
  onNav(event: MouseEvent, id: string): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();

    this.menuOpen.set(false);
    const homeRendered = !!document.getElementById('apartments');
    if (homeRendered) {
      if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigateByUrl(this.link(id));
    }
  }
}
