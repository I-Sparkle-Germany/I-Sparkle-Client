import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [FlexLayoutModule, CallToActionComponent, MatCardModule, StandaloneLogoComponent],
  standalone: true,
  styleUrl: './forgot-teacher.component.scss',
  templateUrl: './forgot-teacher.component.html'
})
export class ForgotTeacherComponent {}
