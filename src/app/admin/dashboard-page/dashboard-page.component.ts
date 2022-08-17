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

  private gSub: Subscription;
  private dSub: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.gSub = this.postService.getAllPosts()
      .subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.gSub.unsubscribe();
    this.dSub.unsubscribe();
  }

  public onRemove(id: string): void {
    this.dSub = this.postService.deletePost(id)
      .subscribe(() => this.posts = this.posts.filter(post => post.id !== id));
  }
}
