import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UpgradeModule } from '@angular/upgrade/static';
import { ConfigService } from '../../assets/wise5/services/configService';
import { CopyNodesService } from '../../assets/wise5/services/copyNodesService';
import { TeacherProjectService } from '../../assets/wise5/services/teacherProjectService';
import { UtilService } from '../../assets/wise5/services/utilService';

class ConfigServiceStub {}

class ProjectServiceStub {
  createNodeAfter(node: any, nodeIdAfter: string) {}
  createNodeInside(node: any, groupId: string) {}
  getNextAvailableNodeId() {
    return 'n2';
  }
  getNodeById(nodeId: string) {
    return { id: nodeId, components: [{ id: 'c1' }] };
  }
  getUnusedComponentId(componentIds: string[]) {
    return 'c2';
  }
  parseProject() {}
}

class UtilServiceStub {
  makeCopyOfJSONObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

let service: CopyNodesService;
let projectService: TeacherProjectService;
let utilService: UtilService;
let createNodeAfterSpy, createNodeInsideSpy, getUnusedComponentIdSpy, parseProjectSpy;

describe('CopyNodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UpgradeModule],
      providers: [
        CopyNodesService,
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: TeacherProjectService, useClass: ProjectServiceStub },
        { provide: UtilService, useClass: UtilServiceStub }
      ]
    });
    service = TestBed.inject(CopyNodesService);
    projectService = TestBed.inject(TeacherProjectService);
    utilService = TestBed.inject(UtilService);
    createNodeAfterSpy = spyOn(projectService, 'createNodeAfter');
    createNodeInsideSpy = spyOn(projectService, 'createNodeInside');
    getUnusedComponentIdSpy = spyOn(projectService, 'getUnusedComponentId');
    parseProjectSpy = spyOn(projectService, 'parseProject');
  });
  copyNodeInside();
  copyNodesAfter();
});

function copyNodeInside() {
  describe('copyNodeInside()', () => {
    it('should copy and create node inside specified group id', () => {
      const newNode = service.copyNodeInside('n1', 'g1');
      expect(newNode.id).not.toEqual('n1');
      expectSpiesToHaveBeenCalled(createNodeInsideSpy, getUnusedComponentIdSpy, parseProjectSpy);
    });
  });
}

function copyNodesAfter() {
  describe('copyNodesAfter', () => {
    it('should copy and create a node after specified node id', () => {
      const newNodes = service.copyNodesAfter(['n1'], 'n2');
      expect(newNodes.length).toEqual(1);
      expectSpiesToHaveBeenCalled(createNodeAfterSpy, parseProjectSpy);
    });
    it('should copy and create nodes after specified node id', () => {
      const newNodes = service.copyNodesAfter(['n1', 'n2'], 'n1');
      expect(newNodes.length).toEqual(2);
      expectSpiesToHaveBeenCalled(createNodeAfterSpy, parseProjectSpy);
    });
  });
}

function expectSpiesToHaveBeenCalled(...spies) {
  spies.forEach((spy) => {
    expect(spy).toHaveBeenCalled();
  });
}
