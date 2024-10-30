import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [CallToActionComponent, FlexLayoutModule, MatCardModule, StandaloneLogoComponent],
  standalone: true,
  styleUrl: './forgot-student.component.scss',
  templateUrl: './forgot-student.component.html'
})
export class ForgotStudentComponent {}
