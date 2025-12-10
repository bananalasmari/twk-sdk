import { Component, Inject, Renderer2 } from '@angular/core';
import { UserService } from '../../_shared/services/user-service.service';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-header',
  standalone: false,
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {
  userFullName: string = 'عبدالله القحطاني';
  currentLang: 'ar' | 'en' = 'ar';

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchUserFullName();
    const activeLang = (this.translate.currentLang as 'ar' | 'en') || 'ar';
    this.currentLang = activeLang;
    this.applyDirection(activeLang);
  }

  fetchUserFullName(): void {
    this.userService.getUserFullName()
      .then((name) => {
        this.userFullName = name;
      })
      .catch((error) => {
        console.error('Error fetching user full name:', error);
      });
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
