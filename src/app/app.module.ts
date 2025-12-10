import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QrCodeComponent } from './_shared/components/qr-code/qr-code.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnerLayoutsComponent } from './layouts/inner-layouts/inner-layouts.component';
import { OuterLayoutsComponent } from './layouts/outer-layouts/outer-layouts.component';
import { UserHeaderComponent } from './layouts/user-header/user-header.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CommonModule } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    InnerLayoutsComponent,
    OuterLayoutsComponent,
    LandingComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    QrCodeComponent,
    UserHeaderComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }