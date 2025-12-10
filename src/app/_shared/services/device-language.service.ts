import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DeviceLanguageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async getDeviceInfo(): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return 'ar'; // Return default language for SSR
    }
    
    try {
      const ret = await TWK.getDeviceInfo();
      if (ret.success) {
        const currentLanguage = ret.result.app_language;
        console.log('Current Language:', currentLanguage);
        return currentLanguage;
      } else {
        // Handle specific error codes
        console.error('Error Code:', ret.code, 'Status:', ret.status);
        throw new Error(
          `Error Code: ${ret.code}, Status: ${ret.status}`
        );
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
