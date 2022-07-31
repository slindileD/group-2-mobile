import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { ProfileService } from 'src/app/services/api/profile/profile.service';
import { Profile } from 'src/app/services/types/profile.types';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  profile: Profile;
  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._getProfileFromServer();
  }

  private _getProfileFromServer() {
    this._profileService.getByParentEmailAddress()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Profile;
            this.profile = res;
          }
        },
        error: (error) => {
        },
        complete: () => {
        }
      });
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  onNavigateToEdit() {
    this._router.navigate(['folder', 'update-profile'])
  }
}
