"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavItemController = function () {
    function NavItemController($element, $filter, $mdDialog, $rootScope, $scope, $state, $translate, ConfigService, NodeService, ProjectService, StudentDataService, StudentStatusService, TeacherDataService, TeacherWebSocketService) {
        var _this = this;

        _classCallCheck(this, NavItemController);

        this.$element = $element;
        this.$filter = $filter;
        this.$mdDialog = $mdDialog;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this.$translate = $translate;
        this.ConfigService = ConfigService;
        this.NodeService = NodeService;
        this.ProjectService = ProjectService;
        this.StudentDataService = StudentDataService;
        this.StudentStatusService = StudentStatusService;
        this.TeacherDataService = TeacherDataService;
        this.TeacherWebSocketService = TeacherWebSocketService;

        this.expanded = false;

        this.item = this.ProjectService.idToNode[this.nodeId];
        this.isGroup = this.ProjectService.isGroupNode(this.nodeId);

        this.nodeTitle = this.showPosition ? this.ProjectService.idToPosition[this.nodeId] + ': ' + this.item.title : this.item.title;
        this.currentNode = this.TeacherDataService.currentNode;
        this.previousNode = null;
        this.isCurrentNode = this.currentNode.id === this.nodeId;

        // the max score for the node
        this.maxScore = this.ProjectService.getMaxScoreForNode(this.nodeId);

        // an object to hold workgroups currently visiting this node
        this.workgroupsOnNodeData = [];

        // whether there is at least one workgroup both online and on this node
        this.isWorkgroupOnlineOnNode = false;

        // whether this node is a planning group
        this.isPlanning = this.ProjectService.isPlanning(this.nodeId);

        // get the node icon
        this.icon = this.ProjectService.getNodeIconByNodeId(this.nodeId);

        this.parentGroupId = null;

        var parentGroup = this.ProjectService.getParentGroup(this.nodeId);

        if (parentGroup != null) {
            this.parentGroupId = parentGroup.id;
        }

        if (this.isPlanning) {
            /*
             * planning is enabled for this group so we will get the available
             * planning nodes that can be used
             */
            this.availablePlanningNodes = this.ProjectService.getAvailablePlanningNodes(this.nodeId);
        } else if (this.isPlanningNode) {
            /* this is an available planning node for its parent group, so we
             * need to calculate the total number of times it has been added
             * to the project by all the workgroups in the current period
             */

        }

        this.setWorkgroupsOnNodeData();

        this.$scope.$watch(function () {
            return _this.TeacherDataService.currentNode;
        }, function (newNode, oldNode) {
            _this.currentNode = newNode;
            _this.previousNode = oldNode;
            _this.isCurrentNode = _this.nodeId === newNode.id;

            if (_this.ProjectService.isApplicationNode(newNode.id)) {
                return;
            }

            if (oldNode) {
                var isPrev = _this.nodeId === oldNode.id;

                if (_this.TeacherDataService.previousStep) {
                    _this.$scope.$parent.isPrevStep = _this.nodeId === _this.TeacherDataService.previousStep.id;
                }

                if (isPrev && !_this.isGroup) {
                    _this.zoomToElement();
                }
            }

            if (_this.isGroup) {
                var prevNodeisGroup = !oldNode || _this.ProjectService.isGroupNode(oldNode.id);
                if (_this.isCurrentNode) {
                    _this.expanded = true;
                    if (prevNodeisGroup) {
                        _this.zoomToElement();
                    }
                } else if (!prevNodeisGroup) {
                    if (_this.ProjectService.isNodeDescendentOfGroup(oldNode, _this.item)) {
                        _this.expanded = true;
                    } else {
                        _this.expanded = false;
                    }
                }
            }
        });

        this.$scope.$watch(function () {
            return _this.expanded;
        }, function (value) {
            _this.$scope.$parent.itemExpanded = value;
        });

        // listen for the studentsOnlineReceived event
        this.$rootScope.$on('studentsOnlineReceived', function (event, args) {
            _this.setWorkgroupsOnNodeData();
        });

        // listen for the studentStatusReceived event
        this.$rootScope.$on('studentStatusReceived', function (event, args) {
            _this.setWorkgroupsOnNodeData();
        });

        // listen for the currentPeriodChanged event
        this.$rootScope.$on('currentPeriodChanged', function (event, args) {
            _this.setWorkgroupsOnNodeData();
        });
    }

    _createClass(NavItemController, [{
        key: 'zoomToElement',
        value: function zoomToElement() {
            var _this2 = this;

            setTimeout(function () {
                // smooth scroll to expanded group's page location
                var top = _this2.$element[0].offsetTop;
                var location = _this2.isGroup ? top - 32 : top - 80;
                var delay = 350;
                $('#content').animate({
                    scrollTop: location
                }, delay, 'linear');
            }, 250);
        }
    }, {
        key: 'itemClicked',
        value: function itemClicked(event) {
            var previousNode = this.TeacherDataService.currentNode;
            var currentNode = this.ProjectService.getNodeById(this.nodeId);
            if (this.isGroup) {
                this.expanded = !this.expanded;
                if (this.expanded) {
                    if (this.isCurrentNode) {
                        this.zoomToElement();
                    } else {
                        this.TeacherDataService.endCurrentNodeAndSetCurrentNodeByNodeId(this.nodeId);
                    }
                }
            } else {
                this.TeacherDataService.endCurrentNodeAndSetCurrentNodeByNodeId(this.nodeId);
            }
        }

        /**
         * Returns the max times a planning node can be added to the project (-1 is
         * is returned if there is no limit)
         * @param planningNodeId
         */

    }, {
        key: 'getPlannindNodeMaxAllowed',
        value: function getPlannindNodeMaxAllowed(planningNodeId) {
            var maxAddAllowed = -1; // by default, students can add as many instances as they want
            var planningGroupNode = null;
            if (this.isParentGroupPlanning) {
                planningGroupNode = this.ProjectService.getNodeById(this.parentGroupId);
            } else {
                planningGroupNode = this.ProjectService.getNodeById(this.nodeId);
            }
            // get the maxAddAllowed value by looking up the planningNode in the project.
            if (planningGroupNode && planningGroupNode.availablePlanningNodes) {
                for (var a = 0; a < planningGroupNode.availablePlanningNodes.length; a++) {
                    var availablePlanningNode = planningGroupNode.availablePlanningNodes[a];
                    if (availablePlanningNode.nodeId === planningNodeId && availablePlanningNode.max != null) {
                        maxAddAllowed = availablePlanningNode.max;
                    }
                }
            }

            return maxAddAllowed;
        }

        /**
         * Returns the number of times a planning node has been added to the project
         * @param planningNodeId
         */

    }, {
        key: 'getNumPlannindNodeInstances',
        value: function getNumPlannindNodeInstances(planningNodeId) {
            var numPlanningNodesAdded = 0; // keep track of number of instances
            // otherwise, see how many times the planning node template has been used.

            var planningGroupNode = null;
            if (this.isParentGroupPlanning) {
                planningGroupNode = this.ProjectService.getNodeById(this.parentGroupId);
            } else {
                planningGroupNode = this.ProjectService.getNodeById(this.nodeId);
            }

            // loop through the child ids in the planning group and see how many times they've been used
            if (planningGroupNode && planningGroupNode.ids) {
                for (var c = 0; c < planningGroupNode.ids.length; c++) {
                    var childPlanningNodeId = planningGroupNode.ids[c];
                    var childPlanningNode = this.ProjectService.getNodeById(childPlanningNodeId);
                    if (childPlanningNode != null && childPlanningNode.planningNodeTemplateId === planningNodeId) {
                        numPlanningNodesAdded++;
                    }
                }
            }

            return numPlanningNodesAdded;
        }

        /**
         * Get the node title
         * @param nodeId get the title for this node
         * @returns the title for the node
         */

    }, {
        key: 'getNodeTitle',
        value: function getNodeTitle(nodeId) {
            var node = this.ProjectService.idToNode[nodeId];
            var title = null;

            if (node != null) {
                title = node.title;
            }

            return title;
        }

        /**
         * Get the node description
         * @param nodeId get the description for this node
         * @returns the description for the node
         */

    }, {
        key: 'getNodeDescription',
        value: function getNodeDescription(nodeId) {
            var node = this.ProjectService.idToNode[nodeId];
            var description = null;

            if (node != null) {
                description = node.description;
            }

            return description;
        }

        /**
         * Get the percentage of the class or period that has completed this node
         * @returns the percentage of the class or period that has completed the node
         */

    }, {
        key: 'getNodeCompletion',
        value: function getNodeCompletion() {
            // get the currently selected period
            var currentPeriod = this.TeacherDataService.getCurrentPeriod();
            var periodId = currentPeriod.periodId;

            // get the percentage of the class or period that has completed the node
            var completionPercentage = this.StudentStatusService.getNodeCompletion(this.nodeId, periodId);

            return completionPercentage;
        }

        /**
         * Get the average score for the node
         * @param nodeId the node id
         * @returns the average score for the node
         */

    }, {
        key: 'getNodeAverageScore',
        value: function getNodeAverageScore() {
            // get the currently selected period
            var currentPeriod = this.TeacherDataService.getCurrentPeriod();
            var periodId = currentPeriod.periodId;

            // get the average score for the node
            var averageScore = this.StudentStatusService.getNodeAverageScore(this.nodeId, periodId);

            var averageScoreDisplay = null;

            if (this.maxScore != null) {
                if (averageScore === null) {
                    averageScore = "-";
                } else {
                    averageScore = this.$filter('number')(averageScore, 1);
                }
                // create the average score display e.g. 8/10
                averageScoreDisplay = averageScore + '/' + this.maxScore;
            }

            return averageScoreDisplay;
        }

        /**
         * Get the current period
         */

    }, {
        key: 'getCurrentPeriod',
        value: function getCurrentPeriod() {
            return this.TeacherDataService.getCurrentPeriod();
        }

        /**
         * Get the workgroup ids on this node in the current period
         * @returns an array of workgroup ids on a node in a period
         */

    }, {
        key: 'getWorkgroupIdsOnNode',
        value: function getWorkgroupIdsOnNode() {
            // get the currently selected period
            var currentPeriod = this.getCurrentPeriod().periodId;

            // get the workgroups that are on the node in the period
            return this.StudentStatusService.getWorkgroupIdsOnNode(this.nodeId, currentPeriod);
        }
    }, {
        key: 'setWorkgroupsOnNodeData',
        value: function setWorkgroupsOnNodeData() {
            var workgroupIdsOnNode = this.getWorkgroupIdsOnNode();
            var workgroupOnlineOnNode = false;
            this.workgroupsOnNodeData = [];

            var n = workgroupIdsOnNode.length;
            for (var i = 0; i < n; i++) {
                var id = workgroupIdsOnNode[i];
                var usernames = this.ConfigService.getUserNamesByWorkgroupId(id);
                var avatarColor = this.StudentStatusService.getAvatarColorForWorkgroupId(id);
                var online = this.TeacherWebSocketService.isStudentOnline(id);
                if (online) {
                    workgroupOnlineOnNode = true;
                }

                this.workgroupsOnNodeData.push({
                    'workgroupId': id,
                    'usernames': usernames,
                    'avatarColor': avatarColor,
                    'online': online
                });
            }

            this.isWorkgroupOnlineOnNode = workgroupOnlineOnNode;
        }
    }]);

    return NavItemController;
}();

NavItemController.$inject = ['$element', '$filter', '$mdDialog', '$rootScope', '$scope', '$state', '$translate', 'ConfigService', 'NodeService', 'ProjectService', 'StudentDataService', 'StudentStatusService', 'TeacherDataService', 'TeacherWebSocketService'];

exports.default = NavItemController;
//# sourceMappingURL=navItemController.js.map