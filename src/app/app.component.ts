import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bayan-twk';
  currentLanguage: string = 'ar'; // Default language
  currentYear: number = new Date().getFullYear();
  private publicLoaderHidden = false;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.setDefaultLang(this.currentLanguage); // Set default language
    
  }

  async ngOnInit(): Promise<void> {
    const fallbackTimer = isPlatformBrowser(this.platformId)
      ? window.setTimeout(() => this.hidePublicLoader(), 4000)
      : null;

    try {
      await firstValueFrom(this.translate.use(this.currentLanguage));
      this.setDirection(this.currentLanguage);
    } catch (error) {
      console.error('Failed to retrieve device language:', error);
      this.translate.use(this.currentLanguage);
      this.setDirection(this.currentLanguage);
    } finally {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      this.hidePublicLoader();
    }
  }

  private setDirection(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const direction = language === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', direction);
    }
  }

  private hidePublicLoader(): void {
    if (!isPlatformBrowser(this.platformId) || this.publicLoaderHidden) {
      return;
    }

    this.publicLoaderHidden = true;
    const loader = document.getElementById('public-loader');
    if (!loader) {
      return;
    }

    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 350);
  }
  
}

