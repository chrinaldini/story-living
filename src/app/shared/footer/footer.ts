import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'sl-footer',
  imports: [LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {}
