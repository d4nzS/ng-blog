import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

import { FbCreateResponse, Post } from "../interfaces";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  public create(post: Post): Observable<Post> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => ({
        ...post,
        id: response.name,
        date: new Date(post.date)
      })));
  }

  public getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => Object
        .keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      ))
  }
}
