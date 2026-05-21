import { Component } from '@angular/core';
import { RegisterUserCompleteComponent } from '../register-user-complete.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [MatCard, MatCardContent, MatButton, StandaloneLogoComponent],
  templateUrl: './register-student-complete.component.html',
  selector: 'app-register-student-complete',
  styleUrl: './register-student-complete.component.scss'
})
export class RegisterStudentCompleteComponent extends RegisterUserCompleteComponent {}
