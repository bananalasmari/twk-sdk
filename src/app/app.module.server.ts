import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { translateServerLoaderFactory } from './translate-server.loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
