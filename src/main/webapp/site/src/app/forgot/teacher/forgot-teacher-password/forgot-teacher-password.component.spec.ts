import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotTeacherPasswordComponent } from './forgot-teacher-password.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TeacherService} from '../../../teacher/teacher.service';

export class MockTeacherService {

}

describe('ForgotTeacherPasswordComponent', () => {
  let component: ForgotTeacherPasswordComponent;
  let fixture: ComponentFixture<ForgotTeacherPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotTeacherPasswordComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TeacherService, userClass: MockTeacherService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotTeacherPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
