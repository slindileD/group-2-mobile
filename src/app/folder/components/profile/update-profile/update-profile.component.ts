import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { ProfileService } from 'src/app/services/api/profile/profile.service';
import { Profile } from 'src/app/services/types/profile.types';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  profile: Profile;

  constructor(
    private alertController: AlertController,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit() {
    this._getProfileFromServer();
  }

  onSubmit() {
    this.submitted = true;

    let payload: any = {}
    // if (this.IdentityType.value === 'SA ID') {
    //   this.PassportNumber.setValue('EMPTY');
    //   payload["PassportOrSAIDNumber"] = this.SAIDNumber.value;
    // }
    // if (this.IdentityType.value === 'Passport') {
    //   payload["PassportOrSAIDNumber"] = this.PassportNumber.value;
    //   this.SAIDNumber.setValue('EMPTY');
    // }

    if (!this.form.valid) {
      this.getFormValidationErrors(this.form)
      return false;;
    } else {

      if (this.form.valid) {
        payload["Name"] = this.Name.value;
        payload["Surname"] = this.Surname.value;
        // payload["ContactNumber"] = this.ContactNumber.value;
        // payload["Title"] = this.Title.value;
        // payload["ParentRelationship"] = this.ParentRelationship.value;
        payload["AddressLine1"] = this.AddressLine1.value;
        payload["AddressLine2"] = this.AddressLine2.value;
        payload["City"] = this.City.value;
        payload["ZipCode"] = this.ZipCode.value;
        payload["ParentId"] = this.profile.parent_ID;
        payload["Name"] = this.Name.value;
        payload["Surname"] = this.Surname.value;
        payload["Title"] = this.Title.value;
        payload["ContactNumber"] = this.ContactNumber.value;

        this._profileService.updateByProfileHolder(payload)
          .subscribe(event => {
            if (event.type === HttpEventType.Sent) {
            }
            if (event.type === HttpEventType.Response) {

              this._openSnackBar("Profile Updated", "Sucess", 3000);
              this._router.navigate(['folder/view-profile']);
            }
          },
            error => {
              this.presentServerErrorAlert(error.error.message)
            });
      }
    }
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

  private _getProfileFromServer() {
    this._profileService.getByParentEmailAddress()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Profile;
            this.profile = res;
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
      Name: [this.profile.name, [Validators.required]],
      Surname: [this.profile.surname, [Validators.required]],
      ContactNumber: [this.profile.contactNumber, [Validators.required]],
      // IdentityNumber: [this.profile.passportOrSAIDNumber, [Validators.required]],
      Title: [this.profile.title, [Validators.required]],
      // ParentRelationship: [this.profile.parentRelationship, [Validators.required]],

      AddressLine1: [this.profile.addressLine1, [Validators.required]],
      AddressLine2: [this.profile.addressLine2, [Validators.required]],
      City: [this.profile.city, [Validators.required]],
      ZipCode: [this.profile.zipCode, [Validators.required]],
    });

    //Disable fields not supposed to be updated by profile holderk
    // this.Name.disable();
    // this.Surname.disable();
    // this.ContactNumber.disable();
    // this.IdentityNumber.disable();
    // this.Title.disable();
    // this.ParentRelationship.disable();
  }

  get Name() { return this.form.get('Name'); }
  get Surname() { return this.form.get('Surname'); }
  get ContactNumber() { return this.form.get('ContactNumber'); }
  // get IdentityNumber() { return this.form.get('IdentityNumber'); }
  get Title() { return this.form.get('Title'); }
  // get ParentRelationship() { return this.form.get('ParentRelationship'); }

  get AddressLine1() { return this.form.get('AddressLine1'); }
  get AddressLine2() { return this.form.get('AddressLine2'); }
  get City() { return this.form.get('City'); }
  get ZipCode() { return this.form.get('ZipCode'); }

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
