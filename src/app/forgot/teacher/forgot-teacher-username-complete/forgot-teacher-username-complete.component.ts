import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  templateUrl: './forgot-teacher-username-complete.component.html',
  styleUrl: './forgot-teacher-username-complete.component.scss',
  imports: [MatAnchor, MatButtonModule, MatCardModule, RouterLink, StandaloneLogoComponent]
})
export class ForgotTeacherUsernameCompleteComponent {}
