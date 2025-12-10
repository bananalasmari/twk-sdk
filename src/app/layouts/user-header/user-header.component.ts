import { Component, Inject, Renderer2 } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {
  userFullName: string = 'عبدالله القحطاني';
  currentLang: 'ar' | 'en' = 'ar';

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const activeLang = (this.translate.currentLang as 'ar' | 'en') || 'ar';
    this.currentLang = activeLang;
    this.applyDirection(activeLang);
  }


  switchLanguage(lang: 'ar' | 'en'): void {
    if (this.currentLang === lang) {
      return;
    }
    this.currentLang = lang;
    this.translate.use(lang);
    this.applyDirection(lang);
  }

  private applyDirection(lang: 'ar' | 'en'): void {
    if (isPlatformBrowser(this.platformId)) {
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', dir);
    }
  }
}
