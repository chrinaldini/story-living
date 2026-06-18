import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'sl-header',
  imports: [RouterLink, LogoComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {}
