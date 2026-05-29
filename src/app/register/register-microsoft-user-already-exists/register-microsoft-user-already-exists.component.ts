import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, StandaloneLogoComponent],
  templateUrl: './register-microsoft-user-already-exists.component.html'
})
export class RegisterMicrosoftUserAlreadyExistsComponent {
  protected login(): void {
    window.location.href = `/api/microsoft-login?redirectUrl=/`;
  }
}
