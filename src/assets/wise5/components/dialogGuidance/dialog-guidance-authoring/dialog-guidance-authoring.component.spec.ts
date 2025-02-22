import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentTeacherCommonServicesModule } from '../../../../../app/student-teacher-common-services.module';
import { copy } from '../../../common/object/object';
import { TeacherProjectService } from '../../../services/teacherProjectService';
import { DialogGuidanceAuthoringComponent } from './dialog-guidance-authoring.component';
import { DialogGuidanceAuthoringModule } from './dialog-guidance-authoring.module';
import { TeacherNodeService } from '../../../services/teacherNodeService';
import { ProjectLocale } from '../../../../../app/domain/projectLocale';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const componentContent = {
  id: 'i64ex48j1z',
  type: 'DialogGuidance',
  prompt: '',
  feedbackRules: [],
  showSaveButton: false,
  showSubmitButton: false,
  isComputerAvatarEnabled: false
};

describe('DialogGuidanceAuthoringComponent', () => {
  let component: DialogGuidanceAuthoringComponent;
  let fixture: ComponentFixture<DialogGuidanceAuthoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        DialogGuidanceAuthoringModule,
        StudentTeacherCommonServicesModule
      ],
      providers: [
        TeacherNodeService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    spyOn(TestBed.inject(TeacherProjectService), 'getLocale').and.returnValue(
      new ProjectLocale({ default: 'en-US' })
    );
    fixture = TestBed.createComponent(DialogGuidanceAuthoringComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.inject(TeacherProjectService), 'isDefaultLocale').and.returnValue(true);
    spyOn(TestBed.inject(TeacherProjectService), 'getComponent').and.returnValue(
      copy(componentContent)
    );
    component.componentContent = copy(componentContent);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
