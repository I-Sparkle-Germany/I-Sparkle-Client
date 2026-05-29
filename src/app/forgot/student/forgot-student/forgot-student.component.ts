import { Component } from '@angular/core';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [CallToActionComponent, StandaloneLogoComponent],
  styleUrl: './forgot-student.component.scss',
  templateUrl: './forgot-student.component.html'
})
export class ForgotStudentComponent {}
