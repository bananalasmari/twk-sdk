import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { QRCodeModule } from 'angularx-qrcode';
import { LoaderComponent } from './_shared/loader/loader.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { InnerLayoutsComponent } from './layouts/inner-layouts/inner-layouts.component';
import { OuterLayoutsComponent } from './layouts/outer-layouts/outer-layouts.component';
import { UserHeaderComponent } from './layouts/user-header/user-header.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewCardsButtonComponent } from './pages/home/view-cards-button/view-cards-button.component';
import { CardViewComponent } from './pages/home/card-view/card-view.component';
import { DocuemntsListComponent } from './pages/docuemnts-list/docuemnts-list.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { QrCodeComponent } from '../app/_shared/components/qr-code/qr-code.component';
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
    UserHeaderComponent,
    HomeComponent,
    LandingComponent,
    DocumentationComponent,
    ViewCardsButtonComponent,
    CardViewComponent,
    DocuemntsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent,
    QrCodeComponent,
    CommonModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }