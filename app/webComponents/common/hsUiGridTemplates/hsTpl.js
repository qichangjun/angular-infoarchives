(function() {
  'use strict';
  angular.module("myApp").config([
    'hsTpl', function(hsTpl) {
      hsTpl.hsCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="{{COL_FIELD CUSTOM_FILTERS}}"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" /> </div> </div>';
      hsTpl.hsFrVendorRefCellTemplate = '<div class="hs-ui-grid-cell-contents typeahead-demo"> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.trNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </div> </div>';
      hsTpl.hsEditFrVendorRefCellTemplate = '<div class="typeahead-demo"> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.trNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </form> </div>';
      hsTpl.hsToVendorRefCellTemplate = '<div class="hs-ui-grid-cell-contents typeahead-demo"> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.toVendorRefList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </div> </div>';
      hsTpl.hsEditToVendorRefCellTemplate = '<div class="typeahead-demo"> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.toVendorRefList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </form> </div>';
      hsTpl.hsFrOwnerCellTemplate = '<div class="hs-ui-grid-cell-contents typeahead-demo"> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.ownerTrNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </div> </div>';
      hsTpl.hsEditFrOwnerCellTemplate = '<div class="typeahead-demo"> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.ownerTrNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </form> </div>';
      hsTpl.hsToOwnerCellTemplate = '<div class="hs-ui-grid-cell-contents typeahead-demo"> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.toOwnerVsqNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </div> </div>';
      hsTpl.hsEditToOwnerCellTemplate = '<div class="typeahead-demo"> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.toOwnerVsqNoList" typeahead-popup-template-url="webComponents/common/hsTemplates/transmittal/transmittal.html" /> </form> </div>';
      hsTpl.hsSelectTypeCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'Onshore\'"> <option value="Onshore" translate="Onshore">Onshore</option> <option value="Offshore" translate="Offshore">Offshore</option> </select> </div> </div>';
      hsTpl.hsSelectPlantCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-options="PO for PO in grid.appScope.vm.plantList"> <option value="" translate="未指定">未指定</option> </select> </div> </div>';
      hsTpl.hsSelectVendorCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'Onshore\'" ng-options="PO for PO in grid.appScope.vm.vendorList"> <option value="" translate="未指定">未指定</option> </select> </div> </div>';
      hsTpl.hsSelectDisciplineCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'Onshore\'" ng-options="PO for PO in grid.appScope.vm.disciplineList"> <option value="" translate="未指定">未指定</option> </select> </div> </div>';
      hsTpl.hsSelectPOCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-change="grid.appScope.vm.test(MODEL_COL_FIELD,row.entity)" ng-options="PO for PO in grid.appScope.vm.POList"> <option value="" translate="未指定">未指定</option> </select> </div> </div>';
      hsTpl.hsSelectFrVendorRefCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in grid.appScope.vm.frVendorRefList" class="form-control"> </div> </div>';
      hsTpl.hsSelectSourceCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'Imported\'"> <option value="Imported" translate="Imported">Imported</option> <option value="Domestic" translate="Domestic">Domestic</option> </select> </div> </div>';
      hsTpl.hsSelectLatestCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'true\'"> <option value="true" translate="true">true</option> <option value="false" translate="false">false</option> </select> </div> </div>';
      hsTpl.hsSelectIssuedStatusCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD=\'IFA\'"> <option value="IFA" translate="IFA">IFA</option> <option value="IFC" translate="IFC">IFC</option> <option value="IFR" translate="IFR">IFR</option> <option value="IFI" translate="IFI">IFI</option> <option value="Final" translate="Final">Final</option> </select> </div> </div>';
      hsTpl.hsDataPickerCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="TOOLTIP"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-class="\'colt\' + col.uid" uib-datepicker-popup ng-init="dt.isOpen=false" ng-click="dt.isOpen=true" is-open="dt.isOpen" datepicker-append-to-body="true" ng-model="MODEL_COL_FIELD" /> </div> </div>';
      hsTpl.hsCellTemplateForDocName = '<div class="hs-ui-grid-cell-contents "> <div ng-if="true" class="hs-ui-grid-cell" title="TOOLTIP"> <a ng-click="grid.appScope.vm.previewDoc(row.entity)">{{row.entity.projectNo}}</a> </div> <div ng-if="row.entity.objectType==\'dw_folder\'" class="hs-ui-grid-cell" > <a ng-click="grid.appScope.vm.enterFolder(row.entity)">夹子：{{COL_FIELD CUSTOM_FILTERS}}</a> </div> </div>';
      hsTpl.hsCellTemplateUnEdit = '<div class="hs-ui-grid-cell-contents "> <div class="hs-ui-grid-cell" title="TOOLTIP"> <span>{{MODEL_COL_FIELD}}</span> </div> </div>';
      hsTpl.hsDataPickerEditor = '<div> <form name="inputForm"> <input class="edit-input" type="text" ng-class="\'colt\' + col.uid" uib-datepicker-popup ng-init="dt.isOpen=true" ng-click="dt.isOpen=true" is-open="dt.isOpen" datepicker-append-to-body="true" hs-ui-grid-date-picker-editor ng-model="MODEL_COL_FIELD" /> </form> </div>';
      hsTpl.hsDropdownEditor = '<div> <form name="inputForm"> <select ng-class="\'colt\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"> </select> </form> </div>';
      hsTpl.hsEditableCellTemplate = '<div style="height: 40px; padding: 5px;"> <form name="inputForm" style="height: 100%;line-height: 30px;"> <img class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/t_dw_class_folder.png\'}}" style="width: 18px;" ng-if="row.entity.objectType == \'dw_class\'"/> <img class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/t_dm_entity_16.png\'}}" style="width: 18px;" ng-if="row.entity.objectType == \'dw_entity_file\'"/> <img class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/t_dm_logic_16.png\'}}" style="width: 18px;" ng-if="row.entity.objectType == \'dw_logic_file\'"/> <img class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/t_dm_common_folder_16.png\'}}" ng-if="row.entity.objectType == \'dw_folder\'"/> <img  class="eds-uigrid-objicon" onerror="this.src=\'images/docIcons/f_unknow_50.png\'"  ng-src="{{\'images/docIcons/f_\'+row.entity.contentType+\'_18.png\'}}" ng-if="row.entity.objectType == \'dw_document\'"/> <img ng-if="!row.entity.superType && row.entity.objectType!=\'dw_folder\' && row.entity.objectType!=\'dw_document\' && row.entity.objectType != \'dw_entity_file\' && row.entity.objectType != \'dw_logic_file\' && row.entity.objectType != \'dw_class\'" class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/f_\'+row.entity.objectType+\'_18.png\'}}"/> <img ng-if="row.entity.superType" class="eds-uigrid-objicon" ng-src="{{\'images/docIcons/f_\'+row.entity.superType+\'_18.png\'}}"/> <input type="text" class="form-control " ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" style="width:210px;height: 28px;display: inline-block" ng-dblclick="$event.stopPropagation()" /> <span   style="margin-right: 0px;margin-left: 10px;cursor:pointer;color:green" ng-if="row.inlineEdit.isEditModeOn" class="fa fa-check" aria-hidden="true" tooltip-append-to-body="true" ng-click="row.inlineEdit.saveEdit($event)" uib-tooltip-popup-delay="600"  uib-tooltip="确定"> </span> <span   style="margin-right: 7px;margin-left: 10px;cursor:pointer;color:red" ng-if="row.inlineEdit.isEditModeOn" class="fa fa-times " aria-hidden="true" tooltip-append-to-body="true" ng-click="row.inlineEdit.cancelEdit($event)" uib-tooltip-popup-delay="600"  uib-tooltip="取消" > </span> </form> </div>';
      hsTpl.hsEditableCellTemplateCheckBox = '<div> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" /> </form> </div>';
      hsTpl.hsEditableFrVendorRefCellTemplate = '<div> <form name="inputForm"> <input type="text" class="edit-input" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" typeahead-on-select="grid.appScope.vm.selectProject($item, $model, $label,row.entity)" uib-typeahead="state for state in grid.appScope.vm.frVendorRefList" /> </form> </div>';
      hsTpl.hsEditableSelectTypeCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD"> <option value="Onshore" translate="Onshore">Onshore</option> <option value="Offshore" translate="Offshore">Offshore</option> </select> </form> </div>';
      hsTpl.hsEditableSelectPlantCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD" ng-options="PO for PO in grid.appScope.vm.plantList"> <option value="" translate="未指定">未指定</option> </select> </form> </div>';
      hsTpl.hsEditableSelectVendorCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD" ng-options="PO for PO in grid.appScope.vm.vendorList"> <option value="" translate="未指定">未指定</option> </select> </form> </div>';
      hsTpl.hsEditableSelectDisciplineCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD" ng-options="PO for PO in grid.appScope.vm.disciplineList"> <option value="" translate="未指定">未指定</option> </select> </form> </div>';
      hsTpl.hsEditableSelectPOCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-change="grid.appScope.vm.test(MODEL_COL_FIELD,row.entity)" ng-init="MODEL_COL_FIELD" ng-options="PO for PO in grid.appScope.vm.POList"> <option value="" translate="未指定">未指定</option> </select> </form> </div>';
      hsTpl.hsEditableSelectFrVendorRefCellTemplate = '<div> <form name="inputForm"> <input type="text" ng-model="MODEL_COL_FIELD" uib-typeahead="state for state in vm.vsqIssueRefOwnerList" class="form-control"> </form> </div>';
      hsTpl.hsEditableSourceCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD"> <option value="Imported" translate="Imported">Imported</option> <option value="Domestic" translate="Domestic">Domestic</option> </select> </form> </div>';
      hsTpl.hsEditableLatestCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD"> <option value="true" translate="true">true</option> <option value="false" translate="false">false</option> </select> </form> </div>';
      hsTpl.hsEditableIssuedStatusCellTemplate = '<div> <form name="inputForm"> <select class="form-control " ng-model="MODEL_COL_FIELD" ng-init="MODEL_COL_FIELD"> <option value="IFA" translate="IFA">IFA</option> <option value="IFC" translate="IFC">IFC</option> <option value="IFR" translate="IFR">IFR</option> <option value="IFI" translate="IFI">IFI</option> <option value="Final" translate="Final">Final</option> </select> </form> </div>';
      hsTpl.hsTypeaheadEditor = '<form name="inputForm"> <input type="text" ng-class="\'colt\' + col.uid" hs-ui-grid-typeahead-editor typeahead-on-select="selectProject($item, $model, $label,row.entity)" uib-typeahead="poNumber.poNumber for poNumber in PONumbersSearchResaultList($viewValue)" typeahead-loading="loadingPONumbersSearchResaultList" typeahead-wait-ms="300" typeahead-append-to-body="true" ng-model="MODEL_COL_FIELD" /> <div ng-show="loadingPONumbersSearchResaultList"> <i class="fa fa-refresh fa-spin"></i> <span>加载中</span> </div> </form>';
      hsTpl.hsEditBt = '<button ng-click=\'grid.appScope.vm.createVendor(row.entity)\'>确认</button>';
      return hsTpl.hsRowTemplate = '<div  ng-show="!row.entity.isCreate" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell hs-ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ng-dblclick="grid.appScope.vm.dbClick(row.entity,$event)" context-menu="grid.appScope.vm.selectRow(row.entity)" data-target="{{grid.appScope.vm.myMenu}}" ng-click="grid.appScope.cancelSelect(row.entity)" ui-grid-cell> </div> <div ng-show="row.entity.isCreate" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' :\'gridcell\'}}" ui-grid-cell-creating > </div>';
    }
  ]);

}).call(this);
