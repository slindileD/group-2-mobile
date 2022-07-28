import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/services/api/profile/profile.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(
    private alertController: AlertController,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.buildForm(this._formBuilder);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    let payload: any = {}
    if (this.IdentityType.value === 'SA ID') {
      this.PassportNumber.setValue('EMPTY');
      payload["PassportOrSAIDNumber"] = this.SAIDNumber.value;
    }
    if (this.IdentityType.value === 'Passport') {
      payload["PassportOrSAIDNumber"] = this.PassportNumber.value;
      this.SAIDNumber.setValue('EMPTY');
    }

    if (!this.form.valid) {
      this.getFormValidationErrors(this.form)
      return false;;
    } else {

      if (this.form.valid) {
        payload["Name"] = this.Name.value;
        payload["Surname"] = this.Surname.value;
        payload["ContactNumber"] = this.ContactNumber.value;
        payload["Title"] = this.Title.value;
        payload["ParentRelationship"] = this.ParentRelationship.value;
        payload["AddressLine1"] = this.AddressLine1.value;
        payload["AddressLine2"] = this.AddressLine2.value;
        payload["City"] = this.City.value;
        payload["ZipCode"] = this.ZipCode.value;

        this._profileService.create(payload)
          .subscribe(event => {
            if (event.type === HttpEventType.Sent) {
            }
            if (event.type === HttpEventType.Response) {

              this._openSnackBar("Profile Created", "Sucess", 3000);
              this._router.navigate(['folder/add-child']);

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

  private buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: ['', [Validators.required]],
      Surname: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      IdentityType: ['', [Validators.required]],
      SAIDNumber: ['', [Validators.required]],
      PassportNumber: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      ParentRelationship: ['', [Validators.required]],

      AddressLine1: ['', [Validators.required]],
      AddressLine2: [''],
      City: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
  get Surname() { return this.form.get('Surname'); }
  get ContactNumber() { return this.form.get('ContactNumber'); }
  get IdentityType() { return this.form.get('IdentityType'); }
  get SAIDNumber() { return this.form.get('SAIDNumber'); }
  get PassportNumber() { return this.form.get('PassportNumber'); }
  get Title() { return this.form.get('Title'); }
  get ParentRelationship() { return this.form.get('ParentRelationship'); }
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
