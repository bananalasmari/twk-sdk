import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'assets/i18n',
    private suffix: string = '.json'
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      try {
        // Try different possible paths
        const possiblePaths = [
          join(process.cwd(), 'dist', 'bayan-twk', 'browser', this.prefix),
          join(process.cwd(), 'dist', 'my-angular-app', 'browser', this.prefix),
          join(process.cwd(), 'browser', this.prefix),
          join(process.cwd(), 'src', this.prefix)
        ];

        let assetsFolder = '';
        for (const path of possiblePaths) {
          if (existsSync(path)) {
            assetsFolder = path;
            break;
          }
        }

        if (!assetsFolder) {
          console.warn(`Translation file not found for lang: ${lang}. Tried paths:`, possiblePaths);
          observer.next({});
          observer.complete();
          return;
        }

        const filePath = `${assetsFolder}/${lang}${this.suffix}`;
        if (!existsSync(filePath)) {
          console.warn(`Translation file not found: ${filePath}`);
          observer.next({});
          observer.complete();
          return;
        }

        const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));
        observer.next(jsonData);
        observer.complete();
      } catch (error) {
        console.error(`Error loading translation file for ${lang}:`, error);
        observer.next({});
        observer.complete();
      }
    });
  }
}

export function translateServerLoaderFactory() {
  return new TranslateServerLoader();
}

