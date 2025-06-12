import { Component } from '@angular/core';
import { CallToActionComponent } from '../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [CallToActionComponent, MatCardModule, StandaloneLogoComponent],
  styleUrl: './forgot-home.component.scss',
  templateUrl: './forgot-home.component.html'
})
export class ForgotHomeComponent {}
