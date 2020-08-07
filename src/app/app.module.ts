import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared.module';
import { EnvService } from './env.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrHttpInterceptor } from './http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (envService: EnvService) => () => envService.init(),
    deps: [EnvService],
    multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastrHttpInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
  }
}
