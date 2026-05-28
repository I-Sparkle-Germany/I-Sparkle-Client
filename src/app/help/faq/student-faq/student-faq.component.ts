import { Component } from '@angular/core';
import { FaqComponent } from '../faq.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CallToActionComponent } from '../../../modules/shared/call-to-action/call-to-action.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, CallToActionComponent, MatDividerModule, MatIconModule, RouterModule],
  templateUrl: './student-faq.component.html',
  styleUrl: '../../help.component.scss'
})
export class StudentFaqComponent extends FaqComponent {}
