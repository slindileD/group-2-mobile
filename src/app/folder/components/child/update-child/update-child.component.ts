import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApplicationsService } from 'src/app/services/api/applications/applications.service';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { ChildService } from 'src/app/services/api/child/child.service';
import { Child } from 'src/app/services/types/child.types';

@Component({
  selector: 'app-update-child',
  templateUrl: './update-child.component.html',
  styleUrls: ['./update-child.component.scss'],
})
export class UpdateChildComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  child: Child;
  constructor(
    private alertController: AlertController,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _childService: ChildService,
    private _authService: AuthService,
    private _router: Router

  ) {
    this._getChildFromServer();
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;

    let payload: any = {}

    if (!this.form.valid) {
      this.getFormValidationErrors(this.form)
      return false;;
    } else {

      if (this.form.valid) {

        payload["Child_ID"] = this.child.id;
        payload["Child_Name"] = this.Name.value;
        payload["Child_Surname"] = this.Surname.value;
        payload["AddressLine1"] = this.AddressLine1.value;
        payload["AddressLine2"] = this.AddressLine2.value;
        payload["City"] = this.City.value;
        payload["PostalCode"] = this.ZipCode.value;

        this._childService.updateByParent(payload)
          .subscribe(event => {
            if (event.type === HttpEventType.Sent) {
            }
            if (event.type === HttpEventType.Response) {
              this._openSnackBar("Child Updated", "Sucess", 3000);
              this._router.navigate(['folder/view-child-details']);
            }
          },
            error => {
              this.presentServerErrorAlert(error.error.message)
            });
      }
    }
  }

  private _getChildFromServer() {
    this._childService.getByParentEmailAddress()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Child;
            this.child = res;
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

  onNavigateToHome() {
    this._router.navigate(['home'])
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
      Name: [this.child.name, [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      Surname: [this.child.surname, [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],

      AddressLine1: [this.child.addressLine1, [Validators.required, Validators.maxLength(50)]],
      AddressLine2: [this.child.addressLine2, [Validators.required, Validators.maxLength(50)]],
      City: [this.child.city, [Validators.required, Validators.maxLength(50)]],
      ZipCode: [this.child.postalCode, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });

  }

  get Name() { return this.form.get('Name'); }
  get Surname() { return this.form.get('Surname'); }
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
