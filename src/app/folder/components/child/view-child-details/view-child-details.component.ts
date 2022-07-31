import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { ChildService } from 'src/app/services/api/child/child.service';
import { Child } from 'src/app/services/types/child.types';


@Component({
  selector: 'app-view-child-details',
  templateUrl: './view-child-details.component.html',
  styleUrls: ['./view-child-details.component.scss'],
})
export class ViewChildDetailsComponent implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  urlSuffix = "http://localhost:4200/";
  routingSuffix = 'capture-attendance/';
  captureAttendanceLink = this.urlSuffix.concat(this.routingSuffix);

  value = "";

  child: Child;
  constructor(
    private _childService: ChildService,
    private _authService:AuthService,
    private _router:Router
  ) {


  }

  ngOnInit(): void {
    this._getChildFromServer();
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

            this.value = this.captureAttendanceLink + this.child.id;
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

  onNavigateToEdit() {
    this._router.navigate(['folder', 'update-child'])
  }


  public downloadQRCode() {
    const fileNameToDownload = this.child.name + '_' + this.child.surname + '_qrcode';
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameToDownload;
        link.click();
      })
  }

}
