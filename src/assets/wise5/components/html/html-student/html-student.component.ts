import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WiseLinkService } from '../../../../../app/services/wiseLinkService';
import { AnnotationService } from '../../../services/annotationService';
import { ConfigService } from '../../../services/configService';
import { NodeService } from '../../../services/nodeService';
import { StudentDataService } from '../../../services/studentDataService';
import { UtilService } from '../../../services/utilService';
import { ComponentStudent } from '../../component-student.component';
import { ComponentService } from '../../componentService';

@Component({
  selector: 'html-student',
  templateUrl: 'html-student.component.html'
})
export class HtmlStudent extends ComponentStudent {
  html: SafeHtml = '';
  wiseLinkCommunicatorId: string;
  wiseLinkCommunicator: any;
  wiseLinkClickedHandler: any;

  constructor(
    protected AnnotationService: AnnotationService,
    protected ComponentService: ComponentService,
    protected ConfigService: ConfigService,
    protected NodeService: NodeService,
    protected sanitizer: DomSanitizer,
    protected StudentDataService: StudentDataService,
    protected UtilService: UtilService,
    private WiseLinkService: WiseLinkService
  ) {
    super(
      AnnotationService,
      ComponentService,
      ConfigService,
      NodeService,
      sanitizer,
      StudentDataService,
      UtilService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.wiseLinkCommunicatorId = `wise-link-communicator-html-student-${this.nodeId}-${this.componentId}`;
    this.broadcastDoneRenderingComponent();
  }

  ngAfterViewInit() {
    this.wiseLinkCommunicator = document.getElementById(this.wiseLinkCommunicatorId);
    this.wiseLinkClickedHandler = this.WiseLinkService.createWiseLinkClickedHandler(this.nodeId);
    this.WiseLinkService.addWiseLinkClickedListener(
      this.wiseLinkCommunicator,
      this.wiseLinkClickedHandler
    );
    this.html = this.WiseLinkService.generateHtmlWithWiseLink(
      this.componentContent.html,
      this.wiseLinkCommunicatorId
    );
  }

  ngOnDestroy(): void {
    if (this.wiseLinkClickedHandler != null) {
      this.wiseLinkCommunicator.removeEventListener('wiselinkclicked', this.wiseLinkClickedHandler);
    }
  }
}
