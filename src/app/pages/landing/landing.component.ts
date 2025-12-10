import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  private readonly installSnippet: string =
    '<script src="assets/js/twkhelper.js"></script>\n<script src="main.js" type="module"></script>';
  copySuccess = false;

  async copyInstallSnippet(): Promise<void> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.installSnippet);
      } else {
        const el = document.createElement('textarea');
        el.value = this.installSnippet;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    } catch (e) {
      console.error('Failed to copy snippet', e);
    }
  }
}



