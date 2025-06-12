import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [MatCardModule, StandaloneLogoComponent],
  templateUrl: './survey-completed.component.html',
  selector: 'survey-completed',
  styleUrl: './survey-completed.component.scss'
})
export class SurveyCompletedComponent {}
