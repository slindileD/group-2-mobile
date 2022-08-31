import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApplicationsService } from 'src/app/services/api/applications/applications.service';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { ChildService } from 'src/app/services/api/child/child.service';
import { ProfileService } from 'src/app/services/api/profile/profile.service';
import { Application } from 'src/app/services/types/application.types';
import { IdNumberValidator } from 'src/app/validators/idnumber.validator'

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  application: Application;
  constructor(
    private alertController: AlertController,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _childService: ChildService,
    private _applicationsService: ApplicationsService,
    private _authService: AuthService,
    private _router: Router

  ) {
    this._getRecentApplicationFromServer();
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
        console.log(this.form.value);

        payload["Gender"] = this.Gender.value;
        payload["ApplicationId"] = this.application.application_ID;
        payload["PostalCode"] = this.ZipCode.value;
        payload["AddressLine1"] = this.AddressLine1.value;
        payload["AddressLine2"] = this.AddressLine2.value;
        payload["City"] = this.City.value;
        payload["PostalCode"] = this.ZipCode.value;

        this._childService.add(payload)
          .subscribe(event => {
            if (event.type === HttpEventType.Sent) {
            }
            if (event.type === HttpEventType.Response) {
              this._openSnackBar("Child Added", "Sucess", 3000);
              this._router.navigate(['folder/view-child-details']);
            }
          },
            error => {
              console.log(error);
              this.presentServerErrorAlert(error.error.message)
            });
      }
    }
  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  private _getRecentApplicationFromServer() {
    this._applicationsService.getRecentByUserName()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Application;
            this.application = res;
            console.log(res);
            this.buildForm(this._formBuilder);
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

  private buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: [this.application.childName, [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      Surname: [this.application.childSurname, [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      IdentityType: ['', [Validators.required]],
      SAIDNumber: ['', [Validators.required, Validators.pattern, IdNumberValidator.saIdValidator]],
      PassportNumber: ['', [Validators.required]],
      DateOfBirth: [this.application.childDateOfBirth, [Validators.required]],
      Gender: ['', [Validators.required]],

      AddressLine1: ['', [Validators.required, Validators.maxLength(50)]],
      AddressLine2: ['', [Validators.required, Validators.maxLength(50)]],
      City: ['', [Validators.required, Validators.maxLength(50)]],
      ZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });

    //Disable fields that contain data from db
    this.Name.disable();
    this.Surname.disable();
    this.DateOfBirth.disable();
  }

  get Name() { return this.form.get('Name'); }
  get Surname() { return this.form.get('Surname'); }
  get IdentityType() { return this.form.get('IdentityType'); }
  get SAIDNumber() { return this.form.get('SAIDNumber'); }
  get PassportNumber() { return this.form.get('PassportNumber'); }
  get DateOfBirth() { return this.form.get('DateOfBirth'); }
  get Gender() { return this.form.get('Gender'); }
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

  //TODO: move this method out of here
  nonEmptyName (control : FormControl) : ValidationErrors|null {
    if (control.value.trim() == "") {
      let resp = {
        'required' : true //TODO: stop overloading this validation error name
      };
      return resp;
    }
    return null;
  }
}
