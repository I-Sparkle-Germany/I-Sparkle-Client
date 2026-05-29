import { Component } from '@angular/core';
import { RegisterUserCompleteComponent } from '../register-user-complete.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [MatCard, MatCardContent, MatButton, StandaloneLogoComponent],
  selector: 'app-register-teacher-complete',
  styleUrl: './register-teacher-complete.component.scss',
  templateUrl: './register-teacher-complete.component.html'
})
export class RegisterTeacherCompleteComponent extends RegisterUserCompleteComponent {}
