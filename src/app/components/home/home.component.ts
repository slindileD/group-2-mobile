import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  tokenRefreshed = false;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  private _getRefreshedToken() {
    this.tokenRefreshed = false;
    this._authService.refreshToken()
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
        }
        if (event.type === HttpEventType.Response) {
          this.tokenRefreshed = true;
          localStorage.setItem('token', event.body['token']);
        }
      },
        error => {
          this._openSnackBar(error.error.message, "Error", 3000);
        });
  }


  onNavigateToCreateProfile() {
    this._getRefreshedToken();

    if (this._authService.currentUser.HasProfile.toLowerCase() == 'Yes'.toLowerCase()) {
      this._router.navigate(['folder/view-profile']); //navigate to view profile if already created
    }
    else {
      this._router.navigate(['folder/create-profile']); //create profile if not yet created
    }

  }

  onNavigateToChildProfile() {
    this._getRefreshedToken();

    if (this._authService.currentUser.HasChild.toLowerCase() == 'Yes'.toLowerCase()) {
      this._router.navigate(['folder/view-child-details']);
    }
    else {
      this._router.navigate(['folder/add-child']); //add child if not yet addded
    }

  }

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
    });
  }


  onLogOut() {
    this._authService.signOut();
  }
}
