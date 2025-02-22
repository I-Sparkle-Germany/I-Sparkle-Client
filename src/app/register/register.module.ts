import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterTeacherFormComponent } from './register-teacher-form/register-teacher-form.component';
import { RegisterTeacherCompleteComponent } from './register-teacher-complete/register-teacher-complete.component';
import { RegisterStudentFormComponent } from './register-student-form/register-student-form.component';
import { RegisterStudentCompleteComponent } from './register-student-complete/register-student-complete.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterGoogleUserAlreadyExistsComponent } from './register-google-user-already-exists/register-google-user-already-exists.component';
import { SharedModule } from '../modules/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { GoogleSignInButtonComponent } from '../modules/google-sign-in/google-sign-in-button/google-sign-in-button.component';
import { PasswordModule } from '../password/password.module';
import { StandaloneLogoComponent } from '../common/standalone-logo/standalone-logo.comonent';
import { RegisterMicrosoftUserAlreadyExistsComponent } from './register-microsoft-user-already-exists/register-microsoft-user-already-exists.component';
import { CallToActionComponent } from '../modules/shared/call-to-action/call-to-action.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule
];

@NgModule({
  imports: [
    CallToActionComponent,
    CommonModule,
    FormsModule,
    GoogleSignInButtonComponent,
    SharedModule,
    PasswordModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    StandaloneLogoComponent,
    materialModules
  ],
  declarations: [
    RegisterComponent,
    RegisterHomeComponent,
    RegisterTeacherComponent,
    RegisterTeacherFormComponent,
    RegisterTeacherCompleteComponent,
    RegisterStudentFormComponent,
    RegisterStudentCompleteComponent,
    RegisterStudentComponent,
    RegisterGoogleUserAlreadyExistsComponent,
    RegisterMicrosoftUserAlreadyExistsComponent
  ],
  exports: [RegisterComponent, StandaloneLogoComponent]
})
export class RegisterModule {}
