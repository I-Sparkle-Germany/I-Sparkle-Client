import '../../../assets/wise5/lib/jquery/jquery-global';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ComponentStudentModule } from '../../../assets/wise5/components/component/component-student.module';
import { GenerateImageDialogComponent } from '../../../assets/wise5/directives/generate-image-dialog/generate-image-dialog.component';
import { SafeUrl } from '../../../assets/wise5/directives/safeUrl/safe-url.pipe';
import { SimpleDialogModule } from '../../../assets/wise5/directives/simple-dialog.module';
import { SummaryDisplayModule } from '../../../assets/wise5/directives/summary-display/summary-display.module';
import { InitializeVLEService } from '../../../assets/wise5/services/initializeVLEService';
import { ProjectService } from '../../../assets/wise5/services/projectService';
import { StudentDataService } from '../../../assets/wise5/services/studentDataService';
import { NavigationComponent } from '../../../assets/wise5/themes/default/navigation/navigation.component';
import { StepToolsComponent } from '../../../assets/wise5/themes/default/themeComponents/stepTools/step-tools.component';
import { StudentAssetsDialogModule } from '../../../assets/wise5/vle/studentAsset/student-assets-dialog/student-assets-dialog.module';
import { VLEComponent } from '../../../assets/wise5/vle/vle.component';
import { VLEProjectService } from '../../../assets/wise5/vle/vleProjectService';
import { StudentTeacherCommonModule } from '../../student-teacher-common.module';
import { ChooseBranchPathDialogComponent } from '../../preview/modules/choose-branch-path-dialog/choose-branch-path-dialog.component';
import { DataService } from '../../services/data.service';
import { StudentComponentModule } from '../student.component.module';
import { StudentVLERoutingModule } from './student-vle-routing.module';
import { PauseScreenService } from '../../../assets/wise5/services/pauseScreenService';
import { StudentNotificationService } from '../../../assets/wise5/services/studentNotificationService';
import { NotificationService } from '../../../assets/wise5/services/notificationService';
import { VLEParentComponent } from '../../../assets/wise5/vle/vle-parent/vle-parent.component';
import { RunEndedAndLockedMessageComponent } from '../../../assets/wise5/vle/run-ended-and-locked-message/run-ended-and-locked-message.component';
import { NodeNavigationComponent } from '../../../assets/wise5/directives/node-navigation/node-navigation.component';
import { GroupTabsComponent } from '../../../assets/wise5/directives/group-tabs/group-tabs.component';
import { StudentPeerGroupService } from '../../../assets/wise5/services/studentPeerGroupService';
import { PeerGroupService } from '../../../assets/wise5/services/peerGroupService';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { NodeStatusIconComponent } from '../../../assets/wise5/themes/default/themeComponents/nodeStatusIcon/node-status-icon.component';
import { NodeComponent } from '../../../assets/wise5/vle/node/node.component';

@NgModule({
  declarations: [
    ChooseBranchPathDialogComponent,
    GenerateImageDialogComponent,
    SafeUrl,
    VLEComponent,
    VLEParentComponent
  ],
  imports: [
    CommonModule,
    ComponentStudentModule,
    GroupTabsComponent,
    MatDialogModule,
    NavigationComponent,
    NodeComponent,
    NodeNavigationComponent,
    NodeStatusIconComponent,
    RunEndedAndLockedMessageComponent,
    SimpleDialogModule,
    StepToolsComponent,
    StudentAssetsDialogModule,
    StudentComponentModule,
    StudentTeacherCommonModule,
    StudentVLERoutingModule,
    SummaryDisplayModule,
    TopBarComponent
  ],
  providers: [
    InitializeVLEService,
    PauseScreenService,
    { provide: DataService, useExisting: StudentDataService },
    { provide: NotificationService, useExisting: StudentNotificationService },
    { provide: PeerGroupService, useExisting: StudentPeerGroupService },
    { provide: ProjectService, useExisting: VLEProjectService },
    StudentNotificationService,
    VLEProjectService
  ],
  exports: [CommonModule, MatButtonModule, MatDialogModule, MatListModule]
})
export class StudentVLEModule {}
