import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

import { AuthService } from "../../admin/shared/services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthed()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      });
    }

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              login: true
            }
          });
        }
        return throwError(error);
      }));
  }
}
