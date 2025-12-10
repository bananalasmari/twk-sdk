import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.setDefaultLang(this.currentLanguage); // Set default language
    
  }

  async ngOnInit(): Promise<void> {
    try {
      this.translate.use(this.currentLanguage); // Apply detected language
      this.setDirection(this.currentLanguage); // Set direction based on language
    } catch (error) {
      console.error('Failed to retrieve device language:', error);
      this.translate.use(this.currentLanguage); // Use fallback language if error
      this.setDirection(this.currentLanguage); // Set fallback direction
    }
  }

  private setDirection(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const direction = language === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', direction);
    }
  }
  
}

