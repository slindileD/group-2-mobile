import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() { }

  onNavigateToMakeBooking() {
    this._router.navigate(['folder/make-new-booking']);
  }

  onNavigateToListBookings(){
    this._router.navigate(['folder/list-bookings']);

  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  onLogOut() {
    this._authService.signOut();
  }

}
