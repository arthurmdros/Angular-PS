import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpContextToken } from '@angular/common/http'
import { of, Observable} from 'rxjs'
import { tap } from 'rxjs/operators'

import { HttpCacheService } from './http-cache.service';

export const CACHEABLE = new HttpContextToken(() => true);

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.context.get(CACHEABLE)){
      return next.handle(req);
    }

    if(req.method !== 'GET'){
      console.log(`Cache inválido: ${req.method} ${req.url}`)
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    if (cachedResponse) {
      console.log(`Retornando o cache de resposta: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    return next.handle(req)
      .pipe(
        tap(event => {
          if(event instanceof HttpResponse){
            console.log(`Adicionando item para cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      )
  }

}
