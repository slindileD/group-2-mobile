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
    this._router.navigate(['folder/create-profile']);
  }

  onNavigateToChildProfile() {
    this._router.navigate(['folder/view-child-details']);
  }

  onLogOut() {
    this._authService.signOut();
  }
}
