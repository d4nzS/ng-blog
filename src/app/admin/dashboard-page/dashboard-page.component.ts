import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public searchStr = '';

  private sub: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.sub = this.postService.getAll().subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  remove(id: string): void {

  }
}
