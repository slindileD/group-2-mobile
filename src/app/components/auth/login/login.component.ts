import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/services/api/Auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  loading: any;

  constructor(
    private alertController: AlertController,

    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.buildForm(this._formBuilder);
  }

  onRegister() {
    this._router.navigate(['/tabs/account/register']);
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid) {
      return false;
    } else {

      if (this.form.valid) {
        this._authService.signIn(this.form.value)
          .subscribe(event => {
            if (event.type === HttpEventType.Sent) {
              // this.presentLoading(true);
            }
            if (event.type === HttpEventType.Response) {
              // this.presentLoading(false);
              localStorage.setItem('token', event.body['token']);
              this._router.navigate(['home'])
            }
          },
            error => {
              // this.presentLoading(false);
              this.presentServerErrorAlert(error.error.message)
            });
      }
    }
  }

  async presentLoading(start:boolean) {

    this.loading = await this._loadingCtrl.create({
      message: 'Loading ...',
    });
    if(start){
      return await this.loading.present();
    }
    if(start == false){
      return await this.loading.dismiss();
    }

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
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  get Username() { return this.form.get('Username'); }
  get Password() { return this.form.get('Password'); }
  get errorCtr() { return this.form.controls; }


}
