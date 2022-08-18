import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, switchMap } from "rxjs";

import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public post: Post;
  public submitted = false;

  private uSub: Subscription;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
      return this.postService.getPostById(params['id']);
    })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        'title': new FormControl(post.title, Validators.required),
        'text': new FormControl(post.text, Validators.required)
      })
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.postService.updatePost({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => this.submitted = false);
  }
}
