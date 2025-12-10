import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }
  
  private async initializeTheme(): Promise<void> {
    try {
      const appearance = await this.getAppearance();

      if (appearance === 1) {
        console.log('Light mode detected from TWK.');
        this.isDarkModeSubject.next(false);
      } else if (appearance === 2) {
        console.log('Dark mode detected from TWK.');
        this.isDarkModeSubject.next(true);
      } else {
        console.log('Fallback to light mode.');
        this.isDarkModeSubject.next(false);
      }
      this.applyTheme(this.isDarkModeSubject.value);
    } catch (error) {
      console.error('Error in initializing theme:', error);
      this.isDarkModeSubject.next(false); // Fallback to light mode
      this.applyTheme(false);
    }
  }

  private applyTheme(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }


  getAppearance(): Promise<number> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(1); // Return light mode as default for SSR
    }
    
    if (typeof TWK === 'undefined' || typeof TWK.getDeviceInfo !== 'function') {
      console.error('TWK is not defined or getDeviceInfo method is missing.');
      return Promise.reject(new Error('TWK is not available.'));
    }
    return TWK.getDeviceInfo()
      .then((response: any) => {
        if (response?.success && typeof response.result.appearance === 'number') {
          const appearance = response.result.appearance;
          if (appearance === 1) {
            console.log('Light mode detected.');
          } else if (appearance === 2) {
            console.log('Dark mode detected.');
          } else {
            throw new Error('Unexpected appearance value.');
          }
          return appearance; 
        } else {
          throw new Error('Invalid response format or missing appearance data.');
        }
      })
      .catch((error) => {
        console.error('Error fetching appearance setting:', error);
        throw new Error('Failed to fetch appearance setting.');
      });
  }
}
