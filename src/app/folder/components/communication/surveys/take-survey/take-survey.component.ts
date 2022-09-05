import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/api/Auth/auth.service';
import { SurveyService } from 'src/app/services/api/survey/survey.service';
import { Survey, SurveyQuestionAnswerOption } from 'src/app/services/types/survey.types';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss'],
})
export class TakeSurveyComponent implements OnInit {

  survey: Survey;
  surveyId: number;
  answers: SurveyQuestionAnswerOption[] = [];
  constructor(
    private alertController: AlertController,
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this._activatedRoute.params.subscribe(params =>
      this.surveyId = params['id']
    )
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  onLogOut() {
    this._authService.signOut();
  }

  onNavigateToHome() {
    this._router.navigate(['home']);
  }

  onAddAnswer(answer: SurveyQuestionAnswerOption) {
    let answerForQuestionInList = this.answers.find(o => o.surveyQuestionId == answer.surveyQuestionId);

    if (answerForQuestionInList != null) {
      let index = this.answers.indexOf(answerForQuestionInList);
      if (index > -1) {
        this.answers.splice(index, 1); //Remove answer for question already slected.
      }
    }
    this.answers.push(answer);
  }

  onSubmit() {
    let isValid = true;
    if (this.answers.length == 0) {
      this.openSnackBar("Provide survey answers", "Error");
      isValid = false;
      return;
    }

    if (this.answers.length != this.survey.questions.length) {
      this.openSnackBar("Please answer all questions", "Error");
      isValid = false;
      return;
    }

    if (isValid) {
      let payload = {};
      payload['SurveyId'] = this.survey.id;
      payload['Responses'] = this.answers;

      this._surveyService.takeSurvey(payload)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
        }
        if (event.type === HttpEventType.Response) {
          this.openSnackBar("Take Survey", "Sucess");
          this._router.navigate(['folder/view-surveys']);
        }
      },
        error => {
          this.presentServerErrorAlert(error.error.message)
        });
    }
  }

  private _getDataFromServer() {
    this._surveyService.getSurvey(this.surveyId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Survey;
            this.survey = res as Survey;



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
