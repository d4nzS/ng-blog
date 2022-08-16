import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { environment } from "../../../../environments/environment";
import { FbAuthResponse, User } from "../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  public login(user: User): Observable<any> {
    user.returnSecureToken = true;

    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthed(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse) {
    if (response) {
      const expDate = new Date(Date.now() + +response.expiresIn * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
