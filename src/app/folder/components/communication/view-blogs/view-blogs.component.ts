import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { BlogService } from 'src/app/services/api/blog/blog.service';
import { Blog } from 'src/app/services/types/blog.types';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss'],
})
export class ViewBlogsComponent implements OnInit {

  blogs: Blog[] = [];
  blog: Blog;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _blogsService: BlogService,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  private _getDataFromServer() {
    this._blogsService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Blog[];
            this.blogs = res as Blog[];
          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, "Error");
        },
        complete: () => {
        }
      });
  }

  onViewBlog(blog:Blog) {
    this._router.navigate(['folder', 'read-blog', blog.id])
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }
}
