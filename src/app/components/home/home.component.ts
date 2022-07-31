import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() { }


  onNavigateToCreateProfile() {
    if (this._authService.currentUser.HasProfile.toLowerCase() == 'Yes'.toLowerCase()) {
      this._router.navigate(['folder/view-profile']); //navigate to view profile if already created
    }
    else {
      this._router.navigate(['folder/create-profile']); //create profile if not yet created
    }

  }

  onNavigateToChildProfile() {
    if (this._authService.currentUser.HasProfile.toLowerCase() == 'Yes'.toLowerCase()) {

      if (this._authService.currentUser.HasChild.toLowerCase() == 'Yes'.toLowerCase()) {
        this._router.navigate(['folder/view-child-details']);
      }
      else {
        this._router.navigate(['folder/add-child']); //add child if not yet addded
      }
    }
    else {
      this._router.navigate(['folder/create-profile']); //create profile if not yet created
    }
  }

  onLogOut() {
    this._authService.signOut();
  }
}
