import { Component, HostBinding, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'sl-header',
  imports: [RouterLink, LogoComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly scrolled = signal(false);

  @HostBinding('class.scrolled')
  get isScrolled(): boolean {
    return this.scrolled();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
