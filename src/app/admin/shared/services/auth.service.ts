import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";

import { environment } from "../../../../environments/environment";
import { FbAuthResponse, User } from "../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return;
    }

    return localStorage.getItem('fb-token');
  }

  public login(user: User): Observable<FbAuthResponse> {
    user.returnSecureToken = true;

    return this.http
      .post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthed(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error.next('EMAIL IS NOT FOUND');
        break;
      case 'INVALID_PASSWORD':
        this.error.next('INCORRECT PASSWORD!');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(Date.now() + +response.expiresIn * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
