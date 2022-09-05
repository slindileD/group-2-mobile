import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { BookingService } from 'src/app/services/api/booking/booking.service';
import { Booking } from 'src/app/services/types/booking.types';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.scss'],
})
export class ListBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  passedBookings: Booking[] = [];
  upcomingBookings: Booking[] = [];

  constructor(
    private _authService: AuthService,
    private _bookingService: BookingService,
    private _router: Router,
    private alertController: AlertController,
    private _snackBar: MatSnackBar
  ) {
    this._getBookingsFromServer();
  }

  ngOnInit() {
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  private _getBookingsFromServer() {
    this._bookingService.getAllByLoggedInUser()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Booking[];
            this.bookings = res;
            this.bookings.forEach(o=>{
              if(o.bookingStatus == 'Passed'){
                this.passedBookings.push(o)
              }
              if(o.bookingStatus == 'Upcoming'){
                this.upcomingBookings.push(o)
              }
            })
          }
        },
        error: (error) => {
          this.presentServerErrorAlert(error.error.message);
        },
        complete: () => {

        }
      });
  }

  onDeleteBooking(booking: Booking) {
    this._bookingService.delete(booking.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            this._openSnackBar("Booking Cancelled", "Success", 3000);
            location.reload();
          }
        },
        error: (error) => {
          this.presentServerErrorAlert(error.error.message);
        },
        complete: () => {

        }
      });
  }

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
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
