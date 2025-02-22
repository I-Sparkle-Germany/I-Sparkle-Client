import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportStudentWorkComponent } from './export-student-work.component';
import { ClassroomMonitorTestingModule } from '../../classroom-monitor-testing.module';
import { DataExportModule } from '../data-export.module';
import { DataExportService } from '../../../services/dataExportService';
import { provideRouter } from '@angular/router';
import { TeacherProjectService } from '../../../services/teacherProjectService';
import { ConfigService } from '../../../services/configService';

let configService: ConfigService;
let teacherProjectService: TeacherProjectService;

describe('ExportStudentWorkComponent', () => {
  let component: ExportStudentWorkComponent;
  let fixture: ComponentFixture<ExportStudentWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportStudentWorkComponent],
      imports: [ClassroomMonitorTestingModule, DataExportModule],
      providers: [DataExportService, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportStudentWorkComponent);
    component = fixture.componentInstance;
    configService = TestBed.inject(ConfigService);
    spyOn(configService, 'getPermissions').and.returnValue({
      canAuthorProject: true,
      canGradeStudentWork: true,
      canViewStudentNames: true
    });
    teacherProjectService = TestBed.inject(TeacherProjectService);
    spyOn(teacherProjectService, 'getNodeOrderOfProject').and.returnValue({
      idToOrder: {},
      nodes: []
    });
    teacherProjectService.project = {
      nodes: [],
      inactiveNodes: [],
      metadata: {
        title: 'Test Project'
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
