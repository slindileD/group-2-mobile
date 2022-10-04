import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { BlogService } from 'src/app/services/api/blog/blog.service';
import { Blog } from 'src/app/services/types/blog.types';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss'],
})
export class ReadBlogComponent implements OnInit {

  blog: Blog;
  blogId: number;
  constructor(
    private alertController: AlertController,
    private _matSnackBar: MatSnackBar,
    private _blogService: BlogService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this._activatedRoute.params.subscribe(params =>
      this.blogId = params['id']
    )
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home']);
  }

  private _getDataFromServer() {
    this._blogService.get(this.blogId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Blog;
            this.blog = res as Blog;
          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, "Error");
        },
        complete: () => {
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  async presentServerErrorAlert(erorMessage) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: erorMessage,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

}
