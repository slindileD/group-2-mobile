import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { BookingTypesService } from 'src/app/services/api/booking-types/booking-types.service';
import { BookingService } from 'src/app/services/api/booking/booking.service';
import { ProfileService } from 'src/app/services/api/profile/profile.service';
import { SlotService } from 'src/app/services/api/slots/slot.service';
import { BookingType } from 'src/app/services/types/booking-types';
import { Profile } from 'src/app/services/types/profile.types';
import { Slot, SlotTime } from 'src/app/services/types/slot.types';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.scss'],
})
export class MakeBookingComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  profile: Profile;
  bookingTypes: BookingType[] = [];
  slots: Slot[] = [];

  selectedDate: Slot;
  selectedTime: SlotTime;

  slotsAvailable: boolean = false;

  constructor(
    private alertController: AlertController,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _bookingService: BookingService,
    private _router: Router,
    private _authService: AuthService,
    private _bookingTypeService: BookingTypesService,
    private _slotService: SlotService
  ) {
  }

  ngOnInit() {
    this._getBookingTypesFromServer();
    this._getSlotsGroupedByDays();
  }

  onSubmit() {
    this.submitted = true;

    let payload: any = {}


    if (!this.form.valid) {
      return false;
    }
    else {


      if (this.form.valid) {
        if (this.selectedTime == null) {
          this._openSnackBar("Select Slot", "Error", 3000);
        }
        else {
          payload["Name"] = this.Name.value;
          payload["BookingTypeId"] = this.BookingTypeId.value;
          payload["SlotId"] = this.selectedTime.slotId;

          /**
           * TODO
           * Send to server
           * Redirect to list of bookings after sucess
           */

          this._bookingService.makeBooking(payload)
            .subscribe(event => {
              if (event.type === HttpEventType.Sent) {
              }
              if (event.type === HttpEventType.Response) {
                this._openSnackBar("Make booking", "Sucess", 3000);
                this._router.navigate(['folder/list-bookings']);
              }
            },
              error => {
                this.presentServerErrorAlert(error.error.message)
              });
        }
      }

    }
  }

  onSlotSelected(sloTtime: SlotTime, slot: Slot) {
    this.selectedDate = slot;
    this.selectedTime = sloTtime;
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

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  onLogOut() {
    this._authService.signOut();
  }

  private _getSlotsGroupedByDays() {
    this._slotService.getAllGroupedByDays()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Slot[];
            this.slots = res;

            //Check if we have available slots
            this.slots.forEach(slot => {
              if (slot.slots.length > 0) {
                this.slotsAvailable = true;
              }
            });
          }
        },
        error: (error) => {

        },
        complete: () => {

        }
      });
  }

  private _getBookingTypesFromServer() {
    this._bookingTypeService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as BookingType[];
            this.bookingTypes = res;
            this.buildForm(this._formBuilder);

          }
        },
        error: (error) => {

        },
        complete: () => {

        }
      });
  }

  private buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: ['', [Validators.required]],
      BookingTypeId: ['', [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
  get BookingTypeId() { return this.form.get('BookingTypeId'); }

  get errorCtr() { return this.form.controls; }

  private getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
