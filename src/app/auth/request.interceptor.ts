import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../shared/service/auth.service";
import { CookieService } from "ngx-cookie-service";

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  let authReq = req;

  if (cookieService) {
    const tokenUsuarioAutenticado = cookieService.get('tokenUsuarioAutenticado');

    if (tokenUsuarioAutenticado) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenUsuarioAutenticado}`
        },
      });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('tokenUsuarioAutenticado');
        }
        router.navigate(['']);
      }
      return throwError(() => error);
    })
  );
}