import { Component } from '@angular/core';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [CallToActionComponent, MatCardModule, StandaloneLogoComponent],
  styleUrl: './forgot-student.component.scss',
  templateUrl: './forgot-student.component.html'
})
export class ForgotStudentComponent {}
