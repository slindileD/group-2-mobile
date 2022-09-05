import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';

@Component({
  selector: 'app-view-communications',
  templateUrl: './view-communications.component.html',
  styleUrls: ['./view-communications.component.scss'],
})
export class ViewCommunicationsComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() { }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToSurveys() {
    this._router.navigate(['folder/view-surveys'])
  }

}
