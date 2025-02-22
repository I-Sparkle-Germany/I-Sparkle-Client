import { Component, Input, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeacherDataService } from '../../../services/teacherDataService';
import { TeacherProjectService } from '../../../services/teacherProjectService';
import { ComponentTypeService } from '../../../services/componentTypeService';
import { ComponentServiceLookupService } from '../../../services/componentServiceLookupService';
import { Node } from '../../../common/Node';
import { ComponentContent } from '../../../common/ComponentContent';
import { scrollToTopOfPage, temporarilyHighlightElement } from '../../../common/dom/dom';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherNodeService } from '../../../services/teacherNodeService';
import { DeleteTranslationsService } from '../../../services/deleteTranslationsService';
import { copy } from '../../../common/object/object';

@Component({
  selector: 'node-authoring',
  templateUrl: './node-authoring.component.html',
  styleUrls: ['./node-authoring.component.scss']
})
export class NodeAuthoringComponent implements OnInit {
  components: ComponentContent[] = [];
  protected componentsToChecked: WritableSignal<{ [key: string]: boolean }> = signal({});
  componentsToExpanded = {};
  protected isAnyComponentSelected: Signal<boolean> = computed(() =>
    Object.values(this.componentsToChecked()).some((value) => value)
  );
  isGroupNode: boolean;
  node: Node;
  nodeJson: any;
  @Input() nodeId?: string;
  subscriptions: Subscription = new Subscription();

  constructor(
    private componentServiceLookupService: ComponentServiceLookupService,
    private componentTypeService: ComponentTypeService,
    private nodeService: TeacherNodeService,
    private projectService: TeacherProjectService,
    private dataService: TeacherDataService,
    private deleteTranslationsService: DeleteTranslationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setup(this.nodeId);
    this.dataService.setCurrentNodeByNodeId(this.nodeId);
    this.subscribeToShowSubmitButtonValueChanges();
    this.subscribeToNodeChanges();
    this.subscribeToCurrentNodeChanged();
  }

  private setup(nodeId: string): void {
    this.nodeId = nodeId;
    this.node = this.projectService.getNode(this.nodeId);
    this.isGroupNode = this.projectService.isGroupNode(this.nodeId);
    this.nodeJson = this.projectService.getNodeById(this.nodeId);
    this.components = this.projectService.getComponents(this.nodeId);
    this.componentsToChecked.set({});
    this.componentsToExpanded = {};

    if (history.state.newComponents && history.state.newComponents.length > 0) {
      this.highlightAndExpandComponents(history.state.newComponents);
    } else {
      scrollToTopOfPage();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscribeToShowSubmitButtonValueChanges(): void {
    this.subscriptions.add(
      this.nodeService.componentShowSubmitButtonValueChanged$.subscribe(({ showSubmitButton }) => {
        if (showSubmitButton) {
          this.nodeJson.showSaveButton = false;
          this.nodeJson.showSubmitButton = false;
          this.setShowSaveButtonForAllComponents(this.nodeJson, true);
        } else {
          if (this.projectService.doesAnyComponentInNodeShowSubmitButton(this.nodeJson.id)) {
            this.setShowSaveButtonForAllComponents(this.nodeJson, true);
          } else {
            this.nodeJson.showSaveButton = true;
            this.nodeJson.showSubmitButton = false;
            this.setShowSaveButtonForAllComponents(this.nodeJson, false);
          }
        }
        this.authoringViewNodeChanged();
      })
    );
  }

  private subscribeToNodeChanges(): void {
    this.subscriptions.add(
      this.projectService.nodeChanged$.subscribe((doParseProject) => {
        this.authoringViewNodeChanged(doParseProject);
      })
    );
  }

  private subscribeToCurrentNodeChanged(): void {
    this.subscriptions.add(
      this.dataService.currentNodeChanged$.subscribe(({ currentNode }) => {
        if (currentNode != null) {
          this.setup(currentNode.id);
        }
      })
    );
  }

  protected hideAllComponentSaveButtons(): void {
    for (const component of this.components) {
      const service = this.componentServiceLookupService.getService(component.type);
      if (service.componentUsesSaveButton()) {
        component.showSaveButton = false;
      }
    }
  }

  /**
   * The node has changed in the authoring view
   * @param parseProject whether to parse the whole project to recalculate
   * significant changes such as branch paths
   */
  protected authoringViewNodeChanged(parseProject = false): any {
    if (parseProject) {
      this.projectService.parseProject();
    }
    return this.projectService.saveProject();
  }

  protected getSelectedComponents(): ComponentContent[] {
    return this.components.filter(
      (component: ComponentContent) => this.componentsToChecked()[component.id]
    );
  }

  /**
   * Get the component numbers and component types that have been selected
   * @return an array of strings
   * example
   * [
   *   "1. OpenResponse",
   *   "3. MultipleChoice"
   * ]
   */
  private getSelectedComponentNumbersAndTypes(): string[] {
    const selectedComponents = [];
    for (let c = 0; c < this.components.length; c++) {
      const component = this.components[c];
      if (this.componentsToChecked()[component.id]) {
        const componentNumberAndType = c + 1 + '. ' + component.type;
        selectedComponents.push(componentNumberAndType);
      }
    }
    return selectedComponents;
  }

  protected chooseComponentLocation(action: string): void {
    this.router.navigate(['choose-component-location'], {
      relativeTo: this.route,
      state: {
        action: action,
        selectedComponents: this.getSelectedComponents()
      }
    });
  }

  protected deleteComponents(): void {
    scrollToTopOfPage();
    if (this.confirmDeleteComponent(this.getSelectedComponentNumbersAndTypes())) {
      this.deleteComponentsOnServer(
        this.getSelectedComponents().map((component) => this.node.deleteComponent(component.id))
      );
    }
  }

  protected deleteComponent(
    event: any,
    componentNumber: number,
    component: ComponentContent
  ): void {
    event.stopPropagation();
    if (this.confirmDeleteComponent([`${componentNumber}. ${component.type}`])) {
      this.deleteComponentsOnServer([this.node.deleteComponent(component.id)]);
    }
  }

  private confirmDeleteComponent(componentLabels: string[]): boolean {
    let confirmMessage =
      componentLabels.length === 1
        ? $localize`Are you sure you want to delete this component?\n`
        : $localize`Are you sure you want to delete these components?\n`;
    confirmMessage += `${componentLabels.join('\n')}`;
    return confirm(confirmMessage);
  }

  private deleteComponentsOnServer(components: ComponentContent[]): void {
    this.checkIfNeedToShowNodeSaveOrNodeSubmitButtons();
    this.projectService.saveProject().then(() => {
      for (const component of components) {
        this.componentsToChecked.update((obj) => {
          delete obj[component.id];
          return copy(obj);
        });
        delete this.componentsToExpanded[component.id];
      }
      this.deleteTranslationsService.tryDeleteComponents(components);
    });
  }

  private checkIfNeedToShowNodeSaveOrNodeSubmitButtons(): void {
    if (!this.projectService.doesAnyComponentInNodeShowSubmitButton(this.nodeId)) {
      if (this.hasComponentsWithWork()) {
        this.nodeJson.showSaveButton = true;
        this.nodeJson.showSubmitButton = false;
        this.hideAllComponentSaveButtons();
      } else {
        this.nodeJson.showSaveButton = false;
        this.nodeJson.showSubmitButton = false;
      }
    }
  }

  private hasComponentsWithWork(): boolean {
    return this.node.components.some((component) =>
      this.componentServiceLookupService.getService(component.type).componentHasWork(component)
    );
  }

  /**
   * Temporarily highlight the specified components and show the component
   * authoring views. Used to bring user's attention to new changes.
   * @param components an array of components to highlight and expand
   */
  protected highlightAndExpandComponents(components: any = []): void {
    this.componentsToChecked.set({});

    // wait for the UI to update and then scroll to the first new component
    setTimeout(() => {
      if (components.length > 0) {
        const componentElement = $('#' + components[0].id);
        $('#content').scrollTop(componentElement.offset().top - 200);
        for (const component of components) {
          temporarilyHighlightElement(component.id);
          this.componentsToExpanded[component.id] = true;
        }
      }
    }, 100);
  }

  protected getComponentTypeLabel(componentType: string): string {
    return this.componentTypeService.getComponentTypeLabel(componentType);
  }

  protected componentCheckboxChanged(componentId: string, checked: boolean): void {
    this.componentsToChecked.update((componentsToChecked) => {
      componentsToChecked[componentId] = checked;
      return copy(componentsToChecked);
    });
  }

  protected toggleComponent(componentId: string): void {
    this.componentsToExpanded[componentId] = !this.componentsToExpanded[componentId];
    this.projectService.uiChanged();
  }

  protected setAllComponentsIsExpanded(isExpanded: boolean): void {
    this.components.forEach((component) => {
      this.componentsToExpanded[component.id] = isExpanded;
    });
    this.projectService.uiChanged();
  }

  protected getNumberOfComponentsExpanded(): number {
    return Object.values(this.componentsToExpanded).filter((value) => value).length;
  }

  private setShowSaveButtonForAllComponents(node: Node, showSaveButton: boolean): void {
    node.components
      .filter((component) =>
        this.componentServiceLookupService.getService(component.type).componentUsesSaveButton()
      )
      .forEach((component) => (component.showSaveButton = showSaveButton));
  }

  protected dropComponent(event: CdkDragDrop<ComponentContent[]>): void {
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
    this.projectService.saveProject();
  }
}
