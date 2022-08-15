import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../../../shared/interfaces";

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
      .post('', user)
  }

  public logout() {

  }

  public isAuthed(): boolean {
    return !!this.token;
  }

  private setToken() {

  }
}
