import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Interceptor } from "./interceptors/interceptor.interceptor";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class SharedModule {}
