import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FaqComponent } from '../faq.component';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['../../help.component.scss']
})
export class GettingStartedComponent extends FaqComponent {}
