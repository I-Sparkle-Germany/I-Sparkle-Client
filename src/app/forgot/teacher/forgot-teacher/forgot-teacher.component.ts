import { Component } from '@angular/core';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [CallToActionComponent, StandaloneLogoComponent],
  styleUrl: './forgot-teacher.component.scss',
  templateUrl: './forgot-teacher.component.html'
})
export class ForgotTeacherComponent {}
