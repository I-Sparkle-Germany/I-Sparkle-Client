import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CallToActionComponent } from '../../modules/shared/call-to-action/call-to-action.component';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';

@Component({
  encapsulation: ViewEncapsulation.None,
  imports: [CallToActionComponent, MatCardModule, StandaloneLogoComponent],
  selector: 'app-register-home',
  styleUrl: './register-home.component.scss',
  templateUrl: './register-home.component.html'
})
export class RegisterHomeComponent implements OnInit {
  googleUserNotFoundError: boolean;
  protected microsoftUserNotFoundError: boolean;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.googleUserNotFoundError = params['googleUserNotFound'] === 'true';
      this.microsoftUserNotFoundError = params['microsoftUserNotFound'] === 'true';
    });
  }
}
