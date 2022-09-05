import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { SurveyService } from 'src/app/services/api/survey/survey.service';
import { Survey } from 'src/app/services/types/survey.types';

@Component({
  selector: 'app-view-surveys',
  templateUrl: './view-surveys.component.html',
  styleUrls: ['./view-surveys.component.scss'],
})
export class ViewSurveysComponent implements OnInit {

  surveys: Survey[] = [];
  closedSurveys: Survey[] = [];
  upComingSurveys: Survey[] = [];
  openSurveys: Survey[] = [];
  survey: Survey;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService,
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

  onTakeSurvey(survey: Survey) {
    this._router.navigate(['folder', 'take-survey', survey.id])
  }


  private _getDataFromServer() {
    this._surveyService.getAllSurveys()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Survey[];
            this.surveys = res as Survey[];

            this.surveys.forEach(element => {
              if (element.status.toLowerCase() == 'Closed'.toLowerCase()) {
                this.closedSurveys.push(element);
              }
              if (element.status.toLowerCase() == 'Up Coming'.toLowerCase()) {
                this.upComingSurveys.push(element);
              }
              if (element.status.toLowerCase() == 'Open'.toLowerCase()) {
                this.openSurveys.push(element);
              }
            });

          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, "Error");
        },
        complete: () => {
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }
}
