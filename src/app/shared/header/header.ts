import { Component, HostBinding, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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

  @HostBinding('class.scrolled')
  get isScrolled(): boolean {
    return this.scrolled();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  // Nav links point at real paths (/apartments, /contact, / …). When the home
  // page is already rendered we smooth-scroll to the section; otherwise we let
  // the router navigate to the home page, which then scrolls to it.
  onNav(event: MouseEvent, id: string): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();

    const homeRendered = !!document.getElementById('apartments');
    if (homeRendered) {
      if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigateByUrl(id === '' ? '/' : '/' + id);
    }
  }
}
