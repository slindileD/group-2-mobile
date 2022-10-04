import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { BlogService } from 'src/app/services/api/blog/blog.service';
import { DocucumentsService } from 'src/app/services/api/documents/docucuments.service';
import { Blog } from 'src/app/services/types/blog.types';
import { DocumentDoc } from 'src/app/services/types/document.types';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.scss'],
})
export class ListDocumentsComponent implements OnInit {

  documents: DocumentDoc[] = [];
  document: DocumentDoc;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _documentsService: DocucumentsService,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home'])
  }

  private _getDataFromServer() {
    this._documentsService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as DocumentDoc[];
            this.documents = res as DocumentDoc[];
          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, "Error");
        },
        complete: () => {
        }
      });
  }

  onDownloadRequestedPaper(requestedPaper: DocumentDoc) {
    this._documentsService.downloadDocument(requestedPaper.id)
      .subscribe(res => {
        if (res.type === HttpEventType.Response) {
          var url = window.URL.createObjectURL(res.body);
          window.open(url, "_blank");
        }
      },
        error => {
          this.openSnackBar(error.error.message, "Error!");
        });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }
}
