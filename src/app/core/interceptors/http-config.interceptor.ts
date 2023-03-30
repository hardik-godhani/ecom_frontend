import { LocalStoreService } from './../services/local-store.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private localStore: LocalStoreService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let headers = request.headers;
    const userData = this.localStore.getUserData();
    if (userData && userData.token) {
      headers = headers.set('Authorization', 'Bearer ' + userData.token);
    }

    let clonedRequest = request.clone({ headers })

    return next.handle(clonedRequest);
  }
}
