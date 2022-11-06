import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { AuthInterceptor } from "./_interceptors/auth.interceptor";
import { LoadingInterceptor } from "./_interceptors/loading.interceptor";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
