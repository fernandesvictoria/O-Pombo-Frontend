import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "express";
import { catchError, throwError } from "rxjs";

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let authReq = req;

  if (typeof localStorage !== 'undefined') {
    const tokenUsuarioAutenticado = localStorage.getItem('tokenUsuarioAutenticado');
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