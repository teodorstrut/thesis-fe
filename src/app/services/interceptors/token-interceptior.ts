import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthorizationService } from '../authorization.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public constructor(private authorizationService: AuthorizationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import('rxjs').Observable<HttpEvent<any>> {
    if (req.url.search('/login') === -1 && req.url.search('/register') === -1) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authorizationService.getToken()}`,
        },
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}
