import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken:any=localStorage.getItem('etoken')
   if(localStorage.getItem('etoken')!=null){
    request=request.clone({
      setHeaders:{
        token:myToken
      }
    })
   }
    return next.handle(request);
  }
}
