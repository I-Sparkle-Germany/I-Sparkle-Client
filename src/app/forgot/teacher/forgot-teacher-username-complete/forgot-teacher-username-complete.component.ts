import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [MatCardModule, MatAnchor, MatButtonModule, RouterLink, StandaloneLogoComponent],
  templateUrl: './forgot-teacher-username-complete.component.html'
})
export class ForgotTeacherUsernameCompleteComponent {}
