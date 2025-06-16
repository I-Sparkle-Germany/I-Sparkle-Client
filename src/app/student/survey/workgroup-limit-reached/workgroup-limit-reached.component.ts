import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../../common/standalone-logo/standalone-logo.comonent';

@Component({
  selector: 'workgroup-limit-reached',
  imports: [MatCardModule, StandaloneLogoComponent],
  templateUrl: './workgroup-limit-reached.component.html'
})
export class WorkgroupLimitReachedComponent {}
