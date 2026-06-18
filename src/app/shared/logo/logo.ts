import { Component, input } from '@angular/core';

@Component({
  selector: 'sl-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class LogoComponent {
  readonly onDark = input(false);
}
