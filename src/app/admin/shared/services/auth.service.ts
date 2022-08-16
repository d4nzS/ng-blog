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
    return '';
  }

  public login(user: User): Observable<any> {
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  public logout() {

  }

  public isAuthed(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse) {
    console.log(response);
  }
}
