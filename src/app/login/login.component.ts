import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StandaloneLogoComponent } from '../common/standalone-logo/standalone-logo.comonent';

@Component({
  imports: [RouterLink, RouterOutlet, StandaloneLogoComponent],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html'
})
export class LoginComponent {}
